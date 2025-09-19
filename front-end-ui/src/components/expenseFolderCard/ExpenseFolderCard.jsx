import Modal from "../modal/FolderModal";
import DeleteModal from "../modal/DeleteModal";
import { useNavigate } from "react-router-dom";
import "../../css/css_for_components/ExpenseFolderCard.css";

const ExpenseFolderCard = ({ expenseFolder, userId, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(
      `/dashboard/${userId}/${expenseFolder.expenseFolderName}/${expenseFolder.expenseFolderId}`
    );
  };

  return (
    <>
      <div className="card expense-card">
        <div className="card-header">{expenseFolder.expenseFolderName}</div>
        <div className="card-body">
          {/* <h5 className="card-title">Special title treatment</h5> */}
          <p className="card-text">
            {expenseFolder.expenseFolderDesc
              ? `${expenseFolder.expenseFolderDesc}`
              : "No description"}
            {/* With supporting text below as a natural lead-in to additional
            content. */}
          </p>
          <div className="btn-container">
            <a href="#" className="btn btn-dark" onClick={handleOpen}>
              Open
            </a>
            <a
              href="#"
              className="btn btn-secondary"
              data-bs-toggle="modal"
              // data-bs-target="#editfolder"
              onClick={onEdit} //trigger modal with selected folder
            >
              Edit
            </a>
            <a
              href="#"
              className="btn btn-danger"
              data-bs-toggle="modal"
              // data-bs-target="#deletefolder"
              onClick={onDelete}
            >
              Delete
            </a>
          </div>
        </div>
      </div>
      {/* <Modal
        btnId={"editfolder"}
        userId={userId}
        mode={"edit"}
        folder={expenseFolder}
      /> */}
      {/* <DeleteModal
        modalId={"deletefolder"}
        userId={userId}
        folder={expenseFolder}
      /> */}
    </>
  );
};

export default ExpenseFolderCard;
