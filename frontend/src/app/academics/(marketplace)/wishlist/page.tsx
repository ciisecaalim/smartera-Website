import type { Metadata } from "next";
import { RequireAuth } from "@/features/academics/components/require-auth";
import { WishlistPageClient } from "@/features/academics/components/wishlist-page";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Saved Academics courses you want to revisit.",
};

export default function AcademicsWishlistPage() {
  return (
    <RequireAuth>
      <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-5 xl:px-6">
        <h1 className="text-3xl font-black tracking-tight text-[#0B1F3A]">Wishlist</h1>
        <p className="mt-2 text-sm text-slate-600">Courses you saved for later.</p>
        <div className="mt-8">
          <WishlistPageClient />
        </div>
      </div>
    </RequireAuth>
  );
}
