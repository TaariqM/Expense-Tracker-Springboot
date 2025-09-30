import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputFields from "../components/input_fields/InputFields";
import Button from "../components/button/Button";
import { addUser } from "../services/UserService";
import { useCsrf } from "../context/CsrfTokenContext";

const Register = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const { csrfToken } = useCsrf();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const btnName = "Register";

  const validateForm = () => {
    const newErrors = {};

    if (!user.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // run validation
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const newUser = await addUser(user, csrfToken);
      navigate(`/dashboard/${newUser.id}`);
    } catch (err) {
      // console.error("Failure submitting registration:", err);
      if (err.response && err.response.status === 409) {
        setErrors({ email: "This email is already registered." });
      } else {
        setErrors({ general: "Registration failed. Please try again." });
      }
    }
    // alert("User added");
  };

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // clear error while typing
  };

  // console.log(user);
  const inputLabels = ["First name", "Last name", "Email", "Password"];
  return (
    <div className="sign-in-container">
      <h1 className="sign-in-container-title">Welcome to Expense Tracker</h1>
      <h2>Please Register</h2>
      <InputFields
        inputLabels={inputLabels}
        handleSubmitCallback={handleSubmit}
        handleChangeCallback={handleChange}
        // handleClickCallback={handleRegister}
        values={user}
        errors={errors}
        login={false}
        register={true}
        btnName={"Register"}
      />
      {/* <LoginOrRegister login={true} register={false} /> */}
      {/* <Button name={btnName} btnType={"submit"} /> */}
    </div>
  );
};

export default Register;
