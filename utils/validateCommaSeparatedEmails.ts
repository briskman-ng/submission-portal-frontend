import validator from "validator";

export const validateCommaSeparatedEmails = (value?: string) => {
  if (!value) return true; // allow empty unless required

  const emails = value
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  const invalidEmails = emails.filter((email) => !validator.isEmail(email));

  return (
    invalidEmails.length === 0 ||
    `Invalid email(s): ${invalidEmails.join(", ")}`
  );
};
