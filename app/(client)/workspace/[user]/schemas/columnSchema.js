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
  { field: "name", headerName: "Name", editable: true, flex: 1 },
  { field: "extension", headerName: "Extension", flex: 1 },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
  },
  { field: "size", headerName: "Size", flex: 1 },
  {
    field: "actions",
    flex: 1,
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
