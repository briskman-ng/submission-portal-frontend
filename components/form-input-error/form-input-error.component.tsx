import { AlertCircle } from "lucide-react";

interface Props {
  message: string | undefined;
}

export default function FormInputError({ message }: Props) {
  return (
    <>
      {message && (
        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {message}
        </p>
      )}
    </>
  );
}
