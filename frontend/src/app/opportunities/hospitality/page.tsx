import { redirect } from "next/navigation";

/** Hospitality work is now part of the consolidated Jobs catalog. */
export default function HospitalityRedirectPage() {
  redirect("/opportunities/jobs");
}
