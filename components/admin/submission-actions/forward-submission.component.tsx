import { Button } from "@/components/ui/button";
import useForwardSubmissionToDepartment from "@/react-query/admin/mutations/useForwardSubmissionToDepartment";
import { validateCommaSeparatedEmails } from "@/utils/validateCommaSeparatedEmails";
import { useForm } from "react-hook-form";

interface IProps {
  closeModal: () => void;
  identifier: {
    id: string;
    trackingNumber: string;
  };
}

interface IForwardSubmissionInput {
  department: string;
  email: string;
  cc?: string;
  message?: string;
  includeAttachments?: boolean;
}

export const departments: string[] = [
  "Finance",
  "Legal",
  "Human Resources",
  "IT & Digital Services",
  "Operations",
  "Procurement",
  "Engineering",
  "Community Development",
  "Environmental Affairs",
  "Public Relations",
  "Research & Strategy",
];

const ForwardSubmission = ({ closeModal, identifier }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForwardSubmissionInput>();

  const {
    mutate: forwardSubmissionToDepartment,
    isPending: isForwardingSubmission,
  } = useForwardSubmissionToDepartment(identifier, () =>
    setTimeout(closeModal, 400),
  );

  const onSubmit = (data: IForwardSubmissionInput) => {
    const payload = {
      cc: data.cc,
      department: data.department,
      email: data.email,
      includeAttachments: data.includeAttachments,
      message: data.message,
    };

    forwardSubmissionToDepartment(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="text-sm" htmlFor="department">
          Department*
        </label>

        <select
          className="w-full border border-stone-300 rounded-lg p-2 mb-2"
          {...register("department", { required: "Department is required" })}
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm" htmlFor="email">
          Email*
        </label>

        <input
          type="email"
          placeholder="e.g jane@gmail.com"
          className="w-full border border-stone-300 rounded-lg p-2 mb-2"
          {...register("email", { required: "Email is required" })}
        />
      </div>

      <div className="mb-2">
        <label className="text-sm" htmlFor="cc">
          CC
        </label>

        <input
          placeholder="e.g john@gmail.com, doe@gmail.com"
          className="w-full border border-stone-300 rounded-lg p-2"
          {...register("cc", {
            validate: {
              validateCommaSeparatedEmails: (value) =>
                validateCommaSeparatedEmails(value),
            },
          })}
        />

        {errors.cc?.message && (
          <span className="text-sm text-red-600 mb-2">{errors.cc.message}</span>
        )}
      </div>

      <textarea
        placeholder="Message"
        className="w-full border border-stone-300 rounded-lg p-2 mb-2"
        {...register("message")}
      />

      <label className="flex items-center gap-2 mb-4 w-fit">
        <input type="checkbox" {...register("includeAttachments")} />
        <p className="text-sm text-stone-700">Include Attachments</p>
      </label>

      <div className="flex justify-end gap-3">
        <Button
          variant={"ghost"}
          className="px-4 py-2 rounded-lg bg-stone-200 hover:bg-stone-300"
          onClick={closeModal}
        >
          Cancel
        </Button>

        <Button
          isLoading={isForwardingSubmission}
          className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Forward
        </Button>
      </div>
    </form>
  );
};

export default ForwardSubmission;
