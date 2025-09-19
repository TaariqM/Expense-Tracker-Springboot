import "../../css/css_for_components/LoginOrRegister.css";

const LoginOrRegister = ({ login, register }) => {
  return (
    <div className="login-register-container">
      <p>{login ? "Don't have an account? " : "Already have an account? "}</p>
      <a href={login ? "/register" : "/"}>
        {register ? "Login here" : "Register here"}
      </a>
    </div>
  );
};

export default LoginOrRegister;
