import FormInputError from "@/components/form-input-error/form-input-error.component";
import { Button } from "@/components/ui/button";
import useSendResponseToSubmission from "@/react-query/admin/mutations/useSendResponseToSubmission";
import { useForm } from "react-hook-form";

interface ISendResponseToSubmissionInput {
  responseType: string;
  deliveryMethod: string;
  subject: string;
  content: string;
  requiresAction: boolean;
}

interface IProps {
  submissionId: string;
  handleCloseModal: () => void;
}

export default function SendSubmissionResponse({
  handleCloseModal,
  submissionId,
}: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISendResponseToSubmissionInput>({
    defaultValues: { requiresAction: true },
  });

  const { mutate: sendResponse, isPending: isSendingResponse } =
    useSendResponseToSubmission(submissionId, () =>
      setTimeout(handleCloseModal, 1000),
    );

  const onSubmit = (data: ISendResponseToSubmissionInput) => {
    return sendResponse({
      content: data.content,
      deliveryMethod: data.deliveryMethod,
      //   requiresAction: data.requiresAction,
      requiresAction: false,
      responseType: data.responseType,
      subject: data.subject,
      submissionId: submissionId,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-full flex flex-col gap-4"
    >
      <select
        className="w-full border border-stone-300 rounded-lg p-2 mb-2"
        {...register("responseType")}
      >
        <option value="holding">Holding Response</option>
        <option value="detailed">Detailed Response</option>
        <option value="final">Final Response</option>
      </select>

      <div>
        <input
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Subject"
          {...register("subject", { required: "Enter a subject" })}
        />

        <FormInputError message={errors.subject?.message} />
      </div>

      <div>
        <textarea
          className="w-full border border-stone-300 rounded-lg p-2"
          placeholder="Write response..."
          {...register("content", { required: "Enter a response" })}
        />

        <FormInputError message={errors.content?.message} />
      </div>

      <select
        className="w-full border border-stone-300 rounded-lg p-2 mb-4"
        {...register("deliveryMethod")}
      >
        <option value="both">Send via Email & Portal</option>
        <option value="email_only">Email Only</option>
        <option value="portal_only">Portal Only</option>
      </select>

      {/* <label className="flex items-center gap-2">
        <input type="checkbox" {...register("requiresAction")} />

        <span>Requires action</span>
      </label> */}

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          onClick={handleCloseModal}
          disabled={isSendingResponse}
          variant={"outline"}
        >
          Cancel
        </Button>

        <Button isLoading={isSendingResponse}>Send</Button>
      </div>
    </form>
  );
}
