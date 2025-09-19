import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../services/UserService.js";
import { getFolders } from "../services/FolderService.js";
import NavigationBar from "../components/navigation/NavigationBar";
import ExpenseFolderCard from "../components/expenseFolderCard/ExpenseFolderCard.jsx";
import Modal from "../components/modal/FolderModal.jsx";
import "../css/css_for_pages/Dashboard.css";
import DeleteModal from "../components/modal/DeleteModal.jsx";

const Dashboard = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [expenseFolders, setExpenseFolders] = useState([]);
  const [modalMode, setModalMode] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null); // store the folder that will get edited
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getUser(id);
        setUser(currentUser);
        // console.log(currentUser);
      } catch (err) {
        console.error("Error fetching current user: ", err);
      }
    };

    const fetchExpenseFolders = async () => {
      try {
        const folders = await getFolders(id);
        setExpenseFolders(folders || []);
      } catch (err) {
        console.error("Error fetching current users expense folders: ", err);
      }
    };

    fetchUser();
    fetchExpenseFolders();
  }, [id]);

  const handleFolderUpdate = (updatedFolder) => {
    if (!updatedFolder) return;

    // check if there is a folder that has the same updated folder id
    // if there is, then find the that exact folder and then change it to the updated folder
    setExpenseFolders((prev) =>
      prev.some(
        (prevFolder) =>
          prevFolder.expenseFolderId === updatedFolder.expenseFolderId
      )
        ? prev.map((prevF) =>
            prevF.expenseFolderId === updatedFolder.expenseFolderId
              ? updatedFolder
              : prevF
          )
        : [updatedFolder, ...prev]
    );

    closeModal();
  };

  const openModal = (mode, folder = null) => {
    setModalMode(mode);
    setSelectedFolder(folder);
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedFolder(null);
  };

  const handleFolderDelete = (deletedFolderId) => {
    setExpenseFolders((prevF) =>
      prevF.filter((prev) => prev.expenseFolderId !== deletedFolderId)
    );
    closeModal();
  };

  // console.log("Expense Folders: ", expenseFolders);
  // console.log(user);

  return (
    <div className="dashboard-container">
      <NavigationBar userId={id} onAddFolder={() => openModal("create")} />
      <div className="dashboard-container-content">
        <h1 className="dashboard-container-title">
          {user ? `Welcome to ${user.userFirstName}'s Dashboard` : "Loading..."}
        </h1>
        <div className="dashboard-container-cards">
          {expenseFolders.length > 0
            ? expenseFolders.map((expenseFolder, idx) => (
                <ExpenseFolderCard
                  key={`${idx}-${expenseFolder.expenseFolderId}`}
                  expenseFolder={expenseFolder}
                  userId={id}
                  onEdit={() => openModal("edit", expenseFolder)}
                  onDelete={() => openModal("delete", expenseFolder)}
                  // onEdit={() => setSelectedFolder(expenseFolder)}
                />
              ))
            : "Please add a new expense folder"}
        </div>
      </div>

      {(modalMode === "create" || modalMode === "edit") && (
        <Modal
          show={modalMode === "create" || modalMode === "edit"}
          mode={modalMode}
          userId={id}
          folder={selectedFolder}
          onClose={closeModal}
          onFolderUpdated={handleFolderUpdate}
        />
      )}

      {modalMode === "delete" && selectedFolder && (
        <DeleteModal
          // show={isDeleteModalOpen}
          show={modalMode === "delete"}
          folder={selectedFolder}
          userId={id}
          onClose={closeModal}
          // onClose={() => setIsDeleteModalOpen(false)}
          onFolderDeleted={handleFolderDelete}
        />
      )}
    </div>
  );
};

export default Dashboard;
