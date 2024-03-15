import React from "react";
import UserWorkspace from "./components/UserWorkspace/UserWorkspace";
import { TableProvider } from "./context/TableContext";

async function getData(params) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FILES_API_URL}/${params.user}/files`,
    { cache: "no-cache" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const UserWorkspacePage = async ({ params }) => {
  const filesData = await getData(params);
  return (
    <TableProvider>
      <UserWorkspace user={params.user} filesData={filesData} />
    </TableProvider>
  );
};

export default UserWorkspacePage;
