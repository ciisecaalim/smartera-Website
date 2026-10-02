import type {
  TrainingActivity,
  TrainingFilters,
  TrainingStatus,
} from "@/features/training/types/training.types";

export const trainingStatusConfig: Record<
  TrainingStatus,
  {
    label: string;
    className: string;
  }
> = {
  upcoming: {
    label: "Upcoming",
    className:
      "bg-blue-600 text-white",
  },

  live: {
    label: "Live",
    className:
      "bg-emerald-600 text-white",
  },

  completed: {
    label: "Completed",
    className:
      "bg-slate-600 text-white",
  },

  cancelled: {
    label: "Cancelled",
    className:
      "bg-red-600 text-white",
  },
};

const dateFormatter =
  new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    },
  );

export function formatTrainingDate(
  item: TrainingActivity,
) {
  if (!item.startDate) {
    return "Date to be confirmed";
  }

  const start =
    dateFormatter.format(
      new Date(
        `${item.startDate}T00:00:00Z`,
      ),
    );

  if (!item.endDate) {
    return start;
  }

  const end =
    dateFormatter.format(
      new Date(
        `${item.endDate}T00:00:00Z`,
      ),
    );

  return `${start} - ${end}`;
}

export function getParticipantDisplay(
  item: TrainingActivity,
) {
  if (
    item.status === "completed" &&
    item.actualParticipants !==
      undefined
  ) {
    return `${item.actualParticipants} Participants`;
  }

  if (
    item.expectedParticipants !==
    undefined
  ) {
    return `${item.expectedParticipants} Expected Participants`;
  }

  return undefined;
}

export function filterTrainings(
  items: TrainingActivity[],
  filters: TrainingFilters,
) {
  const query =
    filters.search
      .trim()
      .toLowerCase();

  return items.filter(
    (item) => {
      const searchable = [
        item.title,
        item.trainingType,
        item.targetGroup,
        item.location,
        item.shortDescription,
        ...item.topics,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        (filters.status ===
          "all" ||
          item.status ===
            filters.status) &&
        (!query ||
          searchable.includes(
            query,
          ))
      );
    },
  );
}