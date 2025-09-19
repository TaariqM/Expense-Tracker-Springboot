import { useState } from "react";
import InputFields from "../components/input_fields/InputFields";
import LoginOrRegister from "../components/login_or_register/LoginOrRegister";
import Button from "../components/button/Button";
import "../css/css_for_pages/SignIn.css";

const SignIn = () => {
  const inputLabels = ["Email", "Password"];
  const btnName = "Sign In!";
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("button clicked");
  };

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // clear error while typing
  };

  console.log(values);
  return (
    <div className="sign-in-container">
      <h1 className="sign-in-container-title">Welcome to Expense Tracker</h1>
      <h2>Please Sign In</h2>
      <InputFields
        inputLabels={inputLabels}
        handleSubmitCallback={handleSubmit}
        handleChangeCallback={handleChange}
        values={values}
        errors={errors}
        login={true}
        register={false}
        btnName={"Sign In!"}
      />
      {/* <LoginOrRegister login={true} register={false} /> */}
      {/* <Button name={btnName} btnType={"submit"} /> */}
    </div>
  );
};

export default SignIn;
