"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { academicCategories } from "@/features/academics/data/categories.data";
import type { CourseLevel, CourseSortOption } from "@/features/academics/types/course.types";

const levels: Array<CourseLevel | "all"> = ["all", "Beginner", "Intermediate", "Advanced", "All Levels"];
const sorts: Array<{ value: CourseSortOption; label: string }> = [
  { value: "relevant", label: "Most Relevant" },
  { value: "highest-rated", label: "Highest Rated" },
  { value: "most-reviewed", label: "Most Reviewed" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price Low to High" },
  { value: "price-high", label: "Price High to Low" },
];

function SelectField({
  label,
  name,
  value,
  options,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (name: string, value: string) => void;
}) {
  return (
    <label className="block space-y-1.5 text-sm">
      <span className="font-semibold text-[#0B1F3A]">{label}</span>
      <select
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        className="w-full rounded-lg border border-[#E5EAF1] bg-white px-3 py-2 text-sm text-[#0B1F3A] focus:outline-none focus:ring-2 focus:ring-[#F59223]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function CourseFiltersPanel() {
  const router = useRouter();
  const params = useSearchParams();

  const update = (name: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (!value || value === "all") next.delete(name);
    else next.set(name, value);
    router.push(`/academics/search?${next.toString()}`);
  };

  return (
    <aside className="space-y-4 rounded-xl border border-[#E5EAF1] bg-white p-4">
      <h2 className="text-base font-black text-[#0B1F3A]">Filters</h2>
      <SelectField
        label="Category"
        name="category"
        value={params.get("category") ?? "all"}
        onChange={update}
        options={[
          { value: "all", label: "All categories" },
          ...academicCategories.map((category) => ({ value: category.slug, label: category.name })),
        ]}
      />
      <SelectField
        label="Level"
        name="level"
        value={params.get("level") ?? "all"}
        onChange={update}
        options={levels.map((level) => ({ value: level, label: level === "all" ? "All levels" : level }))}
      />
      <SelectField
        label="Language"
        name="language"
        value={params.get("language") ?? "all"}
        onChange={update}
        options={[
          { value: "all", label: "All languages" },
          { value: "English", label: "English" },
        ]}
      />
      <SelectField
        label="Rating"
        name="rating"
        value={params.get("rating") ?? "all"}
        onChange={update}
        options={[
          { value: "all", label: "Any rating" },
          { value: "4.5", label: "4.5 and up" },
          { value: "4.0", label: "4.0 and up" },
        ]}
      />
      <SelectField
        label="Duration"
        name="duration"
        value={params.get("duration") ?? "all"}
        onChange={update}
        options={[
          { value: "all", label: "Any duration" },
          { value: "short", label: "Under 12 hours" },
          { value: "medium", label: "12–24 hours" },
          { value: "long", label: "Over 24 hours" },
        ]}
      />
      <SelectField
        label="Price"
        name="price"
        value={params.get("price") ?? "all"}
        onChange={update}
        options={[
          { value: "all", label: "All prices" },
          { value: "paid", label: "Paid" },
          { value: "free", label: "Free" },
        ]}
      />
      <SelectField
        label="Sort by"
        name="sort"
        value={params.get("sort") ?? "relevant"}
        onChange={update}
        options={sorts}
      />
    </aside>
  );
}

