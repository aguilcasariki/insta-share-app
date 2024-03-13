export const saveFiles = (url, formData) => {
  fetch(`${url}`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return "Error uploading files:" + error;
    });
};
