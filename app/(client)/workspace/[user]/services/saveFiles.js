export const saveFiles = async (url, formData, headers = false) => {
  try {
    const options = {
      method: "POST",
    };

    if (headers) {
      options.headers = {
        "Content-Type": "application/json",
      };
      options.body = JSON.stringify(formData);
    } else {
      options.body = formData;
    }

    const response = await fetch(`${url}`, options);
    return "Uploaded";
  } catch (error) {
    console.log(error);
    return "Error uploading files:" + error;
  }
};
