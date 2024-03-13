const signupService = async (data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    }),
  });

  return response.json();
};

export default signupService;
