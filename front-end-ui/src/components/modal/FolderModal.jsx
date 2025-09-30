import { useState, useEffect } from "react";
import { addFolder, modifyFolder } from "../../services/FolderService";
import { useCsrf } from "../../context/CsrfTokenContext";
import { Modal, Button } from "react-bootstrap";
// import "../../css/css_for_components/Modal.css";
import "../../css/css_for_components/DeleteModal.css";

const FolderModal = ({
  show,
  mode,
  btnId,
  userId,
  folder,
  onClose,
  onFolderUpdated,
}) => {
  if (!show) return null;

  const [folderInfo, setFolderInfo] = useState({
    folderName: "",
    folderDescription: "",
  });
  const [error, setError] = useState(false);
  const { csrfToken } = useCsrf();

  // when editing the folder, have the form prefilled with the previous folder values
  useEffect(() => {
    if (mode === "edit" && folder) {
      // console.log(folder);
      setFolderInfo({
        folderName: folder.expenseFolderName || "",
        folderDescription: folder.expenseFolderDesc || "",
      });
    } else {
      setFolderInfo({ folderName: "", folderDescription: "" });
    }
    setError(false);
  }, [mode, folder]);

  // const editFolder = async (userId, folderId, folderInfo) => {
  //   const editedFolder = await modifyFolder(userId, folderId, folderInfo);
  //   return editedFolder;
  // };

  const handleChange = (e) => {
    setFolderInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!folderInfo.folderName.trim()) {
      setError(true);
      return;
    }

    setError(false);

    let updatedFolder;
    if (mode === "edit" && folder) {
      updatedFolder = await modifyFolder(
        userId,
        folder.expenseFolderId,
        folderInfo,
        csrfToken
      );
    } else {
      updatedFolder = await addFolder(userId, folderInfo, csrfToken);
      console.log(updatedFolder);
    }

    if (updatedFolder && onFolderUpdated) {
      onFolderUpdated(updatedFolder);
    }

    onClose();
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      dialogClassName="custom-delete-modal-dialog"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "edit" ? "Edit Expense Folder" : "New Expense Folder"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="folder-name" className="form-label">
              Folder Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="folder-name"
              name="folderName"
              value={folderInfo.folderName}
              onChange={handleChange}
            />
            {error && (
              <p style={{ color: "red" }}>Please enter a folder name.</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="folder-description" className="form-label">
              Description (Optional):
            </label>
            <input
              type="text"
              className="form-control"
              id="folder-description"
              name="folderDescription"
              value={folderInfo.folderDescription}
              onChange={handleChange}
            />
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {mode === "edit" ? "Save Changes" : "Create Folder"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FolderModal;
