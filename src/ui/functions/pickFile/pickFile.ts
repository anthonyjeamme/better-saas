export function pickFile(
  accept: string,
  multiple: boolean = false
): Promise<File[]> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.multiple = multiple;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files || files.length === 0)
        return reject(new Error("No file selected"));
      resolve(Array.from(files));
    };
    input.oncancel = reject;
    input.click();
  });
}
