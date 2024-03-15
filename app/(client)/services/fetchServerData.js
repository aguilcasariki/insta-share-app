const fetchServerData = async (url) => {
  const res = await fetch(url, { cache: "no-cache" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default fetchServerData;
