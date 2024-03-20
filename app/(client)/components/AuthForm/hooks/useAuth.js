import { useRouter } from "next/navigation";
import { useState } from "react";
import signupService from "../services/signup.service";
import signinService from "../services/signin.service";
import { getSession } from "next-auth/react";

export const useAuth = (signup) => {
  const [formError, setFormError] = useState("");

  const router = useRouter();

  const authSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      let response;
      if (signup) {
        response = await signupService(data);
        if (response.message) {
          setFormError(response.message);
          return;
        }
      }

      const signinResponse = await signinService(data);

      const session = await getSession();
      console.log("session in auth", session);
      if (signinResponse.error) {
        setFormError(signinResponse.error);
      } else {
        router.push(`/workspace/${session.user._id}`);
      }
    } catch (error) {
      console.log(error);
      setFormError("An error occurred during sign in. Please try again.");
    }
  };

  return {
    formError,
    setFormError,
    authSubmit,
  };
};
