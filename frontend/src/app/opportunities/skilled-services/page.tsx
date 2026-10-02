import { redirect } from "next/navigation";

/** Skilled work and learning now live in Jobs and Academics respectively. */
export default function SkilledServicesRedirectPage() {
  redirect("/opportunities");
}
