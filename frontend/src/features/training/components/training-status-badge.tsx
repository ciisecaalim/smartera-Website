import type { TrainingStatus } from "@/features/training/types/training.types";
import { trainingStatusConfig } from "@/features/training/utils/training.utils";
export function TrainingStatusBadge({status}:{status:TrainingStatus}){const config=trainingStatusConfig[status];return <span className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[.08em] ${config.className}`}>{config.label}</span>}
