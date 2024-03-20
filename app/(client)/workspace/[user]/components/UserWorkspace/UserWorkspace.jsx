"use client";
import { useMemo, useEffect } from "react";
import Box from "@mui/material/Box";

import { DataGrid } from "@mui/x-data-grid";
import InputFileUpload from "../InputFileUpload/InputFileUpload";

import { useTableContext } from "../../context/TableContext";
import { useFileUpload } from "../../hooks/useFileUpload";
import useRowEditing from "../../hooks/useRowEditing";
import { columnSchema } from "../../schemas/columnSchema";
import styles from "./UserWorkspace.module.css";
import useUploadToServer from "../../hooks/useUploadToServer";
import { useSession } from "next-auth/react";

export default function UserWorkspace({ user, filesData }) {
  const { status, data } = useSession();

  const { rows, setRows, rowModesModel, setRowModesModel } = useTableContext();
  useEffect(() => {
    const updatedFilesData = filesData.map((file) => ({
      ...file,
      id: file.name,
    }));

    setRows(updatedFilesData);
  }, [filesData, setRows]);

  const { handleFilesUploaded } = useFileUpload();

  const {
    handleRowEditStop,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    processRowUpdate,
    handleRowModesModelChange,
  } = useRowEditing(user);
  const { handleSaveToServerClick } = useUploadToServer({ user });

  const columns = useMemo(
    () =>
      columnSchema(
        handleEditClick,
        handleSaveClick,
        handleCancelClick,
        handleSaveToServerClick,
        rowModesModel,
        rows
      ),
    [
      handleEditClick,
      handleSaveClick,
      handleCancelClick,
      handleSaveToServerClick,
      rowModesModel,
      rows,
    ]
  );
  // if (data?.user._id !== user) {
  //   return <h1>Esta no es su session</h1>;
  // }

  return (
    <Box className={styles.userWorkspace}>
      <InputFileUpload onFilesUploaded={handleFilesUploaded} />
      <DataGrid
        className={styles.userWorkspace__dataGrid}
        onProcessRowUpdateError={(error) => {
          console.error("Error updating row:", error);
        }}
        getRowId={(row) => row.id}
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          noRowsOverlay: () => (
            <div className={styles.userWorkspace__noRowsOverlay}>
              No files to upload.
            </div>
          ),
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
