export async function POST(request) {
  const { username, email, password } = await request.json();
  
  try {
      const res=await fetch(process.env.INSTA_SHARE_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
      });
      return Response.json( await res.json());
  }
    
   catch (error) {
    return Response.json({ error: error.message });
  }
}
