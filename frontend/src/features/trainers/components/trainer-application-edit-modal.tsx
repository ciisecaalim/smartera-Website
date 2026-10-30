"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

const API =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5000/api";

const DAYS = [
  ["SUNDAY", "Sunday"],
  ["MONDAY", "Monday"],
  ["TUESDAY", "Tuesday"],
  ["WEDNESDAY", "Wednesday"],
  ["THURSDAY", "Thursday"],
  ["FRIDAY", "Friday"],
  ["SATURDAY", "Saturday"],
] as const;

type CertificationForm = {
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  credentialUrl: string;
  hasFile: boolean;
};

type EditForm = {
  fullName: string;
  email: string;
  phone: string;

  currentJobTitle: string;
  currentOrganization: string;

  yearsExperience: string;
  highestEducationLevel: string;
  fieldOfStudy: string;

  expertiseAreas: string;

  hasTrainingExperience: boolean;
  trainingExperienceYears: string;
  trainingOrganizations: string;
  trainingSubjects: string;
  learnersTrained: string;

  preferredMode: string;
  availableDays: string[];
  preferredTime: string;

  shortBio: string;
  motivation: string;
  practicalValue: string;
  additionalInformation: string;

  profilePhotoName: string;
  cvName: string;

  certifications: CertificationForm[];
};

type ApiApplication = {
  applicationNumber: string;
  status: string;
  deletionRequestedAt?: string | null;

  fullName?: string;
  email?: string;
  phone?: string;

  currentJobTitle?: string;
  currentOrganization?: string | null;

  yearsExperience?: string | number;
  highestEducationLevel?: string;
  fieldOfStudy?: string | null;

  expertiseAreas?: string[];

  hasTrainingExperience?: boolean;
  trainingExperienceYears?:
    | string
    | number
    | null;

  trainingOrganizations?: string[];
  trainingSubjects?: string[];

  learnersTrained?:
    | string
    | number
    | null;

  preferredMode?: string;
  availableDays?: string[];
  preferredTime?: string;

  shortBio?: string;
  motivation?: string;
  practicalValue?: string;

  additionalInformation?:
    | string
    | null;

  profilePhoto?: {
    originalName?: string | null;
    available?: boolean;
  };

  cv?: {
    originalName?: string | null;
    available?: boolean;
  };

  certifications?: Array<{
    name?: string;
    issuer?: string;

    issueDate?: string | null;
    expiryDate?: string | null;

    credentialId?: string | null;
    credentialUrl?: string | null;

    hasFile?: boolean;
  }>;
};

type Props = {
  open: boolean;

  applicationNumber: string;
  editToken: string;
  deletionRequested?: boolean;

  onClose: () => void;
  onUpdated: () => void;
};

const INPUT =
  "mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1B519F] focus:ring-2 focus:ring-[#1B519F]/15 invalid:border-red-500 invalid:ring-2 invalid:ring-red-100";

const READONLY_INPUT =
  "mt-2 min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-600 outline-none";

const TEXTAREA =
  "mt-2 min-h-28 w-full resize-y rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1B519F] focus:ring-2 focus:ring-[#1B519F]/15 invalid:border-red-500 invalid:ring-2 invalid:ring-red-100";

function dateOnly(
  value?: string | null,
) {
  if (!value) {
    return "";
  }

  return String(value).slice(
    0,
    10,
  );
}

function asString(
  value: unknown,
) {
  if (
    value === undefined ||
    value === null
  ) {
    return "";
  }

  return String(value);
}

