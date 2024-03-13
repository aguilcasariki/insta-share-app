"use client";
import { createContext, useContext, useState } from "react";

const TableContext = createContext();

export const useTableContext = () => useContext(TableContext);

export const TableProvider = ({ children }) => {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  return (
    <TableContext.Provider
      value={{ rows, setRows, rowModesModel, setRowModesModel }}
    >
      {children}
    </TableContext.Provider>
  );
};
