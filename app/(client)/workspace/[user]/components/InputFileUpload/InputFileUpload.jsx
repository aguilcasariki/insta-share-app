import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload({ onFilesUploaded }) {
  const handleFileUpload = (event) => {
    const files = event.target.files;

    const fileInfo = Array.from(files).map((file) => {
      const [fileName, fileExtension] = file.name
        .match(/^(.*?)(\.[^.]*)?$/)
        .slice(1);
      return {
        file,
        name: fileName,
        extension: fileExtension,
        size: `${Math.round(file.size / (1024 * 1024))} mb`,
      };
    });
    onFilesUploaded(fileInfo);
  };
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload
      <VisuallyHiddenInput
        type="file"
        multiple
        name="myFiles"
        onChange={handleFileUpload}
      />
    </Button>
  );
}
