import { useCallback } from "react";
import { useTableContext } from "../context/TableContext";

const useRowEditing = () => {
  const { rows, setRows, rowModesModel, setRowModesModel } = useTableContext();
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = useCallback(
    (id) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.Edit },
      });
    },
    [setRowModesModel, rowModesModel]
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

  const processRowUpdate = async (newRow) => {
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
