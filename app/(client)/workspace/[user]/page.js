import React from "react";
import UserWorkspace from "./components/UserWorkspace/UserWorkspace";

import fetchServerData from "../../services/fetchServerData";
import { TableProvider } from "./context/TableContext";

const UserWorkspacePage = async ({ params }) => {
  const filesData = await fetchServerData(
    `${process.env.NEXT_PUBLIC_FILES_API_URL}/${params.user}/files`
  );
  return (
    <TableProvider>
      <UserWorkspace user={params.user} filesData={filesData} />
    </TableProvider>
  );
};

export default UserWorkspacePage;
