import AuthForm from "../components/AuthForm/AuthForm";

const fields = [
  {
    id: "username",
    label: "Username",
    name: "username",
    autoComplete: "username",
  },
  {
    id: "email",
    label: "Email Address",
    name: "email",
    autoComplete: "email",
  },
  {
    id: "password",
    label: "Password",
    name: "password",
    type: "password",
    autoComplete: "new-password",
  },
];




export default function Register() {
  return (
    <AuthForm
      title="Sign up"
      fields={fields}
      signup
    />
  )
}
