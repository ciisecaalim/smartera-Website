import { redirect } from "next/navigation";

/** Legacy Academy route redirects into the Academics marketplace. */
export default function AcademyRedirectPage() {
  redirect("/academics");
}
