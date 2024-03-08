import AuthForm from "../components/AuthForm/AuthForm";
const fields = [
  {
    id: "username",
    label: "Username",
    name: "username",
    autoComplete: "username",
  },
  
  {
    id: "password",
    label: "Password",
    name: "password",
    type: "password",
    autoComplete: "new-password",
  },
];

export default function Login() {
  return (
    <AuthForm
      title="Sign in"
      fields={fields}
    />
  )
}
