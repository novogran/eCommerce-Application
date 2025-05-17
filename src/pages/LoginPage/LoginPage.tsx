import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { validateInput } from "../../shared/utils/validation";

function LoginPage(): React.ReactElement {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onEmailChange(email: string): boolean {
    const isValid: boolean = validateInput({ type: "email", value: email });
    setIsEmailValid(isValid);
    setEmail(email);
    return isValid;
  }

  function onPasswordChange(password: string): boolean {
    const isValid: boolean = validateInput({ type: "password", value: password });
    setIsPasswordValid(isValid);
    setPassword(password);
    return isValid;
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (isEmailValid && isPasswordValid) {
      console.log(email + " " + password);
    } else {
      console.log("Wrong params");
    }
  }

  return (
    <LoginForm
      email={email}
      isEmailValid={isEmailValid}
      onEmailChange={onEmailChange}
      password={password}
      isPasswordValid={isPasswordValid}
      onPasswordChange={onPasswordChange}
      onSubmit={onSubmit}
    />
  );
}

export default LoginPage;
