import { useCallback, useState } from "react";
import { useTableContext } from "../context/TableContext";
import { GridRowModes } from "@mui/x-data-grid";
import { saveFiles } from "../services/saveFiles";

const useRowEditing = (user) => {
  const { rows, setRows, rowModesModel, setRowModesModel } = useTableContext();
  const [rowName, setRowName] = useState("");

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = useCallback(
    (id) => () => {
      const rowToEdit = rows.find((row) => row.id === id);

      setRowName(rowToEdit.name);

      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.Edit },
      });
    },
    [setRowModesModel, rowModesModel, setRowName, rows]
  );

  const handleSaveClick = useCallback(
    (id) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View },
      });
    },
    [setRowModesModel, rowModesModel]
  );

  const handleCancelClick = useCallback(
    (id) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });

      const editedRow = rows.find((row) => row.id === id);
      if (editedRow.isNew) {
        setRows(rows.filter((row) => row.id !== id));
      }
    },
    [setRowModesModel, rowModesModel, rows, setRows]
  );

  const processRowUpdate = (newRow) => {
    saveFiles(
      `${process.env.NEXT_PUBLIC_FILES_API_URL}/rename/${user}`,
      {
        oldName: rowName,
        newName: newRow.name,
      },
      true
    );
    const updatedRow = { ...newRow };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  return {
    handleRowEditStop,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    processRowUpdate,
    handleRowModesModelChange,
  };
};

export default useRowEditing;
