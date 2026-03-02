import { Button } from "@/components/ui/button";
import useUpdateSubmissionStatus, {
  IUpdateSubmissionStatus,
} from "@/react-query/admin/mutations/useUpdateSubmissionStatus";
import { useState } from "react";

export const statusOptions = [
  { value: "new", label: "New", color: "bg-blue-100 text-blue-800" },
  { value: "pending", label: "Pending", color: "bg-amber-100 text-amber-800" },
  {
    value: "in_review",
    label: "In Review",
    color: "bg-purple-100 text-purple-800",
  },
  {
    value: "forwarded",
    label: "Forwarded",
    color: "bg-cyan-100 text-cyan-800",
  },
  {
    value: "processed",
    label: "Processed",
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    value: "completed",
    label: "Completed",
    color: "bg-emerald-100 text-emerald-800",
  },
  {
    value: "resolved",
    label: "Resolved",
    color: "bg-emerald-100 text-emerald-800",
  },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800" },
];

interface IProps {
  identifier: { id: string; trackingNumber: string };
  status: string;
  closeModal: () => void;
}

const ChangeSubmissionStatus = ({ status, closeModal, identifier }: IProps) => {
  const [newStatus, setNewStatus] = useState(status || "");
  const [reason, setReason] = useState("");

  const {
    mutate: updateSubmissionStatus,
    isPending: isUpdatingSubmissionStatus,
  } = useUpdateSubmissionStatus(identifier, () => setTimeout(closeModal, 400));

  const handleUpdateSubmissionStatus = () => {
    const payload: IUpdateSubmissionStatus = { status: newStatus };

    if (reason) payload.reason = reason;

    updateSubmissionStatus({ status: newStatus });
  };

  return (
    <>
      <select
        className="w-full border border-stone-300 rounded-lg p-2 mb-4"
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
      >
        {statusOptions.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      <input
        className="w-full border border-stone-300 rounded-lg p-2 mb-4"
        value={reason}
        placeholder="Enter reason"
        onChange={(e) => setReason(e.target.value)}
      />

      <div className="flex justify-end gap-3">
        <Button
          variant={"ghost"}
          className="px-4 py-2 rounded-lg bg-stone-200 hover:bg-stone-300"
          onClick={closeModal}
        >
          Cancel
        </Button>

        <Button
          disabled={newStatus === status}
          isLoading={isUpdatingSubmissionStatus}
          className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
          onClick={handleUpdateSubmissionStatus}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default ChangeSubmissionStatus;
