import LoginForm from "../../layout/LoginForm/LoginForm";

const LoginPage = () => {
  //   let email: string = '';
  //   let password: string = '';
  const isEmailValid: boolean = true;
  const isPasswordValid: boolean = false;
  //   let password: string = '';
  //   const handleLoginChange = (): void => {
  //   };
  //   const handlePasswordChange = (): void => {
  //   };
  //   const handleSubmit = (): void => {
  //   };
  return (
    <LoginForm
      //   email={email}
      //   password={password}
      isEmailValid={isEmailValid}
      isPasswordValid={isPasswordValid}
      //   onEmailChange={handleLoginChange}
      //   onPasswordChange={handlePasswordChange}
      //   onSubmit={handleSubmit}
    />
  );
};

export default LoginPage;
