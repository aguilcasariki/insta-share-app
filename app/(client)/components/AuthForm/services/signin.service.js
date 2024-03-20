import { signIn } from "next-auth/react";

const signinService = async (data) => {
  return await signIn("credentials", {
    username: data?.get("username"),
    password: data?.get("password"),
    redirect: false,
  });
};



export default signinService;
