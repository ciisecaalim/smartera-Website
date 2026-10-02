"use client";

import Link from "next/link";

import {
  FormEvent,
  useState,
} from "react";

const API =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5000/api";

type Profile = {
  applicationNumber?: string;
  trainerSlug?: string;

  manageStatus?: string;

  profileUpdateStatus?:
    | "NONE"
    | "PENDING";

  fullName: string;
  currentJobTitle: string;

  yearsExperience: number;

  expertiseAreas: string[];
  trainingSubjects: string[];

  shortBio: string;

  linkedinUrl?: string;
  portfolioUrl?: string;
};

function splitTags(
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

function apiMessage(
  data: any,
  fallback: string,
) {
  return (
    data?.errors?.find?.(
      (item: any) =>
        item?.message,
    )?.message ||
    data?.message ||
    fallback
  );
}

export function TrainerProfileManage() {
  const [
    accessCode,
    setAccessCode,
  ] =
    useState("");

  const [
    profile,
    setProfile,
  ] =
    useState<Profile | null>(
      null,
    );

  const [
    skillsText,
    setSkillsText,
  ] =
    useState("");

  const [
    trainingText,
    setTrainingText,
  ] =
    useState("");

  const [
    loading,
    setLoading,
  ] =
    useState(false);

  const [
    saving,
    setSaving,
  ] =
    useState(false);

  const [
    error,
    setError,
  ] =
    useState("");

  const [
    notice,
    setNotice,
  ] =
    useState("");

  async function openProfile(
    event: FormEvent,
  ) {
    event.preventDefault();

    setError("");
    setNotice("");

    const code =
      accessCode.trim();

    if (!code) {
      setError(
        "Enter your Manage Access Code.",
      );

      return;
    }

    setLoading(true);

    try {
      const response =
        await fetch(
          `${API}/web/trainers/profile-manage/open`,
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                accessCode:
                  code,
              }),
          },
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result?.success ||
        !result?.data
      ) {
        throw new Error(
          apiMessage(
            result,
            "Unable to open trainer profile.",
          ),
        );
      }

      const data =
        result.data as Profile;

      setProfile(
        data,
      );

      setSkillsText(
        (
          data.expertiseAreas ??
          []
        ).join(", "),
      );

      setTrainingText(
        (
          data.trainingSubjects ??
          []
        ).join(", "),
      );
    }
    catch (err) {
      setProfile(null);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to open trainer profile.",
      );
    }
    finally {
      setLoading(false);
    }
  }

  function updateField<
    K extends keyof Profile,
  >(
    key: K,
    value: Profile[K],
  ) {
    setProfile(
      (current) =>
        current
          ? {
              ...current,
              [key]:
                value,
            }
          : current,
    );
  }

  async function submitChanges(
    event: FormEvent,
  ) {
    event.preventDefault();

    if (!profile) {
      return;
    }

    setError("");
    setNotice("");
    setSaving(true);

    try {
      const expertiseAreas =
        splitTags(
          skillsText,
        );

      const trainingSubjects =
        splitTags(
          trainingText,
        );

      if (
        expertiseAreas.length ===
        0
      ) {
        throw new Error(
          "Add at least one skill or expertise area.",
        );
      }

      const response =
        await fetch(
          `${API}/web/trainers/profile-manage/update`,
          {
            method:
              "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                accessCode:
                  accessCode.trim(),

                profile: {
                  fullName:
                    profile.fullName,

                  currentJobTitle:
                    profile.currentJobTitle,

                  yearsExperience:
                    Number(
                      profile.yearsExperience,
                    ),

                  expertiseAreas,

                  trainingSubjects,

                  shortBio:
                    profile.shortBio,

                  linkedinUrl:
                    profile.linkedinUrl ??
                    "",

                  portfolioUrl:
                    profile.portfolioUrl ??
                    "",
                },
              }),
          },
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          apiMessage(
            result,
            "Unable to submit profile changes.",
          ),
        );
      }

      setProfile(
        {
          ...profile,

          expertiseAreas,

          trainingSubjects,

          profileUpdateStatus:
            "PENDING",
        },
      );

      setNotice(
        "Your changes were submitted successfully. The published profile will stay unchanged until an administrator approves them.",
      );
    }
    catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit profile changes.",
      );
    }
    finally {
      setSaving(false);
    }
  }

  if (!profile) {
    return (
      <main className="min-h-[70vh] bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-xl">
          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">

            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1B519F]">
              Trainer Portal
            </p>

            <h1 className="mt-2 text-3xl font-black text-slate-950">
              Manage My Profile
            </h1>

            <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
              Approved trainers can enter their Manage Access Code to update their profile.
            </p>

            <form
              onSubmit={
                openProfile
              }
              className="mt-7"
            >
              <label className="block text-sm font-black text-slate-800">
                Manage Access Code

                <textarea
                  value={
                    accessCode
                  }
                  onChange={(
                    event,
                  ) =>
                    setAccessCode(
                      event.target.value,
                    )
                  }
                  rows={3}
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="Paste your Manage Access Code here"
                  className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm outline-none focus:border-[#1B519F]"
                />
              </label>

              {error ? (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={
                  loading
                }
                className="mt-5 min-h-12 w-full rounded-xl bg-[#1B519F] px-5 py-3 text-sm font-black text-white disabled:opacity-60"
              >
                {loading
                  ? "Checking access..."
                  : "Continue"}
              </button>
            </form>

            <Link
              href="/trainers"
              className="mt-4 flex min-h-11 items-center justify-center rounded-xl border border-slate-300 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Back to Trainers
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">

        <div className="rounded-3xl border border-blue-100 bg-white shadow-sm">

          <header className="border-b p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1B519F]">
              Trainer Portal
            </p>

            <h1 className="mt-2 text-3xl font-black text-slate-950">
              Manage My Profile
            </h1>

            <p className="mt-2 text-sm font-semibold text-slate-600">
              {profile.fullName}
            </p>

            {profile.profileUpdateStatus ===
            "PENDING" ? (
              <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">
                Profile changes are waiting for admin approval.
              </div>
            ) : null}
          </header>

          <form
            onSubmit={
              submitChanges
            }
            className="space-y-8 p-6 sm:p-8"
          >

            <section>
              <h2 className="text-lg font-black text-slate-950">
                Basic Profile
              </h2>

              <div className="mt-4 grid gap-5 md:grid-cols-2">

                <label className="text-sm font-bold text-slate-700">
                  Full Name

                  <input
                    required
                    value={
                      profile.fullName
                    }
                    onChange={(
                      event,
                    ) =>
                      updateField(
                        "fullName",
                        event.target.value,
                      )
                    }
                    className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none"
                  />
                </label>

                <label className="text-sm font-bold text-slate-700">
                  Professional Title

                  <input
                    required
                    value={
                      profile.currentJobTitle
                    }
                    onChange={(
                      event,
                    ) =>
                      updateField(
                        "currentJobTitle",
                        event.target.value,
                      )
                    }
                    className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none"
                  />
                </label>

                <label className="text-sm font-bold text-slate-700">
                  Years of Experience

                  <input
                    required
                    type="number"
                    min="0"
                    max="80"
                    value={
                      profile.yearsExperience
                    }
                    onChange={(
                      event,
                    ) =>
                      updateField(
                        "yearsExperience",
                        Number(
                          event.target.value,
                        ),
                      )
                    }
                    className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none"
                  />
                </label>

              </div>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-950">
                Expertise
              </h2>

              <div className="mt-4 grid gap-5 md:grid-cols-2">

                <label className="text-sm font-bold text-slate-700">
                  Skills / Expertise Areas

                  <textarea
                    required
                    rows={5}
                    value={
                      skillsText
                    }
                    onChange={(
                      event,
                    ) =>
                      setSkillsText(
                        event.target.value,
                      )
                    }
                    placeholder="Data Analysis, Excel, Power BI"
                    className="mt-2 w-full resize-y rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none"
                  />
                </label>

                <label className="text-sm font-bold text-slate-700">
                  Training Areas

                  <textarea
                    rows={5}
                    value={
                      trainingText
                    }
                    onChange={(
                      event,
                    ) =>
                      setTrainingText(
                        event.target.value,
                      )
                    }
                    placeholder="Excel, Power BI, Data Cleaning"
                    className="mt-2 w-full resize-y rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none"
                  />
                </label>

              </div>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-950">
                Biography
              </h2>

              <label className="mt-4 block text-sm font-bold text-slate-700">
                Short Bio

                <textarea
                  required
                  minLength={30}
                  maxLength={300}
                  rows={5}
                  value={
                    profile.shortBio
                  }
                  onChange={(
                    event,
                  ) =>
                    updateField(
                      "shortBio",
                      event.target.value,
                    )
                  }
                  className="mt-2 w-full resize-y rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none"
                />

                <span className="mt-1 block text-xs text-slate-400">
                  {profile.shortBio.length}/300
                </span>
              </label>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-950">
                Professional Links
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                These are stored in the database but are not shown as direct-contact links on the public trainer landing page.
              </p>

              <div className="mt-4 grid gap-5 md:grid-cols-2">

                <label className="text-sm font-bold text-slate-700">
                  LinkedIn

                  <input
                    type="url"
                    value={
                      profile.linkedinUrl ??
                      ""
                    }
                    onChange={(
                      event,
                    ) =>
                      updateField(
                        "linkedinUrl",
                        event.target.value,
                      )
                    }
                    className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none"
                  />
                </label>

                <label className="text-sm font-bold text-slate-700">
                  Portfolio

                  <input
                    type="url"
                    value={
                      profile.portfolioUrl ??
                      ""
                    }
                    onChange={(
                      event,
                    ) =>
                      updateField(
                        "portfolioUrl",
                        event.target.value,
                      )
                    }
                    className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none"
                  />
                </label>

              </div>
            </section>

            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                {error}
              </div>
            ) : null}

            {notice ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-bold text-emerald-700">
                ✓ {notice}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:justify-between">

              <button
                type="button"
                onClick={() => {
                  setProfile(null);
                  setAccessCode("");
                  setError("");
                  setNotice("");
                }}
                className="min-h-12 rounded-xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-700"
              >
                Sign Out
              </button>

              <button
                type="submit"
                disabled={
                  saving
                }
                className="min-h-12 rounded-xl bg-[#1B519F] px-7 py-3 text-sm font-black text-white disabled:opacity-60"
              >
                {saving
                  ? "Submitting..."
                  : "Submit Changes for Approval"}
              </button>

            </div>
          </form>
        </div>
      </div>
    </main>
  );
}