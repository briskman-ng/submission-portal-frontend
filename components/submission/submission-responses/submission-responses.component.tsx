import Modal from "@/components/modal/modal.component";
import useCreateModalProps from "@/hooks/useCreateModalProps";
import useGetSubmissionResponses from "@/react-query/admin/queries/useGetSubmissionResponses";
import SendSubmissionResponse from "../send-submission-response/send-submission-response.component";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "@/utils/constants";

interface IProps {
  submissionId: string;
}

export default function SubmissionResponses({ submissionId }: IProps) {
  const { data: responsesData, isLoading: isLoadingResponses } =
    useGetSubmissionResponses(submissionId);

  const sendResponseModalProps = useCreateModalProps();

  return (
    <>
      <div className="space-y-4">
        {isLoadingResponses ? (
          <div className="text-center py-8">
            <Send className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <p className="text-stone-500">Loading responses</p>
          </div>
        ) : responsesData?.responses.length === 0 ? (
          <div className="text-center py-8">
            <Send className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <p className="text-stone-500">No responses sent yet</p>
            <Button
              variant={"ghost"}
              onClick={sendResponseModalProps.open}
              className="mt-3 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
            >
              Send a response
            </Button>
          </div>
        ) : (
          responsesData?.responses.map((response) => (
            <div
              key={response.id}
              className="p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${response.responseType === "holding" ? "bg-amber-100 text-amber-700" : response.responseType === "detailed" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"}`}
                  >
                    {response.responseType.charAt(0).toUpperCase() +
                      response.responseType.slice(1)}{" "}
                    Response
                  </span>
                  <span className="text-xs text-stone-500">
                    via{" "}
                    {response.deliveryMethod === "both"
                      ? "email and portal"
                      : response.deliveryMethod === "email_only"
                        ? "email"
                        : response.deliveryMethod === "portal_only"
                          ? "portal"
                          : ""}
                  </span>
                </div>
                <p className="text-xs text-stone-500">
                  {dayjs(response.sentAt).format(DATE_TIME_FORMAT)}
                </p>
              </div>
              <p className="text-stone-700 text-sm whitespace-pre-wrap">
                {response.content}
              </p>
              <p className="text-xs text-stone-500 mt-2">
                — {response.sentBy?.name}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      <Modal
        title="Send Response"
        description="Respond to a submission"
        {...sendResponseModalProps}
      >
        <SendSubmissionResponse
          submissionId={submissionId}
          handleCloseModal={sendResponseModalProps.close}
        />
      </Modal>
    </>
  );
}