function toEditForm(
  data: ApiApplication,
): EditForm {
  return {
    fullName:
      data.fullName ?? "",

    email:
      data.email ?? "",

    phone:
      data.phone ?? "",

    currentJobTitle:
      data.currentJobTitle ?? "",

    currentOrganization:
      data.currentOrganization ?? "",

    yearsExperience:
      asString(
        data.yearsExperience,
      ),

    highestEducationLevel:
      data.highestEducationLevel ??
      "",

    fieldOfStudy:
      data.fieldOfStudy ?? "",

    expertiseAreas:
      (data.expertiseAreas ?? [])
        .join(", "),

    hasTrainingExperience:
      Boolean(
        data.hasTrainingExperience,
      ),

    trainingExperienceYears:
      asString(
        data.trainingExperienceYears,
      ),

    trainingOrganizations:
      (
        data.trainingOrganizations ??
        []
      ).join(", "),

    trainingSubjects:
      (
        data.trainingSubjects ??
        []
      ).join(", "),

    learnersTrained:
      asString(
        data.learnersTrained,
      ),

    preferredMode:
      data.preferredMode ?? "",

    availableDays:
      data.availableDays ?? [],

    preferredTime:
      data.preferredTime ?? "",

    shortBio:
      data.shortBio ?? "",

    motivation:
      data.motivation ?? "",

    practicalValue:
      data.practicalValue ?? "",

    additionalInformation:
      data.additionalInformation ??
      "",

    profilePhotoName:
      data.profilePhoto
        ?.originalName ??
      "",

    cvName:
      data.cv?.originalName ??
      "",

    certifications:
      (
        data.certifications ?? []
      ).map(
        (item) => ({
          name:
            item.name ?? "",

          issuer:
            item.issuer ?? "",

          issueDate:
            dateOnly(
              item.issueDate,
            ),

          expiryDate:
            dateOnly(
              item.expiryDate,
            ),

          credentialId:
            item.credentialId ??
            "",

          credentialUrl:
            item.credentialUrl ??
            "",

          hasFile:
            Boolean(
              item.hasFile,
            ),
        }),
      ),
  };
}

function splitValues(
  value: string,
) {
  return value
    .split(/[,\n]/)
    .map(
      (item) =>
        item.trim(),
    )
    .filter(Boolean);
}

function optionalAppend(
  target: FormData,
  name: string,
  value: string,
) {
  const clean =
    value.trim();

  if (clean) {
    target.append(
      name,
      clean,
    );
  }
}

