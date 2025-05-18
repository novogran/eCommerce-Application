import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { validateInput } from "../../shared/utils/validation";
import { authService } from "../../api/auth-client";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

function LoginPage(): React.ReactElement {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setSubmitError("");
    if (isEmailValid && isPasswordValid) {
      setSubmitError("");
    } else {
      setSubmitError("Wrong params");
    }

    try {
      await authService.getCustomerToken(email, password);
      login();
      navigate("/main");
    } catch (error) {
      console.log(error);
      let errorMessage = "An error occurred during login. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes("Customer account with the given credentials not found")) {
          errorMessage = "Invalid email or password. Please check your credentials.";
        }
      }
      setSubmitError(errorMessage);
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
      submitError={submitError}
    />
  );
}

export default LoginPage;
