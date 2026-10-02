import type { PublicSubmissionSource } from "./public-submissions.service";

const personFields = new Set([
  "fullName",
  "contactPerson",
]);

const organizationFields = new Set([
  "organization",
  "organizationName",
]);

const addressFields = new Set([
  "location",
  "address",
  "workplace",
]);

const meaningfulTextRules: Record<
  string,
  { min: number; max: number; label: string }
> = {
  subject: {
    min: 2,
    max: 180,
    label: "Subject",
  },
  message: {
    min: 10,
    max: 3000,
    label: "Message",
  },
  requirements: {
    min: 10,
    max: 3000,
    label: "Requirements",
  },
  experience: {
    min: 3,
    max: 2000,
    label: "Experience",
  },
  motivation: {
    min: 10,
    max: 3000,
    label: "Motivation",
  },
  summary: {
    min: 3,
    max: 1500,
    label: "Summary",
  },
  skills: {
    min: 2,
    max: 1500,
    label: "Current Skills",
  },
  trainingNeeded: {
    min: 3,
    max: 180,
    label: "Training Needed",
  },
  fieldOfStudy: {
    min: 2,
    max: 150,
    label: "Field of Study",
  },
};

const integerFields: Record<string, [number, number]> = {
  participants: [1, 10000],
  expectedUsers: [1, 10000000],
};

const enumFields: Partial<
  Record<PublicSubmissionSource, Record<string, string[]>>
> = {
  contact: {
    subject: [
      "training",
      "employment",
      "internship",
      "partnership",
      "ict",
      "other",
    ],
  },

  about: {
    inquiryType: [
      "general",
      "training",
      "career",
      "ict",
      "partnership",
      "events",
      "other",
    ],
  },

  training: {
    requestType: [
      "individual",
      "organization",
      "group",
    ],
    trainingMode: [
      "on-site",
      "online",
      "hybrid",
    ],
  },

  trainers: {
    trainingMode: [
      "on-site",
      "online",
      "hybrid",
    ],
  },

  internships: {
    education: [
      "Secondary",
      "Diploma",
      "Undergraduate",
      "Graduate",
      "Other",
    ],
  },

  "job-assistance": {
    education: [
      "Secondary",
      "Diploma",
      "Undergraduate",
      "Graduate",
      "Other",
    ],
  },

  "job-seekers": {
    kind: [
      "training",
      "work",
    ],
  },

  "ict-services": {
    projectStage: [
      "idea",
      "requirements",
      "existing",
      "improvement",
    ],
    budgetRange: [
      "discuss",
      "small",
      "medium",
      "large",
    ],
  },

  partners: {
    organizationType: [
      "company",
      "ngo",
      "education",
      "healthcare",
      "government",
      "other",
    ],
    partnershipInterest: [
      "training",
      "career",
      "ict",
      "academic",
      "events",
      "other",
    ],
  },

  blogs: {
    messageType: [
      "question",
      "feedback",
      "correction",
      "business",
      "other",
    ],
  },
};

function hasMeaningfulLetters(value: string): boolean {
  return /\p{L}/u.test(value);
}

function isRepeatedJunk(value: string): boolean {
  const compact = value
    .trim()
    .toLocaleLowerCase()
    .replace(/\s+/g, "");

  if (!compact) {
    return true;
  }

  // aaaaaa / 111111 / ........
  if (/^(.)\1{5,}$/u.test(compact)) {
    return true;
  }

  // abababa... / testtesttesttest
  if (/^(.{1,4})\1{3,}$/u.test(compact)) {
    return true;
  }

  return false;
}

function isLowInformation(value: string): boolean {
  const trimmed = value.trim();

  if (!trimmed) {
    return true;
  }

  // Reject numeric-only / punctuation-only / symbol-only text.
  if (!hasMeaningfulLetters(trimmed)) {
    return true;
  }

  // Reject obvious repeated-character/token junk.
  if (isRepeatedJunk(trimmed)) {
    return true;
  }

  return false;
}

function setError(
  form: HTMLFormElement,
  name: string,
  message: string,
): never {
  const input = form.elements.namedItem(name);

  if (
    input instanceof HTMLInputElement ||
    input instanceof HTMLTextAreaElement ||
    input instanceof HTMLSelectElement
  ) {
    input.setCustomValidity(message);

    const clearError = () => {
      input.setCustomValidity("");
    };

    input.addEventListener("input", clearError, {
      once: true,
    });

    input.addEventListener("change", clearError, {
      once: true,
    });

    input.reportValidity();
    input.focus();
  }

  throw new Error(message);
}

function clearAllCustomValidity(form: HTMLFormElement) {
  Array.from(form.elements).forEach((element) => {
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement
    ) {
      element.setCustomValidity("");
    }
  });
}

function validateEmail(
  form: HTMLFormElement,
  name: string,
  value: string,
) {
  const match =
    /^([^\s@]+)@([^\s@]+\.[^\s@]+)$/.exec(value);

  const localPart = match?.[1] ?? "";

  if (
    !match ||
    value.length > 150 ||
    !/\p{L}/u.test(localPart)
  ) {
    setError(
      form,
      name,
      "Enter a valid email address with at least one letter before @.",
    );
  }
}

function validatePhone(
  form: HTMLFormElement,
  name: string,
  value: string,
) {
  const digits = value.replace(/\D/g, "");

  if (
    !/^\+?[0-9 ()-]{7,20}$/.test(value) ||
    digits.length < 7 ||
    digits.length > 15 ||
    new Set(digits).size < 2
  ) {
    setError(
      form,
      name,
      "Enter a valid phone number.",
    );
  }
}

