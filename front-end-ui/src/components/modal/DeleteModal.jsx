import { Modal, Button } from "react-bootstrap";
import { deleteFolder } from "../../services/FolderService";
import { useCsrf } from "../../context/CsrfTokenContext";
import "../../css/css_for_components/DeleteModal.css";

const DeleteModal = ({
  show,
  modalId,
  userId,
  folder,
  onClose,
  onFolderDeleted,
}) => {
  const { csrfToken } = useCsrf();
  const handleDelete = async () => {
    // alert("delete button");
    // if (!folder) {
    //   return;
    // }

    try {
      await deleteFolder(userId, folder.expenseFolderId, csrfToken);
      onFolderDeleted(folder.expenseFolderId);
    } catch (err) {
      console.error("Error deleting folder: ", err);
    }

    // console.log(res);
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      dialogClassName="custom-delete-modal-dialog"
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Expense Folder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete{" "}
        <strong>{folder?.expenseFolderName}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          No
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Yes, delete
        </Button>
      </Modal.Footer>
    </Modal>
    // <div className="modal-backdrop">
    //   <div className="modal-content">
    //     <h3>Delete Expense Folder</h3>
    //     <p>Are you sure you want to delete "{folder.expenseFolderName}"?</p>
    //     <button onClick={onClose}>Cancel</button>
    //     <button onClick={handleDelete}>Yes, delete</button>
    //   </div>
    // </div>
    // <>
    //   <div
    //     className="modal fade"
    //     id={modalId}
    //     tabIndex="-1"
    //     aria-labelledby="exampleModalLabel"
    //     aria-hidden="true"
    //   >
    //     <div className="modal-dialog">
    //       <div className="modal-content">
    //         <div className="modal-header">
    //           <h1 className="modal-title fs-5" id="exampleModalLabel">
    //             Delete Expense Folder
    //           </h1>
    //           <button
    //             type="button"
    //             className="btn-close"
    //             data-bs-dismiss="modal"
    //             aria-label="Close"
    //             onClick={onClose}
    //           ></button>
    //         </div>
    //         <div className="modal-body">
    //           Are you sure you want to delete this folder?
    //         </div>
    //         <div className="modal-footer">
    //           <button
    //             type="button"
    //             className="btn btn-secondary"
    //             // data-bs-dismiss="modal"
    //             onClick={onClose}
    //           >
    //             No
    //           </button>
    //           <button
    //             type="button"
    //             className="btn btn-primary"
    //             onClick={handleDelete}
    //           >
    //             Yes
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export default DeleteModal;
