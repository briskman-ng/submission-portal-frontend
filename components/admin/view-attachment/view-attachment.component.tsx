import { Submission } from "@/types/admin/submission.type";

export default function ViewAttachment({
  file,
}: {
  file: Submission["files"][number] | undefined;
}) {
  return (
    <>
      {file?.mimeType.startsWith("image") ? (
        <div className="max-h-full overflow-auto">
          <img
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              objectPosition: "center",
              overflow: "auto",
            }}
            alt="attachment-image"
            src={file.downloadUrl}
          />
        </div>
      ) : (
        <iframe
          width="100%"
          height="100%"
          src={`${file?.downloadUrl}#zoom=page-width`}
        ></iframe>
      )}
    </>
  );
}
