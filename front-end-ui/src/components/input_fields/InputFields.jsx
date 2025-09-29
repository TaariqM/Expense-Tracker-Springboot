import "../../css/css_for_components/InputFields.css";
import LoginOrRegister from "../login_or_register/LoginOrRegister";
import Button from "../button/Button";

const InputFields = ({
  inputLabels,
  handleSubmitCallback,
  handleChangeCallback,
  handleClickCallback,
  values,
  errors,
  login,
  register,
  btnName,
}) => {
  return (
    <div className="form-container">
      <form onSubmit={handleSubmitCallback}>
        {errors.general && (
          <div
            className="error-text"
            style={{ color: "red", marginBottom: "1em" }}
          >
            {errors.general}
          </div>
        )}
        {inputLabels.map((labl, idx) => {
          const name = labl.replace(/\s+/g, "").toLowerCase();
          return (
            <div key={`${labl}-${idx}`} className="input-field-container">
              <label>{labl}</label>
              <div className="input-container">
                <input
                  type={labl === "Password" ? "password" : "text"}
                  name={labl.replace(/\s+/g, "").toLowerCase()}
                  onChange={handleChangeCallback}
                  value={values[labl.toLowerCase()]}
                />
              </div>
              {errors[name] && (
                <span className="error-text" style={{ color: "red" }}>
                  {errors[name]}
                </span>
              )}
            </div>
          );
        })}
        <LoginOrRegister login={login} register={register} />
        <Button
          name={btnName}
          btnType={"submit"}
          handleClickCallback={handleClickCallback}
        />
      </form>
    </div>
  );
};

export default InputFields;
