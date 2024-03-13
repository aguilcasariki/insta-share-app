import React from "react";
import UserWorkspace from "./components/UserWorkspace/UserWorkspace";
import { TableProvider } from "./context/TableContext";

const UserWorkspacePage = ({ params }) => {
  return (
    <TableProvider>
      <UserWorkspace user={params.user} />
    </TableProvider>
  );
};

export default UserWorkspacePage;
