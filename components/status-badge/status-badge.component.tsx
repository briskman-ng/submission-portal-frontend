"use client";

import {
  Status,
  STATUS_INTENT_MAP,
  STATUS_INTENT_STYLES,
  StatusIntent,
} from "./status.config";

interface StatusBadgeProps {
  status: Status;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const normalizedStatus = status.toLowerCase();

  const intent: StatusIntent =
    STATUS_INTENT_MAP[normalizedStatus as Status] ?? "neutral";

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${STATUS_INTENT_STYLES[intent]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
