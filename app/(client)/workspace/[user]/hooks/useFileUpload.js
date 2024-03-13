import { useTableContext } from "../context/TableContext";

export const useFileUpload = () => {
  const { rows, setRows } = useTableContext();

  const handleFilesUploaded = (newFiles) => {
    const indexedFiles = newFiles.map((file, index) => ({
      id: file.name,
      ...file,
    }));
    setRows([...rows, ...indexedFiles]);
  };

  return { handleFilesUploaded };
};
