export type Status =
  | "online"
  | "offline"
  | "pending"
  | "active"
  | "inactive"
  | "failed"
  | "success"
  | "suspended"
  | "successful"
  | "approved"
  | "completed";

export type StatusIntent =
  | "success"
  | "error"
  | "neutral"
  | "warning"
  | "loading";

export const STATUS_INTENT_MAP: Record<Status, StatusIntent> = {
  online: "success",
  active: "success",
  success: "success",
  successful: "success",
  approved: "success",
  completed: "success",

  offline: "error",
  failed: "error",

  pending: "warning",
  suspended: "warning",

  inactive: "neutral",
};

export const STATUS_INTENT_STYLES = {
  success: "bg-emerald-100 text-emerald-800 border-emerald-200",
  error: "bg-red-100 text-red-800 border-red-200",
  warning: "bg-amber-100 text-amber-800 border-amber-200",
  neutral: "bg-gray-100 text-gray-800 border-gray-200",
  loading: "bg-blue-100 text-blue-800 border-blue-200",
};
