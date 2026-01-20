export const handleFileInput = (
  event: Event,
  file: Ref<File | null>,
  fileName: Ref<string>
) => {
  const target = event.target as HTMLInputElement;
  const selectedFile = target.files?.[0] ?? null;

  if (selectedFile) {
    file.value = selectedFile;
    fileName.value = selectedFile.name;
  } else {
    file.value = null;
    fileName.value = "";
  }
};