function validateUrl(
  form: HTMLFormElement,
  name: string,
  value: string,
) {
  try {
    const url = new URL(value);

    if (
      url.protocol !== "http:" &&
      url.protocol !== "https:"
    ) {
      throw new Error("Invalid protocol");
    }
  } catch {
    setError(
      form,
      name,
      "Enter a valid HTTP or HTTPS URL.",
    );
  }
}

function validateFutureDate(
  form: HTMLFormElement,
  name: string,
  value: string,
) {
  const match =
    /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  const date = match
    ? new Date(
        Date.UTC(
          Number(match[1]),
          Number(match[2]) - 1,
          Number(match[3]),
        ),
      )
    : null;

  if (
    !match ||
    !date ||
    date.getUTCFullYear() !== Number(match[1]) ||
    date.getUTCMonth() !== Number(match[2]) - 1 ||
    date.getUTCDate() !== Number(match[3])
  ) {
    setError(
      form,
      name,
      "Choose a valid date.",
    );
  }

  const now = new Date();

  const today =
    `${now.getFullYear()}-` +
    `${String(now.getMonth() + 1).padStart(2, "0")}-` +
    `${String(now.getDate()).padStart(2, "0")}`;

  if (value <= today) {
    setError(
      form,
      name,
      "Choose a future date. Today and past dates are not allowed.",
    );
  }
}

export function validatePublicSubmission(
  source: PublicSubmissionSource,
  form: HTMLFormElement,
) {
  clearAllCustomValidity(form);

  const data = new FormData(form);

  for (const [name, raw] of data.entries()) {
    // Files are validated by their upload controls / submission layer.
    if (typeof raw !== "string") {
      continue;
    }

    const value = raw.trim();

    if (!value) {
      continue;
    }

    // Person names
    if (personFields.has(name)) {
      if (
        value.length < 2 ||
        value.length > 100 ||
        !/^[\p{L}\p{M}'’ -]+$/u.test(value) ||
        isLowInformation(value)
      ) {
        setError(
          form,
          name,
          "Enter a meaningful person name.",
        );
      }

      continue;
    }

    // Organization / company names
    if (organizationFields.has(name)) {
      if (
        value.length < 2 ||
        value.length > 150 ||
        isLowInformation(value)
      ) {
        setError(
          form,
          name,
          "Enter a meaningful organization name.",
        );
      }

      continue;
    }

    // Address / location
    if (addressFields.has(name)) {
      if (
        value.length < 3 ||
        value.length > 180 ||
        !/^[\p{L}\p{M}\p{N} .,'’/#()-]+$/u.test(value) ||
        isLowInformation(value)
      ) {
        setError(
          form,
          name,
          "Enter a meaningful address or location.",
        );
      }

      continue;
    }

    // Email
    if (name === "email") {
      validateEmail(form, name, value);
      continue;
    }

    // Phone
    if (name === "phone") {
      validatePhone(form, name, value);
      continue;
    }

    // URLs
    if (
      name === "website" ||
      name === "portfolio"
    ) {
      validateUrl(form, name, value);
      continue;
    }

    // Integer fields
    if (integerFields[name]) {
      const [min, max] = integerFields[name];

      if (
        !/^\d+$/.test(value) ||
        Number(value) < min ||
        Number(value) > max
      ) {
        setError(
          form,
          name,
          `Enter a whole number between ${min} and ${max}.`,
        );
      }

      continue;
    }

    // Future dates
    if (
      name === "preferredDate" ||
      name === "preferredStartDate"
    ) {
      validateFutureDate(
        form,
        name,
        value,
      );

      continue;
    }

    // Enum / dropdown whitelist
    const allowed =
      enumFields[source]?.[name];

    if (allowed) {
      if (!allowed.includes(value)) {
        setError(
          form,
          name,
          "Select a valid option.",
        );
      }

      continue;
    }

    // Trainer-specific rules
    if (
      source === "trainers" &&
      name === "trainingNeeded"
    ) {
      if (
        value.length < 10 ||
        value.length > 180 ||
        isLowInformation(value)
      ) {
        setError(
          form,
          name,
          "Training Needed must contain 10 to 180 meaningful characters.",
        );
      }

      continue;
    }

    if (
      source === "trainers" &&
      name === "participants"
    ) {
      if (
        !/^\d+$/.test(value) ||
        Number(value) < 1 ||
        Number(value) > 5000
      ) {
        setError(
          form,
          name,
          "Number of Participants must be a whole number between 1 and 5000.",
        );
      }

      continue;
    }

    if (
      source === "trainers" &&
      name === "duration"
    ) {
      if (
        value.length < 2 ||
        value.length > 100 ||
        isLowInformation(value)
      ) {
        setError(
          form,
          name,
          "Expected Duration must contain meaningful information, for example: 2 days.",
        );
      }

      continue;
    }

    if (
      source === "trainers" &&
      name === "message"
    ) {
      if (
        value.length < 20 ||
        value.length > 2000 ||
        isLowInformation(value)
      ) {
        setError(
          form,
          name,
          "Training Requirements must contain 20 to 2000 meaningful characters.",
        );
      }

      continue;
    }

    // Field-specific meaningful text
    const textRule =
      meaningfulTextRules[name];

    if (textRule) {
      if (
        value.length < textRule.min ||
        value.length > textRule.max ||
        isLowInformation(value)
      ) {
        setError(
          form,
          name,
          `${textRule.label} must contain meaningful information.`,
        );
      }
    }
  }
}
