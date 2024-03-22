export const downloadFile = async (fileInfo) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FILES_API_URL}/download/${fileInfo.path}`,
      { cache: "no-cache" }
    );

    if (!response.ok) {
      throw new Error("Error al descargar el archivo");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;

    const fileName = fileInfo.name || "download";
    a.download = fileName;

    document.body.appendChild(a);

    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error al descargar el archivo:", error);
  }
};
