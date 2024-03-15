"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

import { downloadFile } from "../../services/downloadFile";
import { CloudDownload } from "@mui/icons-material";
const columns = ["Name", "Size", "Action"];

function ListComponent({ filesData }) {
  const handleDownload = async (fileInfo) => {
    await downloadFile(fileInfo);
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filesData.map((file, index) => (
            <TableRow key={index}>
              <TableCell>{file.name + file.extension}</TableCell>

              <TableCell>{file.size}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDownload(file)}
                  startIcon={<CloudDownload />}
                >
                  Download
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListComponent;
