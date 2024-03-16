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
const columns = ["File", "Size", "Action"];

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
              <TableCell key={column} align="center">
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filesData.map((file, index) => (
            <TableRow key={index}>
              <TableCell align="center">{file.name + file.extension}</TableCell>

              <TableCell align="center">{file.size}</TableCell>
              <TableCell align="center">
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
