import fetchServerData from "./services/fetchServerData";
import DownloadTable from "./components/DownloadTable/DownloadTable";

export default async function Home() {
  const comunityData = await fetchServerData(
    `${process.env.NEXT_PUBLIC_FILES_API_URL}/files`
  );
  return <DownloadTable filesData={comunityData} />;
}
