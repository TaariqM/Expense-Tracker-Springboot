import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FolderExpenses from "./pages/FolderExpenses";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route
            path="/dashboard/:id/:folderName/:folderId"
            element={<FolderExpenses />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
