import { useNavigate } from "react-router-dom";
import "../../css/css_for_components/Button.css";

const Button = ({ name, btnType, handleClickCallback }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // const handleClick = () => {
  //   navigate(`/dashboard/${userId}`);
  // };
  // onClick={handleClickCallback}
  return (
    <div className="btn-container">
      <button type={btnType}>{name}</button>
    </div>
  );
};

export default Button;