export function TrainerApplicationEditModal({
  open,
  applicationNumber,
  editToken,
  deletionRequested = false,
  onClose,
  onUpdated,
}: Props) {
  const [
    form,
    setForm,
  ] =
    useState<EditForm | null>(
      null,
    );

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    const controller =
      new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(
            `${API}/web/trainers/applications/${encodeURIComponent(
              applicationNumber,
            )}/manage`,
            {
              method: "GET",

              headers: {
                "x-trainer-edit-token":
                  editToken,
              },

              signal:
                controller.signal,
            },
          );

        const result =
          (await response.json()) as {
            success?: boolean;
            message?: string;
            data?: ApiApplication;
          };

        if (
          !response.ok ||
          !result.success ||
          !result.data
        ) {
          throw new Error(
            result.message ||
              "Unable to load your application.",
          );
        }

        setForm(
          toEditForm(
            result.data,
          ),
        );
      }
      catch (caught) {
        if (
          caught instanceof DOMException &&
          caught.name ===
            "AbortError"
        ) {
          return;
        }

        setError(
          caught instanceof Error
            ? caught.message
            : "Unable to load your application.",
        );
      }
      finally {
        setLoading(false);
      }
    }

    void load();

    return () => {
      controller.abort();
    };
  }, [
    open,
    applicationNumber,
    editToken,
  ]);

  if (!open) {
    return null;
  }

  function updateField(
    name: keyof EditForm,
    value: string | boolean | string[],
  ) {
    setForm(
      (current) =>
        current
          ? {
              ...current,
              [name]: value,
            }
          : current,
    );
  }

  function updateCertification(
    index: number,
    patch:
      Partial<CertificationForm>,
  ) {
    setForm(
      (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,

          certifications:
            current.certifications.map(
              (
                item,
                itemIndex,
              ) =>
                itemIndex ===
                index
                  ? {
                      ...item,
                      ...patch,
                    }
                  : item,
            ),
        };
      },
    );
  }

  function toggleDay(
    day: string,
  ) {
    if (!form) {
      return;
    }

    const exists =
      form.availableDays.includes(
        day,
      );

    updateField(
      "availableDays",
      exists
        ? form.availableDays.filter(
            (item) =>
              item !== day,
          )
        : [
            ...form.availableDays,
            day,
          ],
    );
  }

  async function saveChanges(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!form) {
      return;
    }

    if (deletionRequested) {
      setError(
        "Your deletion request is waiting for administrator approval, so you can no longer change this application.",
      );

      return;
    }

    setError("");

    if (
      !form.availableDays.length
    ) {
      setError(
        "Select at least one available day.",
      );

      return;
    }

    if (
      !splitValues(
        form.expertiseAreas,
      ).length
    ) {
      setError(
        "Add at least one expertise area.",
      );

      return;
    }

    const payload =
      new FormData();

    payload.append(
      "fullName",
      form.fullName.trim(),
    );

    payload.append(
      "email",
      form.email.trim(),
    );

    payload.append(
      "phone",
      form.phone.trim(),
    );

    payload.append(
      "currentJobTitle",
      form.currentJobTitle.trim(),
    );

    optionalAppend(
      payload,
      "currentOrganization",
      form.currentOrganization,
    );

    payload.append(
      "yearsExperience",
      form.yearsExperience.trim(),
    );

    payload.append(
      "highestEducationLevel",
      form.highestEducationLevel,
    );

    optionalAppend(
      payload,
      "fieldOfStudy",
      form.fieldOfStudy,
    );

    payload.append(
      "expertiseAreas",
      splitValues(
        form.expertiseAreas,
      ).join(","),
    );

    payload.append(
      "hasTrainingExperience",
      form.hasTrainingExperience
        ? "true"
        : "false",
    );

    if (
      form.hasTrainingExperience
    ) {
      optionalAppend(
        payload,
        "trainingExperienceYears",
        form.trainingExperienceYears,
      );

      payload.append(
        "trainingOrganizations",
        splitValues(
          form.trainingOrganizations,
        ).join(","),
      );

      payload.append(
        "trainingSubjects",
        splitValues(
          form.trainingSubjects,
        ).join(","),
      );

      optionalAppend(
        payload,
        "learnersTrained",
        form.learnersTrained,
      );
    }

    payload.append(
      "preferredMode",
      form.preferredMode,
    );

    payload.append(
      "availableDays",
      form.availableDays.join(
        ",",
      ),
    );

    payload.append(
      "preferredTime",
      form.preferredTime,
    );

    payload.append(
      "shortBio",
      form.shortBio.trim(),
    );

    payload.append(
      "motivation",
      form.motivation.trim(),
    );

    payload.append(
      "practicalValue",
      form.practicalValue.trim(),
    );

    optionalAppend(
      payload,
      "additionalInformation",
      form.additionalInformation,
    );

    payload.append(
      "consent",
      "true",
    );

    payload.append(
      "certifications",
      JSON.stringify(
        form.certifications.map(
          (item) => ({
            name:
              item.name.trim(),

            issuer:
              item.issuer.trim(),

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
          }),
        ),
      ),
    );

    try {
      setSaving(true);

      const response =
        await fetch(
          `${API}/web/trainers/applications/${encodeURIComponent(
            applicationNumber,
          )}/manage`,
          {
            method: "PATCH",

            headers: {
              "x-trainer-edit-token":
                editToken,
            },

            body:
              payload,
          },
        );

      const result =
        (await response.json()) as {
          success?: boolean;
          message?: string;

          errors?: Array<{
            message?: string;
          }>;
        };

      if (
        !response.ok ||
        !result.success
      ) {
        const firstError =
          result.errors?.find(
            (item) =>
              item.message,
          )?.message;

        throw new Error(
          firstError ||
            result.message ||
            "Unable to update your application.",
        );
      }

      onUpdated();
      onClose();
    }
    catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Unable to update your application.",
      );
    }
    finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-label="Edit trainer application"
    >
      <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white/95 px-5 py-5 backdrop-blur sm:px-7">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1B519F]">
              Your Trainer Application
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-950 sm:text-2xl">
              Edit Application
            </h2>

            <p className="mt-1 text-sm font-semibold text-slate-500">
              {applicationNumber}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 text-xl font-bold text-slate-600 transition hover:bg-slate-100"
            aria-label="Close edit application"
          >
            ×
          </button>
        </div>

        {loading ? (
          <div className="flex min-h-80 items-center justify-center p-8">
            <div className="text-center">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-[#1B519F]" />

              <p className="mt-4 text-sm font-bold text-slate-600">
                Loading your application...
              </p>
            </div>
          </div>
        ) : null}

        {!loading && error && !form ? (
          <div className="p-6 sm:p-8">
            <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-700">
              {error}
            </div>
          </div>
        ) : null}

        {!loading && form ? (
          <form
            onSubmit={saveChanges}
            className="p-5 sm:p-7"
          >
            {error ? (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-700">
                {error}
              </div>
            ) : null}

            {deletionRequested ? (
              <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-semibold leading-6 text-amber-900">
                Your deletion request is waiting for administrator approval. This application is locked while the request is reviewed.
              </div>
            ) : null}

            <section>
              <div className="mb-5">
                <p className="text-xs font-black uppercase tracking-wider text-[#1B519F]">
                  01 · Personal Information
                </p>

                <h3 className="mt-1 text-lg font-black text-slate-950">
                  Basic Details
                </h3>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="text-sm font-bold text-slate-700">
                  Full Name *
                  <input
                    required
                    disabled={deletionRequested}
                    value={form.fullName}
                    onChange={(event) =>
                      updateField(
                        "fullName",
                        event.target.value,
                      )
                    }
                    className={INPUT}
                  />
                </label>

                <label className="text-sm font-bold text-slate-700">
                  Email Address *
                  <input
                    required
                    disabled={deletionRequested}
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      updateField(
                        "email",
                        event.target.value,
                      )
                    }
                    className={INPUT}
                  />
                </label>

                <label className="text-sm font-bold text-slate-700">
                  Phone Number *
                  <input
                    required
                    disabled={deletionRequested}
                    value={form.phone}
                    onChange={(event) =>
                      updateField(
                        "phone",
                        event.target.value,
                      )
                    }
                    className={INPUT}
                  />
                </label>

                <label className="text-sm font-bold text-slate-700">
                  Current Job Title *
                  <input
                    required
                    disabled={deletionRequested}
                    value={
                      form.currentJobTitle
                    }
                    onChange={(event) =>
                      updateField(
                        "currentJobTitle",
                        event.target.value,
                      )
                    }
                    className={INPUT}
                  />
                </label>

                <label className="text-sm font-bold text-slate-700">
                  Current Organization
                  <input
                    value={
                      form.currentOrganization
                    }
                    onChange={(event) =>
                      updateField(
                        "currentOrganization",
                        event.target.value,
                      )
                    }
                    className={INPUT}
                  />
                </label>

                <label className="text-sm font-bold text-slate-700">
                  Years of Experience *
                  <input
                    required
                    disabled={deletionRequested}
                    type="number"
                    min="0"
                    value={
                      form.yearsExperience
                    }
                    onChange={(event) =>
                      updateField(
                        "yearsExperience",
                        event.target.value,
                      )
                    }
                    className={INPUT}
                  />
                </label>
              </div>
            </section>

            <div className="my-8 border-t border-slate-200" />

            <section>
              <p className="text-xs font-black uppercase tracking-wider text-[#1B519F]">
                02 · Professional Profile
              </p>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <label className="text-sm font-bold text-slate-700">
                  Highest Education Level
                  <input
                    readOnly
                    value={
                      form.highestEducationLevel
                    }
                    className={
                      READONLY_INPUT
                    }
                  />

                  <span className="mt-1 block text-xs font-medium text-slate-400">
                    Kept exactly as originally selected.
                  </span>
                </label>

                <label className="text-sm font-bold text-slate-700">
                  Field of Study
                  <input
                    value={
                      form.fieldOfStudy
                    }
                    onChange={(event) =>
                      updateField(
                        "fieldOfStudy",
                        event.target.value,
                      )
                    }
                    className={INPUT}
                  />
                </label>

                <label className="text-sm font-bold text-slate-700 md:col-span-2">
                  Expertise Areas *
                  <textarea
                    required
                    disabled={deletionRequested}
                    value={
                      form.expertiseAreas
                    }
                    onChange={(event) =>
                      updateField(
                        "expertiseAreas",
                        event.target.value,
                      )
                    }
                    className={TEXTAREA}
                    placeholder="Data Analysis, Excel, Power BI"
                  />

                  <span className="mt-1 block text-xs font-medium text-slate-400">
                    Separate multiple areas with commas.
                  </span>
                </label>
              </div>
            </section>

            <div className="my-8 border-t border-slate-200" />

            <section>
              <p className="text-xs font-black uppercase tracking-wider text-[#1B519F]">
                03 · Training Experience
              </p>

              <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-4">
                <input
                  type="checkbox"
                  checked={
                    form.hasTrainingExperience
                  }
                  onChange={(event) =>
                    updateField(
                      "hasTrainingExperience",
                      event.target.checked,
                    )
                  }
                  className="h-5 w-5 accent-[#1B519F]"
                />

                <span className="text-sm font-bold text-slate-700">
                  I have previous training experience
                </span>
              </label>

              {form.hasTrainingExperience ? (
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <label className="text-sm font-bold text-slate-700">
                    Training Experience Years
                    <input
                      type="number"
                      min="0"
                      value={
                        form.trainingExperienceYears
                      }
                      onChange={(event) =>
                        updateField(
                          "trainingExperienceYears",
                          event.target.value,
                        )
                      }
                      className={INPUT}
                    />
                  </label>

                  <label className="text-sm font-bold text-slate-700">
                    Learners Trained
                    <input
                      type="number"
                      min="0"
                      value={
                        form.learnersTrained
                      }
                      onChange={(event) =>
                        updateField(
                          "learnersTrained",
                          event.target.value,
                        )
                      }
                      className={INPUT}
                    />
                  </label>

                  <label className="text-sm font-bold text-slate-700">
                    Training Organizations
                    <textarea
                      value={
                        form.trainingOrganizations
                      }
                      onChange={(event) =>
                        updateField(
                          "trainingOrganizations",
                          event.target.value,
                        )
                      }
                      className={TEXTAREA}
                    />
                  </label>

                  <label className="text-sm font-bold text-slate-700">
                    Training Subjects
                    <textarea
                      value={
                        form.trainingSubjects
                      }
                      onChange={(event) =>
                        updateField(
                          "trainingSubjects",
                          event.target.value,
                        )
                      }
                      className={TEXTAREA}
                    />
                  </label>
                </div>
              ) : null}
            </section>

            <div className="my-8 border-t border-slate-200" />

            <section>
              <p className="text-xs font-black uppercase tracking-wider text-[#1B519F]">
                04 · Availability
              </p>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <label className="text-sm font-bold text-slate-700">
                  Preferred Mode
                  <input
                    readOnly
                    value={
                      form.preferredMode
                    }
                    className={
                      READONLY_INPUT
                    }
                  />
                </label>

                <label className="text-sm font-bold text-slate-700">
                  Preferred Time
                  <input
                    readOnly
                    value={
                      form.preferredTime
                    }
                    className={
                      READONLY_INPUT
                    }
                  />
                </label>
              </div>

              <div className="mt-5">
                <p className="text-sm font-bold text-slate-700">
                  Available Days *
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {DAYS.map(
                    ([value, label]) => {
                      const active =
                        form.availableDays.includes(
                          value,
                        );

                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() =>
                            toggleDay(
                              value,
                            )
                          }
                          className={
                            active
                              ? "rounded-full bg-[#1B519F] px-4 py-2 text-sm font-black text-white"
                              : "rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-600 hover:border-[#1B519F] hover:text-[#1B519F]"
                          }
                        >
                          {label}
                        </button>
                      );
                    },
                  )}
                </div>
              </div>
            </section>

            <div className="my-8 border-t border-slate-200" />

            <section>
              <p className="text-xs font-black uppercase tracking-wider text-[#1B519F]">
                05 · Motivation
              </p>

              <div className="mt-5 grid gap-5">
                <label className="text-sm font-bold text-slate-700">
                  Short Bio *
                  <textarea
                    required
                    disabled={deletionRequested}
                    minLength={30}
                    maxLength={300}
                    value={form.shortBio}
                    onChange={(event) =>
                      updateField(
                        "shortBio",
                        event.target.value,
                      )
                    }
                    className={TEXTAREA}
                    placeholder="Briefly introduce yourself, your expertise, and the value you bring as a trainer."
                  />

                  <span className="mt-1 flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span>
                      Used on your public trainer profile.
                    </span>

                    <span>
                      {form.shortBio.length}/300
                    </span>
                  </span>
                </label>
                <label className="text-sm font-bold text-slate-700">
                  Motivation *
                  <textarea
                    required
                    disabled={deletionRequested}
                    value={
                      form.motivation
                    }
                    onChange={(event) =>
                      updateField(
                        "motivation",
                        event.target.value,
                      )
                    }
                    className={TEXTAREA}
                  />
                </label>

                <label className="text-sm font-bold text-slate-700">
                  Practical Value *
                  <textarea
                    required
                    value={
                      form.practicalValue
                    }
                    onChange={(event) =>
                      updateField(
                        "practicalValue",
                        event.target.value,
                      )
                    }
                    className={TEXTAREA}
                  />
                </label>

                <label className="text-sm font-bold text-slate-700">
                  Additional Information
                  <textarea
                    value={
                      form.additionalInformation
                    }
                    onChange={(event) =>
                      updateField(
                        "additionalInformation",
                        event.target.value,
                      )
                    }
                    className={TEXTAREA}
                  />
                </label>
              </div>
            </section>

            {form.certifications.length ? (
              <>
                <div className="my-8 border-t border-slate-200" />

                <section>
                  <p className="text-xs font-black uppercase tracking-wider text-[#1B519F]">
                    06 · Certifications
                  </p>

                  <div className="mt-5 space-y-4">
                    {form.certifications.map(
                      (
                        certification,
                        index,
                      ) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                        >
                          <div className="grid gap-4 md:grid-cols-2">
                            <label className="text-sm font-bold text-slate-700">
                              Certification Name *
                              <input
                                required
                                value={
                                  certification.name
                                }
                                onChange={(event) =>
                                  updateCertification(
                                    index,
                                    {
                                      name:
                                        event
                                          .target
                                          .value,
                                    },
                                  )
                                }
                                className={INPUT}
                              />
                            </label>

                            <label className="text-sm font-bold text-slate-700">
                              Issuing Organization *
                              <input
                                required
                                value={
                                  certification.issuer
                                }
                                onChange={(event) =>
                                  updateCertification(
                                    index,
                                    {
                                      issuer:
                                        event
                                          .target
                                          .value,
                                    },
                                  )
                                }
                                className={INPUT}
                              />
                            </label>

                            <label className="text-sm font-bold text-slate-700">
                              Issue Date
                              <input
                                type="date"
                                value={
                                  certification.issueDate
                                }
                                onChange={(event) =>
                                  updateCertification(
                                    index,
                                    {
                                      issueDate:
                                        event
                                          .target
                                          .value,
                                    },
                                  )
                                }
                                className={INPUT}
                              />
                            </label>

                            <label className="text-sm font-bold text-slate-700">
                              Expiry Date
                              <input
                                type="date"
                                value={
                                  certification.expiryDate
                                }
                                onChange={(event) =>
                                  updateCertification(
                                    index,
                                    {
                                      expiryDate:
                                        event
                                          .target
                                          .value,
                                    },
                                  )
                                }
                                className={INPUT}
                              />
                            </label>

                            <label className="text-sm font-bold text-slate-700">
                              Credential ID
                              <input
                                value={
                                  certification.credentialId
                                }
                                onChange={(event) =>
                                  updateCertification(
                                    index,
                                    {
                                      credentialId:
                                        event
                                          .target
                                          .value,
                                    },
                                  )
                                }
                                className={INPUT}
                              />
                            </label>

                            <label className="text-sm font-bold text-slate-700">
                              Credential URL
                              <input
                                type="url"
                                value={
                                  certification.credentialUrl
                                }
                                onChange={(event) =>
                                  updateCertification(
                                    index,
                                    {
                                      credentialUrl:
                                        event
                                          .target
                                          .value,
                                    },
                                  )
                                }
                                className={INPUT}
                              />
                            </label>
                          </div>

                          <p className="mt-3 text-xs font-semibold text-slate-500">
                            {certification.hasFile
                              ? "✓ Existing certification PDF will be kept."
                              : "No certification PDF is attached."}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </section>
              </>
            ) : null}

            <div className="my-8 border-t border-slate-200" />

            <section>
              <p className="text-xs font-black uppercase tracking-wider text-[#1B519F]">
                Existing Files
              </p>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Profile Photo
                  </p>

                  <p className="mt-2 break-all text-sm font-bold text-slate-700">
                    {form.profilePhotoName ||
                      "Existing profile photo"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                    CV / Resume
                  </p>

                  <p className="mt-2 break-all text-sm font-bold text-slate-700">
                    {form.cvName ||
                      "Existing CV / Resume"}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-xs font-semibold text-slate-500">
                Your existing uploaded files remain unchanged when you edit your application.
              </p>
            </section>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="min-h-11 rounded-xl border border-slate-300 px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving || deletionRequested}
                className="min-h-11 rounded-xl bg-[#1B519F] px-7 py-3 text-sm font-black text-white transition hover:bg-[#143f7d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletionRequested
                  ? "Changes Locked"
                  : saving
                  ? "Saving Changes..."
                  : "Save Changes"}
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
}
