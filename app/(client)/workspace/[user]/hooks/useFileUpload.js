import { useTableContext } from "../context/TableContext";

export const useFileUpload = () => {
  const { rows, setRows } = useTableContext();

  const handleFilesUploaded = (newFiles) => {
    const generateUniqueName = (name, existingNames) => {
      let uniqueName = name;
      let counter = 1;
      while (existingNames.includes(uniqueName)) {
        uniqueName = `${counter}_${name}`;
        counter++;
      }
      return uniqueName;
    };

    const existingNames = rows.map((row) => row.id);

    const indexedFiles = newFiles.map((file) => {
      let uniqueName = generateUniqueName(file.name, existingNames);
      file.name = uniqueName;
      return {
        id: uniqueName,
        status: "Not uploaded",

        ...file,
      };
    });
    setRows([...rows, ...indexedFiles]);
  };

  return { handleFilesUploaded };
};
