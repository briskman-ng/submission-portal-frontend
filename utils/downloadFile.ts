export async function downloadFile(url: string, fileName?: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to download file");
  }

  const blob = await response.blob();
  const downloadUrl = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = fileName ?? "";

  document.body.appendChild(a);
  a.click();

  a.remove();
  window.URL.revokeObjectURL(downloadUrl);
}
