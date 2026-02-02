import { Button } from "@/components/ui/button";
import useAddNoteToSubmission from "@/react-query/admin/mutations/useAddNoteToSubmission";
import { useState } from "react";

interface IProps {
  identifier: { id: string; trackingNumber: string };
  closeModal: () => void;
}

const AddNoteToSubmission = ({ closeModal, identifier }: IProps) => {
  const [noteContent, setNoteContent] = useState("");
  const [notePrivate, setNotePrivate] = useState(false);

  const { mutate: addNoteToSubmission, isPending: isAddingNoteToSubmission } =
    useAddNoteToSubmission(identifier, () => setTimeout(closeModal, 400));

  const handleAddNoteToSubmission = () => {
    addNoteToSubmission({ content: noteContent });
  };

  return (
    <>
      <textarea
        className="w-full border border-stone-300 rounded-lg p-2 mb-2"
        placeholder="Write note..."
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
      />

      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={notePrivate}
          onChange={(e) => setNotePrivate(e.target.checked)}
        />
        <label className="text-sm text-stone-700">Private Note</label>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          className="px-4 py-2 rounded-lg bg-stone-200 hover:bg-stone-300"
          onClick={closeModal}
          variant={"ghost"}
        >
          Cancel
        </Button>

        <Button
          disabled={!noteContent}
          isLoading={isAddingNoteToSubmission}
          className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
          onClick={handleAddNoteToSubmission}
        >
          Add Note
        </Button>
      </div>
    </>
  );
};

export default AddNoteToSubmission;
