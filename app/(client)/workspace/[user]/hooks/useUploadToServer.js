import { useTableContext } from "../context/TableContext";
import { useCallback } from "react";
import { saveFiles } from "../services/saveFiles";

const useUploadToServer = ({ user }) => {
  const { rows, setRows } = useTableContext();
  const updateRowStatus = useCallback(
    (id, newStatus) => {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, status: newStatus } : row
        )
      );
    },
    [setRows]
  );

  const handleSaveToServerClick = useCallback(
    async (id) => {
      const row = rows.filter((row) => row.id === id)[0];

      const file = row.file;
      updateRowStatus(id, "Uploading...");
      const formData = new FormData();
      formData.append("myFiles", file);
      console.log("file in client", file);
      formData.append("fileName", row.name);

      const saveFileResponse = await saveFiles(
        `${process.env.NEXT_PUBLIC_FILES_API_URL}/upload/${user}`,
        formData
      );

      if (saveFileResponse) {
        updateRowStatus(id, saveFileResponse);
      }
    },
    [rows, user, updateRowStatus]
  );
  return { handleSaveToServerClick };
};

export default useUploadToServer;
