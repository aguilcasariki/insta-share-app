// columnSchema.js
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { GridRowModes, GridActionsCellItem } from "@mui/x-data-grid";
import { UploadFile } from "@mui/icons-material";

export const columnSchema = (
  handleEditClick,
  handleSaveClick,
  handleCancelClick,
  handleUploadClick,
  rowModesModel,
  rows
) => [
  { field: "name", headerName: "Name", flex: 0.1, editable: true },
  { field: "extension", headerName: "Extension" },
  {
    field: "status",
    headerName: "Status",
  },
  { field: "size", headerName: "Size" },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    cellClassName: "actions",
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      const isUploadedRow =
        rows.filter((row) => row.id === id)[0].status === "Uploaded";

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            key="save"
            icon={<SaveIcon />}
            label="Save"
            sx={{ color: "primary.main" }}
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            key="cancel"
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ];
      }

      return [
        <GridActionsCellItem
          disabled={!isUploadedRow}
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          disabled={isUploadedRow}
          key="upload"
          icon={<UploadFile />}
          label="Upload"
          className="textPrimary"
          onClick={() => handleUploadClick(id)}
          color="inherit"
        />,
      ];
    },
  },
];
