"use client";

import Link from "next/link";
import { PublicSubmissionToast } from "@/features/web-submissions/public-submission-toast";
import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  TrainerApplicationEditModal,
} from "./trainer-application-edit-modal";

const API =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5000/api";

const TRAINER_APPLICATION_ACCESS_KEY =
  "smartera.trainerApplicationAccess.v1";

const CV_MAX_BYTES = 700 * 1024;
const CERT_MAX_BYTES = 5 * 1024 * 1024;

const DAYS = [
  ["SUNDAY", "Sunday"],
  ["MONDAY", "Monday"],
  ["TUESDAY", "Tuesday"],
  ["WEDNESDAY", "Wednesday"],
  ["THURSDAY", "Thursday"],
  ["FRIDAY", "Friday"],
  ["SATURDAY", "Saturday"],
] as const;

type Certification = {
  id: number;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  credentialUrl: string;
  file: File | null;
};

type SuccessData = {
  applicationNumber: string;
  submittedAt: string;
  editToken: string;
};

type ApiError = {
  message?: string;
  errors?: Array<{
    message?: string;
  }>;
};

function splitValues(value: string) {
  return value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function text(
  source: FormData,
  name: string,
) {
  return String(
    source.get(name) ?? "",
  ).trim();
}

function appendOptional(
  target: FormData,
  name: string,
  value: string,
) {
  if (value.trim()) {
    target.append(
      name,
      value.trim(),
    );
  }
}

type ValidatableControl =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

function getTrainerApplicationValidationMessage(
  form: HTMLFormElement,
) {
  const labels: Record<string, string> = {
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    location: "Location",
    currentJobTitle: "Current Job Title",
    currentOrganization: "Current Organization",
    highestEducationLevel: "Education Level",
    fieldOfStudy: "Field of Study",
    yearsExperience: "Years of Experience",
    expertiseAreas: "Expertise Areas",
    preferredMode: "Preferred Training Mode",
    preferredTime: "Preferred Training Time",
    shortBio: "Short Bio",
    motivation: "Motivation",
    profilePhoto: "Profile Photo",
    cv: "CV / Resume",
  };

  const controls =
    Array.from(
      form.elements,
    ).filter(
      (
        element,
      ): element is ValidatableControl =>
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLSelectElement,
    );

  for (const control of controls) {
    if (
      control.disabled ||
      control.validity.valid
    ) {
      continue;
    }

    const label =
      labels[control.name] ||
      control.name
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (value) =>
          value.toUpperCase(),
        ) ||
      "This field";

    if (control.validity.valueMissing) {
      return `${label} is required.`;
    }

    if (
      control.name === "email" &&
      control.validity.typeMismatch
    ) {
      return "Enter a valid email address.";
    }

    if (
      control.name === "phone" &&
      control.validity.patternMismatch
    ) {
      return "Enter a valid phone number.";
    }

    if (
      control.validity.tooShort &&
      "minLength" in control &&
      control.minLength > 0
    ) {
      return `${label} must contain at least ${control.minLength} characters.`;
    }

    if (
      control.validity.tooLong &&
      "maxLength" in control &&
      control.maxLength > 0
    ) {
      return `${label} must contain no more than ${control.maxLength} characters.`;
    }

    if (control.validity.typeMismatch) {
      return `Enter a valid ${label.toLowerCase()}.`;
    }

    if (control.validity.patternMismatch) {
      return `Enter a valid ${label.toLowerCase()}.`;
    }

    if (control.validity.rangeUnderflow) {
      return `${label} is below the minimum allowed value.`;
    }

    if (control.validity.rangeOverflow) {
      return `${label} exceeds the maximum allowed value.`;
    }

    return `Check ${label}.`;
  }

  return "";
}

function trainerPreviewValue(
  data: FormData | null,
  name: string,
) {
  const value = data?.get(name);

  return typeof value === "string"
    ? value.trim()
    : "";
}

function trainerPreviewFileName(
  data: FormData | null,
  name: string,
) {
  const value = data?.get(name);

  return value instanceof File &&
    value.size > 0
    ? value.name
    : "";
}

