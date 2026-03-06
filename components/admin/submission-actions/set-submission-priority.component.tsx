import { Button } from "@/components/ui/button";
import useUpdateSubmissionPriority, {
  IUpdateSubmissionPriority,
} from "@/react-query/admin/mutations/useUpdateSubmissionPriority";
import { useState } from "react";

export const priorityOptions = [
  { value: "low", label: "Low", color: "bg-stone-100 text-stone-800" },
  { value: "medium", label: "Medium", color: "bg-blue-100 text-blue-800" },
  { value: "high", label: "High", color: "bg-orange-100 text-orange-800" },
  { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-800" },
];

interface IProps {
  identifier: { id: string; trackingNumber: string };
  priority: string;
  closeModal: () => void;
}

const SetSubmissionPriority = ({
  closeModal,
  identifier,
  priority,
}: IProps) => {
  const [newPriority, setNewPriority] = useState(priority || "");
  const [reason, setReason] = useState("");

  const {
    mutate: updateSubmissionPriority,
    isPending: isUpdatingSubmissionPriority,
  } = useUpdateSubmissionPriority(identifier, () =>
    setTimeout(closeModal, 400),
  );

  const handleUpdateSubmissionPriority = () => {
    const payload: IUpdateSubmissionPriority = { priority: newPriority };

    if (reason) payload.reason = reason;

    updateSubmissionPriority(payload);
  };

  return (
    <>
      <select
        className="w-full border border-stone-300 rounded-lg p-2 mb-4"
        value={newPriority}
        onChange={(e) => setNewPriority(e.target.value)}
      >
        {priorityOptions.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
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
          onClick={handleUpdateSubmissionPriority}
          disabled={newPriority === priority}
          isLoading={isUpdatingSubmissionPriority}
          className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default SetSubmissionPriority;
