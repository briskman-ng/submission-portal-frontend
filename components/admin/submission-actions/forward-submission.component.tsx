import { Button } from "@/components/ui/button";
import useForwardSubmissionToDepartment from "@/react-query/admin/mutations/useForwardSubmissionToDepartment";
import useGetSubmissionDepartments from "@/react-query/admin/queries/useGetSubmissionDepartments";
import useGetSubmissionDirectorates from "@/react-query/admin/queries/useGetSubmissionDirectorates";
import { validateCommaSeparatedEmails } from "@/utils/validateCommaSeparatedEmails";
import { useState } from "react";
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

const DESTINATIONS = ["directorate", "department"] as const;

const ForwardSubmission = ({ closeModal, identifier }: IProps) => {
  const [destination, setDestination] =
    useState<(typeof DESTINATIONS)[number]>("directorate");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForwardSubmissionInput>();

  const { data: departments, isLoading: isLoadingDepartments } =
    useGetSubmissionDepartments();
  const { data: directorates, isLoading: isLoadingDirectorates } =
    useGetSubmissionDirectorates();

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
      <div className="w-full mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Destination <span className="text-red-500">*</span>
        </label>

        <div className="flex bg-gray-100 rounded-lg p-1 w-full">
          {DESTINATIONS.map((dest) => (
            <button
              key={dest}
              type="button"
              onClick={() => {
                setDestination(dest);
                setValue("department", "");
              }}
              className={`${destination === dest ? "bg-green-700 text-white" : "text-gray-500"} capitalize flex-1 font-medium py-2 rounded-md shadow-sm`}
            >
              {dest}
            </button>
          ))}
        </div>
      </div>

      {destination === "department" && (
        <div>
          <label className="text-sm" htmlFor="department">
            Department*
          </label>

          <select
            disabled={isLoadingDepartments}
            className="w-full border border-stone-300 rounded-lg p-2 mb-2"
            {...register("department", { required: "Department is required" })}
          >
            <option value="">
              {isLoadingDepartments
                ? "Loading departments"
                : (departments?.length ?? 0) < 1
                  ? "No department found, contact admin"
                  : "Select Department"}
            </option>

            {departments?.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {destination === "directorate" && (
        <div>
          <label className="text-sm" htmlFor="department">
            Directorate*
          </label>

          <select
            disabled={isLoadingDirectorates}
            className="w-full border border-stone-300 rounded-lg p-2 mb-2"
            {...register("department", { required: "Department is required" })}
          >
            <option value="">
              {isLoadingDirectorates
                ? "Loading directorates"
                : (directorates?.length ?? 0) < 1
                  ? "No directorate found, contact admin"
                  : "Select Directorate"}
            </option>

            {directorates?.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      )}

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