function escapeTrainerPreviewHtml(
  value: unknown,
) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function TrainerPreviewField({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-black uppercase tracking-[0.08em] text-slate-400">
        {label}
      </p>

      <div className="mt-1 break-words text-sm font-bold leading-6 text-slate-800">
        {value || "-"}
      </div>
    </div>
  );
}
export function TrainerApplicationForm() {
  const [
    hasTrainingExperience,
    setHasTrainingExperience,
  ] = useState(false);

  const [
    certifications,
    setCertifications,
  ] = useState<Certification[]>([]);

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState<SuccessData | null>(
    null,
  );

  const [
    successModalOpen,
    setSuccessModalOpen,
  ] = useState(false);

  const [
    editModalOpen,
    setEditModalOpen,
  ] = useState(false);

  const [
    manageNotice,
    setManageNotice,
  ] = useState("");

  const [
    previewOpen,
    setPreviewOpen,
  ] = useState(false);

  const [
    previewData,
    setPreviewData,
  ] = useState<FormData | null>(
    null,
  );

  const [
    previewPhotoUrl,
    setPreviewPhotoUrl,
  ] = useState("");

  const previewFormRef =
    useRef<HTMLFormElement | null>(
      null,
    );

  const submitAfterPreviewRef =
    useRef(false);

  useEffect(() => {
    return () => {
      if (previewPhotoUrl) {
        URL.revokeObjectURL(
          previewPhotoUrl,
        );
      }
    };
  }, [previewPhotoUrl]);
  useEffect(() => {
    const raw =
      window.localStorage.getItem(
        TRAINER_APPLICATION_ACCESS_KEY,
      );

    if (!raw) {
      return;
    }

    try {
      const saved =
        JSON.parse(
          raw,
        ) as Partial<SuccessData>;

      if (
        !saved.applicationNumber ||
        !saved.editToken ||
        !saved.submittedAt
      ) {
        window.localStorage.removeItem(
          TRAINER_APPLICATION_ACCESS_KEY,
        );

        return;
      }

      const access: SuccessData = {
        applicationNumber:
          saved.applicationNumber,

        submittedAt:
          saved.submittedAt,

        editToken:
          saved.editToken,
      };

      setSuccess(access);

      void fetch(
        `${API}/web/trainers/applications/${encodeURIComponent(
          access.applicationNumber,
        )}/manage`,
        {
          method: "GET",

          headers: {
            "x-trainer-edit-token":
              access.editToken,
          },
        },
      )
        .then(
          async (response) => {
            if (!response.ok) {
              if (
                response.status === 404 ||
                response.status === 401
              ) {
                window.localStorage.removeItem(
                  TRAINER_APPLICATION_ACCESS_KEY,
                );

                setSuccess(null);
              }

              return;
            }

            const result =
              (await response.json()) as {
                success?: boolean;

                data?: {
                  submittedAt?: string;
                };
              };

            if (
              result.success &&
              result.data
                ?.submittedAt
            ) {
              setSuccess(
                (current) =>
                  current
                    ? {
                        ...current,

                        submittedAt:
                          result.data
                            ?.submittedAt ??
                          current.submittedAt,
                      }
                    : current,
              );
            }
          },
        )
        .catch(() => {
          // Keep locally saved access when the API
          // is temporarily unavailable.
        });
    }
    catch {
      window.localStorage.removeItem(
        TRAINER_APPLICATION_ACCESS_KEY,
      );
    }
  }, []);

  function addCertification() {
    setCertifications((current) => {
      if (current.length >= 10) {
        return current;
      }

      return [
        ...current,
        {
          id: Date.now(),
          name: "",
          issuer: "",
          issueDate: "",
          expiryDate: "",
          credentialId: "",
          credentialUrl: "",
          file: null,
        },
      ];
    });
  }

  function removeCertification(
    id: number,
  ) {
    setCertifications((current) =>
      current.filter(
        (item) => item.id !== id,
      ),
    );
  }

  function updateCertification(
    id: number,
    patch: Partial<Certification>,
  ) {
    setCertifications((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              ...patch,
            }
          : item,
      ),
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    const formElement =
      event.currentTarget;
    const nativeValidationError =
      getTrainerApplicationValidationMessage(
        formElement,
      );

    if (nativeValidationError) {
      setError(
        nativeValidationError,
      );

      return;
    }

    const raw =
      new FormData(formElement);

    const cv =
      raw.get("cv");

    if (!(cv instanceof File) || !cv.size) {
      setError(
        "Please upload your CV / Resume.",
      );
      return;
    }

    if (cv.size > CV_MAX_BYTES) {
      setError(
        "CV / Resume must not exceed 700 KB.",
      );
      return;
    }

    const cvName =
      cv.name.toLowerCase();

    if (
      !cvName.endsWith(".pdf") &&
      !cvName.endsWith(".doc") &&
      !cvName.endsWith(".docx")
    ) {
      setError(
        "CV must be a PDF, DOC, or DOCX file.",
      );
      return;
    }

    const selectedDays =
      raw
        .getAll("availableDays")
        .map(String);

    if (!selectedDays.length) {
      setError(
        "Select at least one available day.",
      );
      return;
    }

    if (
      !splitValues(
        text(raw, "expertiseAreas"),
      ).length
    ) {
      setError(
        "Add at least one expertise area.",
      );
      return;
    }

    for (
      const certification
      of certifications
    ) {
      if (
        !certification.name.trim() ||
        !certification.issuer.trim()
      ) {
        setError(
          "Each certification must include its name and issuing organization.",
        );
        return;
      }

      if (!certification.file) {
        setError(
          "Upload the PDF document for each certification you add.",
        );
        return;
      }

      if (
        certification.file.type !==
          "application/pdf" &&
        !certification.file.name
          .toLowerCase()
          .endsWith(".pdf")
      ) {
        setError(
          "Certification documents must be PDF files.",
        );
        return;
      }

      if (
        certification.file.size >
        CERT_MAX_BYTES
      ) {
        setError(
          "Each certification PDF must not exceed 5 MB.",
        );
        return;
      }
    }

    // TRAINER APPLICATION PREVIEW MODAL
    // All validation above has already passed.
    // The first submit opens preview instead of sending to API.
    if (!submitAfterPreviewRef.current) {
      const snapshot =
        new FormData(formElement);

      previewFormRef.current =
        formElement;

      setPreviewData(snapshot);

      const previewPhoto =
        snapshot.get("profilePhoto");

      if (
        previewPhoto instanceof File &&
        previewPhoto.size > 0
      ) {
        setPreviewPhotoUrl(
          URL.createObjectURL(
            previewPhoto,
          ),
        );
      } else {
        setPreviewPhotoUrl("");
      }

      setPreviewOpen(true);

      return;
    }

    // Save & Submit from preview reaches the
    // existing API submission logic only once.
    submitAfterPreviewRef.current =
      false;

    const payload =
      new FormData();

    payload.append(
      "fullName",
      text(raw, "fullName"),
    );

    payload.append(
      "email",
      text(raw, "email"),
    );

    payload.append(
      "phone",
      text(raw, "phone"),
    );

    appendOptional(
      payload,
      "location",
      text(
        raw,
        "location",
      ),
    );

    payload.append(
      "currentJobTitle",
      text(
        raw,
        "currentJobTitle",
      ),
    );

    appendOptional(
      payload,
      "currentOrganization",
      text(
        raw,
        "currentOrganization",
      ),
    );

    payload.append(
      "yearsExperience",
      text(
        raw,
        "yearsExperience",
      ),
    );

    payload.append(
      "highestEducationLevel",
      text(
        raw,
        "highestEducationLevel",
      ),
    );

    appendOptional(
      payload,
      "fieldOfStudy",
      text(raw, "fieldOfStudy"),
    );

    appendOptional(
      payload,
      "linkedinUrl",
      text(raw, "linkedinUrl"),
    );

    appendOptional(
      payload,
      "portfolioUrl",
      text(raw, "portfolioUrl"),
    );

    payload.append(
      "expertiseAreas",
      splitValues(
        text(raw, "expertiseAreas"),
      ).join(","),
    );

    payload.append(
      "hasTrainingExperience",
      hasTrainingExperience
        ? "true"
        : "false",
    );

    if (hasTrainingExperience) {
      payload.append(
        "trainingExperienceYears",
        text(
          raw,
          "trainingExperienceYears",
        ),
      );

      payload.append(
        "trainingOrganizations",
        splitValues(
          text(
            raw,
            "trainingOrganizations",
          ),
        ).join(","),
      );

      payload.append(
        "trainingSubjects",
        splitValues(
          text(
            raw,
            "trainingSubjects",
          ),
        ).join(","),
      );

      appendOptional(
        payload,
        "learnersTrained",
        text(
          raw,
          "learnersTrained",
        ),
      );
    }

    payload.append(
      "preferredMode",
      text(raw, "preferredMode"),
    );

    payload.append(
      "availableDays",
      selectedDays.join(","),
    );

    payload.append(
      "preferredTime",
      text(raw, "preferredTime"),
    );

    payload.append(
      "shortBio",
      text(raw, "shortBio"),
    );

    payload.append(
      "motivation",
      text(raw, "motivation"),
    );

    payload.append(
      "practicalValue",
      text(raw, "practicalValue"),
    );

    appendOptional(
      payload,
      "additionalInformation",
      text(
        raw,
        "additionalInformation",
      ),
    );

    payload.append(
      "consent",
      "true",
    );

    const certificationMetadata =
      certifications.map((item) => ({
        name: item.name.trim(),
        issuer: item.issuer.trim(),
        issueDate:
          item.issueDate ||
          undefined,
        expiryDate:
          item.expiryDate ||
          undefined,
        credentialId:
          item.credentialId.trim() ||
          undefined,
        credentialUrl:
          item.credentialUrl.trim() ||
          undefined,
      }));

    payload.append(
      "certifications",
      JSON.stringify(
        certificationMetadata,
      ),
    );

    const profilePhoto =
      raw.get("profilePhoto");

    if (
      !(profilePhoto instanceof File) ||
      profilePhoto.size === 0
    ) {
      setError(
        "Profile photo is required.",
      );

      return;
    }

    const allowedPhotoTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedPhotoTypes.includes(
        profilePhoto.type,
      )
    ) {
      setError(
        "Profile photo must be JPG, PNG, or WEBP.",
      );

      return;
    }

    if (
      profilePhoto.size >
      2 * 1024 * 1024
    ) {
      setError(
        "Profile photo must not exceed 2 MB.",
      );

      return;
    }

    payload.append(
      "profilePhoto",
      profilePhoto,
      profilePhoto.name,
    );

    payload.append(
      "cv",
      cv,
      cv.name,
    );

    certifications.forEach(
      (item) => {
        if (item.file) {
          payload.append(
            "certificationFiles",
            item.file,
            item.file.name,
          );
        }
      },
    );

    try {
      setSubmitting(true);

      const response =
        await fetch(
          `${API}/web/trainers/applications`,
          {
            method: "POST",
            body: payload,
          },
        );

      const result =
        (await response.json()) as {
          success?: boolean;
          message?: string;
          data?: SuccessData;
          errors?: Array<{
            message?: string;
          }>;
        };

      if (
        !response.ok ||
        !result.success ||
        !result.data ||
        !result.data.editToken
      ) {
        const firstError =
          result.errors?.find(
            (item) => item.message,
          )?.message;

        throw new Error(
          firstError ||
            result.message ||
            "Unable to submit your application.",
        );
      }

      const access: SuccessData = {
        applicationNumber:
          result.data.applicationNumber,

        submittedAt:
          result.data.submittedAt,

        editToken:
          result.data.editToken,
      };

      window.localStorage.setItem(
        TRAINER_APPLICATION_ACCESS_KEY,
        JSON.stringify(
          access,
        ),
      );

      setManageNotice("");
      setSuccess(access);
      setSuccessModalOpen(true);

      formElement.reset();

      document
        .getElementById(
          "trainer-profile-photo-preview",
        )
        ?.removeAttribute(
          "src",
        );

      document
        .getElementById(
          "trainer-profile-photo-preview",
        )
        ?.classList.add(
          "hidden",
        );

      document
        .getElementById(
          "trainer-profile-photo-placeholder",
        )
        ?.classList.remove(
          "hidden",
        );

      setCertifications([]);
      setHasTrainingExperience(
        false,
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (caught) {
      const apiError =
        caught as ApiError | Error;

      setError(
        apiError instanceof Error
          ? apiError.message
          : apiError.message ||
              "Unable to submit your application.",
      );
    } finally {
      setSubmitting(false);
    }
  }


  function downloadTrainerPreview() {
    if (!previewData) {
      return;
    }

    const get = (name: string) =>
      escapeTrainerPreviewHtml(
        trainerPreviewValue(
          previewData,
          name,
        ) || "-",
      );

    const days =
      previewData
        .getAll("availableDays")
        .map((item) =>
          String(item),
        )
        .filter(Boolean)
        .join(", ");

    const certificationHtml =
      certifications.length
        ? certifications
            .map(
              (
                certification,
                index,
              ) => `
                <div class="cert">
                  <strong>${escapeTrainerPreviewHtml(
                    certification.name ||
                      `Certification ${index + 1}`,
                  )}</strong>
                  <div>
                    Issuer:
                    ${escapeTrainerPreviewHtml(
                      certification.issuer ||
                        "-",
                    )}
                  </div>
                  <div>
                    Document:
                    ${escapeTrainerPreviewHtml(
                      certification.file
                        ?.name || "-",
                    )}
                  </div>
                </div>
              `,
            )
            .join("")
        : "<p>None added.</p>";

    const html = `
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Trainer Application Preview</title>

<style>
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 40px;
    background: #f6f9fd;
    color: #172033;
    font-family: Arial, Helvetica, sans-serif;
  }

  .document {
    max-width: 920px;
    margin: 0 auto;
    background: white;
    border-radius: 18px;
    padding: 42px;
  }

  .brand {
    color: #1B519F;
    font-size: 28px;
    font-weight: 800;
  }

  .subtitle {
    margin-top: 6px;
    color: #65748b;
  }

  .status {
    display: inline-block;
    margin-top: 18px;
    padding: 8px 14px;
    border-radius: 999px;
    background: #eef5ff;
    color: #1B519F;
    font-size: 12px;
    font-weight: 800;
  }

  section {
    margin-top: 30px;
  }

  h2 {
    color: #1B519F;
    font-size: 18px;
    margin-bottom: 14px;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }

  .field {
    padding-bottom: 10px;
  }

  .label {
    color: #7a8798;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: .08em;
  }

  .value {
    margin-top: 5px;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.5;
    word-break: break-word;
  }

  .cert {
    margin-bottom: 12px;
    padding: 12px;
    background: #f7f9fc;
    border-radius: 10px;
    line-height: 1.6;
  }

  .footer {
    margin-top: 36px;
    padding-top: 18px;
    border-top: 1px solid #e5eaf0;
    color: #7a8798;
    font-size: 11px;
  }

  @media print {
    body {
      padding: 0;
      background: white;
    }

    .document {
      max-width: none;
      border-radius: 0;
      padding: 20px;
    }
  }
</style>
</head>

<body>
<div class="document">

  <div class="brand">
    Smartera Hub
  </div>

  <div class="subtitle">
    Trainer Application Preview
  </div>

  <div class="status">
    PRE-SUBMISSION PREVIEW
  </div>

  <section>
    <h2>01 - Personal Information</h2>

    <div class="grid">
      <div class="field">
        <div class="label">Full Name</div>
        <div class="value">${get("fullName")}</div>
      </div>

      <div class="field">
        <div class="label">Email Address</div>
        <div class="value">${get("email")}</div>
      </div>

      <div class="field">
        <div class="label">Phone Number</div>
        <div class="value">${get("phone")}</div>
      </div>

      <div class="field">
        <div class="label">Location</div>
        <div class="value">${get("location")}</div>
      </div>
    </div>
  </section>

  <section>
    <h2>02 - Professional Background</h2>

    <div class="grid">
      <div class="field">
        <div class="label">Current Job Title</div>
        <div class="value">${get("currentJobTitle")}</div>
      </div>

      <div class="field">
        <div class="label">Current Organization</div>
        <div class="value">${get("currentOrganization")}</div>
      </div>

      <div class="field">
        <div class="label">Years of Experience</div>
        <div class="value">${get("yearsExperience")}</div>
      </div>

      <div class="field">
        <div class="label">Education Level</div>
        <div class="value">${get("highestEducationLevel")}</div>
      </div>

      <div class="field">
        <div class="label">Field of Study</div>
        <div class="value">${get("fieldOfStudy")}</div>
      </div>

      <div class="field">
        <div class="label">Expertise Areas</div>
        <div class="value">${get("expertiseAreas")}</div>
      </div>

      <div class="field">
        <div class="label">LinkedIn</div>
        <div class="value">${get("linkedinUrl")}</div>
      </div>

      <div class="field">
        <div class="label">Portfolio</div>
        <div class="value">${get("portfolioUrl")}</div>
      </div>
    </div>
  </section>

  <section>
    <h2>03 - Training Experience</h2>

    <div class="grid">
      <div class="field">
        <div class="label">Previous Experience</div>
        <div class="value">${
          hasTrainingExperience
            ? "Yes"
            : "No"
        }</div>
      </div>

      <div class="field">
        <div class="label">Training Years</div>
        <div class="value">${get("trainingExperienceYears")}</div>
      </div>

      <div class="field">
        <div class="label">Organizations</div>
        <div class="value">${get("trainingOrganizations")}</div>
      </div>

      <div class="field">
        <div class="label">Subjects</div>
        <div class="value">${get("trainingSubjects")}</div>
      </div>

      <div class="field">
        <div class="label">Learners Trained</div>
        <div class="value">${get("learnersTrained")}</div>
      </div>
    </div>
  </section>

  <section>
    <h2>04 - Availability</h2>

    <div class="grid">
      <div class="field">
        <div class="label">Training Mode</div>
        <div class="value">${get("preferredMode")}</div>
      </div>

      <div class="field">
        <div class="label">Preferred Time</div>
        <div class="value">${get("preferredTime")}</div>
      </div>

      <div class="field">
        <div class="label">Available Days</div>
        <div class="value">${escapeTrainerPreviewHtml(
          days || "-",
        )}</div>
      </div>
    </div>
  </section>

  <section>
    <h2>05 - Documents</h2>

    <div class="grid">
      <div class="field">
        <div class="label">Profile Photo</div>
        <div class="value">${escapeTrainerPreviewHtml(
          trainerPreviewFileName(
            previewData,
            "profilePhoto",
          ) || "-",
        )}</div>
      </div>

      <div class="field">
        <div class="label">CV / Resume</div>
        <div class="value">${escapeTrainerPreviewHtml(
          trainerPreviewFileName(
            previewData,
            "cv",
          ) || "-",
        )}</div>
      </div>
    </div>

    <h3>Certifications</h3>
    ${certificationHtml}
  </section>

  <section>
    <h2>06 - Motivation & Practical Value</h2>

    <div class="field">
      <div class="label">Short Bio</div>
      <div class="value">${get("shortBio")}</div>
    </div>

    <div class="field">
      <div class="label">Motivation</div>
      <div class="value">${get("motivation")}</div>
    </div>

    <div class="field">
      <div class="label">Practical Value</div>
      <div class="value">${get("practicalValue")}</div>
    </div>

    <div class="field">
      <div class="label">Additional Information</div>
      <div class="value">${get("additionalInformation")}</div>
    </div>
  </section>

  <div class="footer">
    This document is a pre-submission preview generated by Smartera Hub.
  </div>

</div>
</body>
</html>
`;

    const applicantName =
      trainerPreviewValue(
        previewData,
        "fullName",
      )
        .replace(
          /[^a-z0-9]+/gi,
          "-",
        )
        .replace(
          /^-+|-+$/g,
          "",
        ) || "trainer";

    const blob = new Blob(
      [html],
      {
        type: "text/html;charset=utf-8",
      },
    );

    const url =
      URL.createObjectURL(blob);

    const anchor =
      document.createElement("a");

    anchor.href = url;
    anchor.download =
      `${applicantName}-trainer-application-preview.html`;

    document.body.appendChild(
      anchor,
    );

    anchor.click();
    anchor.remove();

    window.setTimeout(
      () =>
        URL.revokeObjectURL(
          url,
        ),
      1000,
    );
  }

  function saveAndSubmitPreview() {
    if (!previewFormRef.current) {
      return;
    }

    submitAfterPreviewRef.current =
      true;

    setPreviewOpen(false);

    window.requestAnimationFrame(
      () => {
        previewFormRef.current
          ?.requestSubmit();
      },
    );
  }
  if (success) {
    const editModal = (
      <TrainerApplicationEditModal
        open={editModalOpen}
        applicationNumber={
          success.applicationNumber
        }
        editToken={
          success.editToken
        }
        onClose={() =>
          setEditModalOpen(false)
        }
        onUpdated={() => {
          setManageNotice(
            "Application updated successfully.",
          );
        }}
      />
    );

    if (successModalOpen) {
      return (
        <>
          <div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Application submitted successfully"
          >
            <div className="w-full max-w-md rounded-2xl bg-white p-5 text-center shadow-2xl sm:p-6">

              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
                Successfully Submitted
              </p>

              <h2 className="mt-1.5 text-xl font-black text-slate-950">
                Application Submitted
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-[13px] font-medium leading-5 text-slate-600">
                Your trainer application has been received and is now waiting for review.
              </p>

              <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Application Number
                </p>

                <p className="mt-1 text-xl font-black text-[#1B519F]">
                  {success.applicationNumber}
                </p>
              </div>

              {manageNotice ? (
                <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
                  {manageNotice}
                </div>
              ) : null}

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() =>
                    setEditModalOpen(
                      true,
                    )
                  }
                  className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#1B519F] px-4 py-2 text-sm font-bold text-[#1B519F] transition hover:bg-blue-50"
                >

                  Edit Application
                </button>

                <Link
                  href="/trainers"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#1B519F] px-5 py-3 text-sm font-black text-white transition hover:bg-[#143f7d]"
                >
                  Go to Trainers
                </Link>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSuccessModalOpen(
                    false,
                  )
                }
                className="mt-3 text-xs font-bold text-slate-500 underline-offset-4 hover:text-slate-800 hover:underline"
              >
                Close
              </button>

              <p className="mt-3 text-[11px] font-medium leading-4 text-slate-400">
                You can return to this page later to manage or correct your application from this browser.
              </p>
            </div>
          </div>

          {editModal}
        </>
      );
    }

    return (
      <>
        <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                  Application Found
                </span>

                <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-700">
                  Pending Review
                </span>
              </div>

              <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[#1B519F]">
                Your Trainer Application
              </p>

              <h2 className="mt-1 text-2xl font-black text-slate-950">
                {success.applicationNumber}
              </h2>

              <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-slate-600">
                You already submitted a trainer application from this browser. If you notice a mistake, you can edit your application while it is still pending.
              </p>

              {manageNotice ? (
                <div className="mt-4 inline-flex rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                  {manageNotice}
                </div>
              ) : null}
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:min-w-56">
              <button
                type="button"
                onClick={() =>
                  setEditModalOpen(
                    true,
                  )
                }
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1B519F] px-5 py-3 text-sm font-black text-white transition hover:bg-[#143f7d]"
              >

                Edit Your Application
              </button>

              <Link
                href="/trainers"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
              >
                Back to Trainers
              </Link>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-4">
            <p className="text-xs font-medium text-slate-400">
              Submitted{" "}
              {new Date(
                success.submittedAt,
              ).toLocaleString()}
            </p>
          </div>
        </div>

        {editModal}
      </>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-8"
    >
      <PublicSubmissionToast
        message={error}
        variant="error"
        onDismiss={() =>
          setError("")
        }
      />

      <Section
        number="01"
        title="Personal Information"
        description="Add your profile photo and basic contact information."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Full Name"
            required
          >
            <input
              name="fullName"
              required
              minLength={3}
              maxLength={100}
              className={inputClass}
              placeholder="Your full name"
            />
          </Field>

          <Field
            label="Email Address"
            required
          >
            <input
              name="email"
              type="email"
              required
              className={inputClass}
              placeholder="name@example.com"
            />
          </Field>

          <div className="md:col-span-2">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[#1B519F] text-white shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-9 w-9"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M4.5 20c.8-4 3.3-6 7.5-6s6.7 2 7.5 6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="min-w-0 flex-1">
                  <Field
                    label="Profile Photo"
                    required
                    hint="JPG, PNG or WEBP. Maximum size: 2 MB."
                  >
                    <input
                      name="profilePhoto"
                      type="file"
                      required
                      accept="image/jpeg,image/png,image/webp"
                      className={fileClass}
                    />
                  </Field>
                </div>
              </div>
            </div>
          </div>

          <Field
            label="Phone Number"
            required
          >
            <input
              name="phone"
              type="tel"
              required
              className={inputClass}
              placeholder="0612345678"
            />
          </Field>

          <Field label="Location">
            <input
              name="location"
              maxLength={200}
              className={inputClass}
              placeholder="e.g. Mogadishu, Somalia"
            />
          </Field>
        </div>
      </Section>

      <Section
        number="02"
        title="Professional Background"
        description="Tell us about your professional experience and expertise."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Current Job Title"
            required
          >
            <input
              name="currentJobTitle"
              required
              className={inputClass}
              placeholder="e.g. Software Engineer"
            />
          </Field>

          <Field label="Current Organization">
            <input
              name="currentOrganization"
              className={inputClass}
              placeholder="Company or organization"
            />
          </Field>

          <Field
            label="Years of Professional Experience"
            required
          >
            <input
              name="yearsExperience"
              type="number"
              required
              min={0}
              max={60}
              step={1}
              className={inputClass}
              placeholder="3"
            />
          </Field>

          <Field
            label="Highest Education Level"
            required
          >
            <input
              name="highestEducationLevel"
              required
              className={inputClass}
              placeholder="e.g. Bachelor's Degree"
            />
          </Field>

          <Field label="Field of Study">
            <input
              name="fieldOfStudy"
              className={inputClass}
              placeholder="e.g. Computer Science"
            />
          </Field>

          <Field label="LinkedIn URL">
            <input
              name="linkedinUrl"
              type="url"
              className={inputClass}
              placeholder="https://linkedin.com/in/..."
            />
          </Field>

          <Field label="Portfolio URL">
            <input
              name="portfolioUrl"
              type="url"
              className={inputClass}
              placeholder="https://..."
            />
          </Field>
        </div>

        <div className="mt-5">
          <Field
            label="Expertise Areas"
            required
            hint="Separate multiple areas with commas or new lines."
          >
            <textarea
              name="expertiseAreas"
              required
              rows={4}
              className={textareaClass}
              placeholder={"Data Analysis, Software Engineering, Digital Marketing"}
            />
          </Field>
        </div>
      </Section>

      <Section
        number="03"
        title="Training Experience"
        description="Share previous teaching or training experience if applicable."
      >
        <fieldset>
          <legend className="text-sm font-black text-slate-800">
            Do you have previous
            training experience?
          </legend>

          <div className="mt-3 flex flex-wrap gap-3">
            <label className={choiceClass}>
              <input
                type="radio"
                name="trainingExperienceChoice"
                checked={
                  hasTrainingExperience
                }
                onChange={() =>
                  setHasTrainingExperience(
                    true,
                  )
                }
              />
              Yes
            </label>

            <label className={choiceClass}>
              <input
                type="radio"
                name="trainingExperienceChoice"
                checked={
                  !hasTrainingExperience
                }
                onChange={() =>
                  setHasTrainingExperience(
                    false,
                  )
                }
              />
              No
            </label>
          </div>
        </fieldset>

        {hasTrainingExperience ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Field
              label="Years of Training Experience"
              required
            >
              <input
                name="trainingExperienceYears"
                type="number"
                required={
                  hasTrainingExperience
                }
                min={0}
                max={60}
                step={1}
                className={inputClass}
              />
            </Field>

            <Field label="Approx. Learners Trained">
              <input
                name="learnersTrained"
                type="number"
                min={0}
                step={1}
                className={inputClass}
              />
            </Field>

            <Field
              label="Organizations Trained"
              hint="Separate with commas or new lines."
            >
              <textarea
                name="trainingOrganizations"
                rows={3}
                className={textareaClass}
              />
            </Field>

            <Field
              label="Training Subjects"
              hint="Separate with commas or new lines."
            >
              <textarea
                name="trainingSubjects"
                rows={3}
                className={textareaClass}
              />
            </Field>
          </div>
        ) : null}
      </Section>

      <Section
        number="04"
        title="Availability"
        description="Tell us how and when you prefer to train."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Preferred Training Mode"
            required
          >
            <select
              name="preferredMode"
              required
              defaultValue=""
              className={inputClass}
            >
              <option
                value=""
                disabled
              >
                Select training mode
              </option>
              <option value="ONSITE">
                On-site
              </option>
              <option value="REMOTE">
                Remote
              </option>
              <option value="HYBRID">
                Hybrid
              </option>
            </select>
          </Field>

          <Field
            label="Preferred Time"
            required
          >
            <select
              name="preferredTime"
              required
              defaultValue=""
              className={inputClass}
            >
              <option
                value=""
                disabled
              >
                Select preferred time
              </option>
              <option value="MORNING">
                Morning
              </option>
              <option value="AFTERNOON">
                Afternoon
              </option>
              <option value="EVENING">
                Evening
              </option>
              <option value="FLEXIBLE">
                Flexible
              </option>
            </select>
          </Field>
        </div>

        <fieldset className="mt-5">
          <legend className="text-sm font-black text-slate-800">
            Available Days{" "}
            <span className="text-red-500">
              *
            </span>
          </legend>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {DAYS.map(
              ([value, label]) => (
                <label
                  key={value}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700"
                >
                  <input
                    type="checkbox"
                    name="availableDays"
                    value={value}
                    className="h-4 w-4"
                  />
                  {label}
                </label>
              ),
            )}
          </div>
        </fieldset>
      </Section>

      <Section
        number="05"
        title="CV & Certifications"
        description="Upload your CV and optional professional certification documents."
      >
        <Field
          label="CV / Resume"
          required
          hint="PDF, DOC, or DOCX. Maximum size: 700 KB."
        >
          <input
            name="cv"
            type="file"
            required
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className={fileClass}
          />
        </Field>

        <div className="mt-7 border-t border-slate-200 pt-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-base font-black text-[#1B519F]">
                Certifications
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Optional. Add up to 10
                certifications. Each
                uploaded document must be
                PDF.
              </p>
            </div>

            <button
              type="button"
              onClick={addCertification}
              disabled={
                certifications.length >= 10
              }
              className="rounded-xl border border-[#1B519F] px-4 py-2 text-sm font-black text-[#1B519F] transition hover:bg-[#EEF5FF] disabled:cursor-not-allowed disabled:opacity-50"
            >
              + Add Certification
            </button>
          </div>

          <div className="mt-5 space-y-5">
            {certifications.map(
              (item, index) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="font-black text-slate-800">
                      Certification{" "}
                      {index + 1}
                    </h4>

                    <button
                      type="button"
                      onClick={() =>
                        removeCertification(
                          item.id,
                        )
                      }
                      className="text-sm font-bold text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <Field
                      label="Certification Name"
                      required
                    >
                      <input
                        value={item.name}
                        onChange={(event) =>
                          updateCertification(
                            item.id,
                            {
                              name:
                                event.target
                                  .value,
                            },
                          )
                        }
                        required
                        className={inputClass}
                      />
                    </Field>

                    <Field
                      label="Issuing Organization"
                      required
                    >
                      <input
                        value={item.issuer}
                        onChange={(event) =>
                          updateCertification(
                            item.id,
                            {
                              issuer:
                                event.target
                                  .value,
                            },
                          )
                        }
                        required
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Issue Date">
                      <input
                        type="date"
                        value={item.issueDate}
                        onChange={(event) =>
                          updateCertification(
                            item.id,
                            {
                              issueDate:
                                event.target
                                  .value,
                            },
                          )
                        }
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Expiry Date">
                      <input
                        type="date"
                        value={item.expiryDate}
                        onChange={(event) =>
                          updateCertification(
                            item.id,
                            {
                              expiryDate:
                                event.target
                                  .value,
                            },
                          )
                        }
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Credential ID">
                      <input
                        value={
                          item.credentialId
                        }
                        onChange={(event) =>
                          updateCertification(
                            item.id,
                            {
                              credentialId:
                                event.target
                                  .value,
                            },
                          )
                        }
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Credential URL">
                      <input
                        type="url"
                        value={
                          item.credentialUrl
                        }
                        onChange={(event) =>
                          updateCertification(
                            item.id,
                            {
                              credentialUrl:
                                event.target
                                  .value,
                            },
                          )
                        }
                        className={inputClass}
                        placeholder="https://..."
                      />
                    </Field>

                    <div className="md:col-span-2">
                      <Field
                        label="Certification PDF"
                        required
                        hint="PDF only. Maximum 5 MB."
                      >
                        <input
                          type="file"
                          required
                          accept=".pdf,application/pdf"
                          onChange={(event) =>
                            updateCertification(
                              item.id,
                              {
                                file:
                                  event.target
                                    .files?.[0] ??
                                  null,
                              },
                            )
                          }
                          className={fileClass}
                        />
                      </Field>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </Section>

      <Section
        number="06"
        title="Motivation & Practical Value"
        description="Explain why you want to train and what learners will gain from you."
      >
        <div className="space-y-5">
          <Field
            label="Short Bio"
            required
            hint="This brief professional introduction may appear on your public trainer profile. 30-300 characters."
          >
            <textarea
              name="shortBio"
              required
              minLength={30}
              maxLength={300}
              rows={4}
              className={`${inputClass} min-h-28 resize-y`}
              placeholder="Briefly introduce yourself, your expertise, experience, and the value you bring as a trainer."
            />
          </Field>
          <Field
            label="Why do you want to become a Smartera Hub trainer?"
            required
          >
            <textarea
              name="motivation"
              required
              minLength={20}
              maxLength={2000}
              rows={5}
              className={textareaClass}
            />
          </Field>

          <Field
            label="What practical value can you provide to learners?"
            required
          >
            <textarea
              name="practicalValue"
              required
              minLength={20}
              maxLength={2000}
              rows={5}
              className={textareaClass}
            />
          </Field>

          <Field label="Additional Information">
            <textarea
              name="additionalInformation"
              maxLength={2000}
              rows={4}
              className={textareaClass}
            />
          </Field>
        </div>
      </Section>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 h-4 w-4"
          />

          <span className="text-sm leading-6 text-slate-600">
            I confirm that the information
            provided in this application
            is accurate and may be reviewed
            by Smartera Hub for trainer
            selection purposes.
          </span>
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#1B519F] px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-[#143f7d] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting
            ? "Submitting..."
            : "Submit Trainer Application"}
        </button>
      </div>

      {previewOpen && previewData ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/65 p-3 backdrop-blur-sm sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="trainer-preview-title"
        >
          <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl">

            {/* HEADER */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-7">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#F59223]">
                  Review Before Submission
                </p>

                <h2
                  id="trainer-preview-title"
                  className="mt-1 text-xl font-black text-[#1B519F] sm:text-2xl"
                >
                  Trainer Application Preview
                </h2>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Review your information carefully before saving and submitting.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setPreviewOpen(false)
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-600 transition hover:bg-slate-200"
                aria-label="Close application preview"
              >
                x
              </button>
            </div>

            {/* CONTENT */}
            <div className="overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">

              <div className="grid gap-6 lg:grid-cols-[170px_1fr]">

                {/* PHOTO */}
                <div>
                  <div className="overflow-hidden rounded-2xl bg-slate-100">
                    {previewPhotoUrl ? (
                      <img
                        src={previewPhotoUrl}
                        alt="Trainer profile preview"
                        className="aspect-square w-full object-cover"
                      />
                    ) : (
                      <div className="flex aspect-square items-center justify-center text-sm font-bold text-slate-400">
                        No Photo
                      </div>
                    )}
                  </div>

                  <p className="mt-3 break-all text-center text-[11px] font-bold text-slate-500">
                    {trainerPreviewFileName(
                      previewData,
                      "profilePhoto",
                    )}
                  </p>
                </div>

                {/* PERSONAL + PROFESSIONAL */}
                <div className="space-y-7">

                  <section>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[11px] font-black text-[#1B519F]">
                        01
                      </span>

                      <h3 className="text-base font-black text-slate-900">
                        Personal Information
                      </h3>
                    </div>

                    <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                      <TrainerPreviewField
                        label="Full Name"
                        value={trainerPreviewValue(
                          previewData,
                          "fullName",
                        )}
                      />

                      <TrainerPreviewField
                        label="Email Address"
                        value={trainerPreviewValue(
                          previewData,
                          "email",
                        )}
                      />

                      <TrainerPreviewField
                        label="Phone Number"
                        value={trainerPreviewValue(
                          previewData,
                          "phone",
                        )}
                      />

                      <TrainerPreviewField
                        label="Location"
                        value={trainerPreviewValue(
                          previewData,
                          "location",
                        )}
                      />
                    </div>
                  </section>

                  <section>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[11px] font-black text-[#1B519F]">
                        02
                      </span>

                      <h3 className="text-base font-black text-slate-900">
                        Professional Background
                      </h3>
                    </div>

                    <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                      <TrainerPreviewField
                        label="Current Job Title"
                        value={trainerPreviewValue(
                          previewData,
                          "currentJobTitle",
                        )}
                      />

                      <TrainerPreviewField
                        label="Current Organization"
                        value={trainerPreviewValue(
                          previewData,
                          "currentOrganization",
                        )}
                      />

                      <TrainerPreviewField
                        label="Years Experience"
                        value={trainerPreviewValue(
                          previewData,
                          "yearsExperience",
                        )}
                      />

                      <TrainerPreviewField
                        label="Education Level"
                        value={trainerPreviewValue(
                          previewData,
                          "highestEducationLevel",
                        )}
                      />

                      <TrainerPreviewField
                        label="Field of Study"
                        value={trainerPreviewValue(
                          previewData,
                          "fieldOfStudy",
                        )}
                      />

                      <TrainerPreviewField
                        label="Expertise Areas"
                        value={trainerPreviewValue(
                          previewData,
                          "expertiseAreas",
                        )}
                      />

                      <TrainerPreviewField
                        label="LinkedIn URL"
                        value={trainerPreviewValue(
                          previewData,
                          "linkedinUrl",
                        )}
                      />

                      <TrainerPreviewField
                        label="Portfolio URL"
                        value={trainerPreviewValue(
                          previewData,
                          "portfolioUrl",
                        )}
                      />
                    </div>
                  </section>

                </div>
              </div>

              {/* TRAINING */}
              <section className="mt-8 border-t border-slate-100 pt-7">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[11px] font-black text-[#1B519F]">
                    03
                  </span>

                  <h3 className="text-base font-black text-slate-900">
                    Training Experience
                  </h3>
                </div>

                <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                  <TrainerPreviewField
                    label="Previous Training Experience"
                    value={
                      hasTrainingExperience
                        ? "Yes"
                        : "No"
                    }
                  />

                  {hasTrainingExperience ? (
                    <>
                      <TrainerPreviewField
                        label="Training Experience Years"
                        value={trainerPreviewValue(
                          previewData,
                          "trainingExperienceYears",
                        )}
                      />

                      <TrainerPreviewField
                        label="Training Organizations"
                        value={trainerPreviewValue(
                          previewData,
                          "trainingOrganizations",
                        )}
                      />

                      <TrainerPreviewField
                        label="Training Subjects"
                        value={trainerPreviewValue(
                          previewData,
                          "trainingSubjects",
                        )}
                      />

                      <TrainerPreviewField
                        label="Learners Trained"
                        value={trainerPreviewValue(
                          previewData,
                          "learnersTrained",
                        )}
                      />
                    </>
                  ) : null}
                </div>
              </section>

              {/* AVAILABILITY */}
              <section className="mt-8 border-t border-slate-100 pt-7">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[11px] font-black text-[#1B519F]">
                    04
                  </span>

                  <h3 className="text-base font-black text-slate-900">
                    Availability
                  </h3>
                </div>

                <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                  <TrainerPreviewField
                    label="Preferred Training Mode"
                    value={trainerPreviewValue(
                      previewData,
                      "preferredMode",
                    )}
                  />

                  <TrainerPreviewField
                    label="Preferred Time"
                    value={trainerPreviewValue(
                      previewData,
                      "preferredTime",
                    )}
                  />

                  <TrainerPreviewField
                    label="Available Days"
                    value={
                      previewData
                        .getAll(
                          "availableDays",
                        )
                        .map(String)
                        .join(", ") ||
                      "-"
                    }
                  />
                </div>
              </section>

              {/* DOCUMENTS */}
              <section className="mt-8 border-t border-slate-100 pt-7">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[11px] font-black text-[#1B519F]">
                    05
                  </span>

                  <h3 className="text-base font-black text-slate-900">
                    CV & Certifications
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      CV / Resume
                    </p>

                    <p className="mt-2 break-all text-sm font-bold text-slate-800">
                      {trainerPreviewFileName(
                        previewData,
                        "cv",
                      ) || "-"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Certifications
                    </p>

                    <p className="mt-2 text-sm font-bold text-slate-800">
                      {certifications.length}
                      {" "}
                      document
                      {certifications.length === 1
                        ? ""
                        : "s"}
                    </p>
                  </div>
                </div>

                {certifications.length ? (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {certifications.map(
                      (
                        certification,
                        index,
                      ) => (
                        <div
                          key={
                            certification.id
                          }
                          className="rounded-2xl border border-slate-100 p-4"
                        >
                          <p className="text-sm font-black text-[#1B519F]">
                            {certification.name ||
                              `Certification ${index + 1}`}
                          </p>

                          <p className="mt-1 text-xs font-medium text-slate-500">
                            {certification.issuer ||
                              "Issuer not provided"}
                          </p>

                          {certification.file ? (
                            <p className="mt-2 break-all text-[11px] font-bold text-slate-600">
                              {
                                certification
                                  .file
                                  .name
                              }
                            </p>
                          ) : null}
                        </div>
                      ),
                    )}
                  </div>
                ) : null}
              </section>

              {/* MOTIVATION */}
              <section className="mt-8 border-t border-slate-100 pt-7">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[11px] font-black text-[#1B519F]">
                    06
                  </span>

                  <h3 className="text-base font-black text-slate-900">
                    Motivation & Practical Value
                  </h3>
                </div>

                <div className="space-y-5">
                  <TrainerPreviewField
                    label="Short Bio"
                    value={trainerPreviewValue(
                      previewData,
                      "shortBio",
                    )}
                  />

                  <TrainerPreviewField
                    label="Why do you want to become a trainer?"
                    value={trainerPreviewValue(
                      previewData,
                      "motivation",
                    )}
                  />

                  <TrainerPreviewField
                    label="Practical Value for Learners"
                    value={trainerPreviewValue(
                      previewData,
                      "practicalValue",
                    )}
                  />

                  <TrainerPreviewField
                    label="Additional Information"
                    value={trainerPreviewValue(
                      previewData,
                      "additionalInformation",
                    )}
                  />
                </div>
              </section>

            </div>

            {/* ACTIONS */}
            <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-slate-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">

              <button
                type="button"
                onClick={() =>
                  setPreviewOpen(false)
                }
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-200"
              >
                Edit / Change
              </button>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={
                    downloadTrainerPreview
                  }
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border-2 border-[#1B519F] px-5 py-3 text-sm font-black text-[#1B519F] transition hover:bg-blue-50"
                >
                  Download Preview
                </button>

                <button
                  type="button"
                  onClick={
                    saveAndSubmitPreview
                  }
                  disabled={submitting}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#1B519F] px-6 py-3 text-sm font-black text-white transition hover:bg-[#143f7d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting
                    ? "Submitting..."
                    : "Save & Submit"}
                </button>
              </div>

            </div>
          </div>
        </div>
      ) : null}
    </form>
  );
}

function Section({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF5FF] text-xs font-black text-[#1B519F]">
          {number}
        </span>

        <div>
          <h2 className="text-xl font-black text-[#1B519F]">
            {title}
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function Field({
  label,
  required = false,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-slate-800">
        {label}
        {required ? (
          <span className="ml-1 text-red-500">
            *
          </span>
        ) : null}
      </span>

      {children}

      {hint ? (
        <span className="mt-2 block text-xs leading-5 text-slate-500">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#1B519F] focus:ring-2 focus:ring-blue-100";

const textareaClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#1B519F] focus:ring-2 focus:ring-blue-100";

const fileClass =
  "block w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-[#1B519F] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white";

const choiceClass =
  "flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700";
