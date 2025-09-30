import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  addExpenseToFolder,
  getExpensesForFolder,
  updateExpenseForFolder,
  deleteExpenseForFolder,
} from "../services/ExpenseService";
import { useCsrf } from "../context/CsrfTokenContext";
import NavigationBar from "../components/navigation/NavigationBar";
import EditExpenseForm from "../components/expenses/EditExpenseForm";
import "../css/css_for_pages/FolderExpenses.css";

const FolderExpenses = () => {
  const { id, folderName, folderId } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newExpense, setNewExpense] = useState({ title: "", amount: "" });
  const [editingExpense, setEditingExpense] = useState(null); // holds expense being edited
  const { csrfToken } = useCsrf();
  // const [title, setTitle] = useState("");
  // const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await getExpensesForFolder(id, folderId);
        setExpenses(res || []);
      } catch (err) {
        console.error("Error fetching expenses: ", err);
      }
    };

    fetchExpenses();
  }, [id, folderId]);

  const handleChange = (e) => {
    setNewExpense((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const addedExpense = await addExpenseToFolder(
        id,
        folderId,
        newExpense,
        csrfToken
      );
      setExpenses([...expenses, addedExpense]);
      setNewExpense({ title: "", amount: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Error adding expense: ", err);
    }
  };

  // const handleEdit = async (expense) => {
  //   const updatedTitle = prompt("Enter new title", expense.title);
  // };

  const handleSave = async (expenseId, folderId, updatedData) => {
    const updated = await updateExpenseForFolder(
      id,
      folderId,
      expenseId,
      updatedData,
      csrfToken
    );
    if (updated) {
      setExpenses((prev) =>
        prev.map((e) => (e.expenseId === expenseId ? updated : e))
      );
      setEditingExpense(null);
    }
  };

  const handleDelete = async (expenseId) => {
    // you probably already have a delete service; just call it here
    try {
      await deleteExpenseForFolder(id, folderId, expenseId, csrfToken);
      setExpenses((prev) => prev.filter((e) => e.expenseId !== expenseId));
    } catch (err) {
      console.error("Error deleting expense: ", err);
    }
  };

  return (
    <div className="folder-expenses-container">
      <NavigationBar userId={id} />
      <div className="expenses-content">
        <h1>Expenses for {folderName} folder</h1>
        <button
          // className="add-expense-btn"
          className="btn btn-dark expense-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Add Expense"}
        </button>

        {showForm && (
          <form className="add-expense-form" onSubmit={handleAddExpense}>
            <input
              type="text"
              name="title"
              placeholder="Expense Title"
              value={newExpense.title}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={handleChange}
              required
            />
            <button className="btn btn-primary expense-btn" type="submit">
              Save
            </button>
          </form>
        )}
        {expenses.length > 0 ? (
          <table className="expenses-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount ($)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, idx) => (
                <tr key={`${idx}-${expense.expenseId}`}>
                  <td>{expense.title}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.date}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => {
                        setEditingExpense(expense);
                        // setTitle(expense.title);
                        // setAmount(expense.amount);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(expense.expenseId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No expenses found for this folder</p>
        )}
        {editingExpense && (
          <EditExpenseForm
            editingExpense={editingExpense}
            folderId={folderId}
            onSave={(expenseId, folderId, updatedData) =>
              handleSave(expenseId, folderId, updatedData)
            }
            onCancel={() => setEditingExpense(null)}
          />
        )}
      </div>
    </div>
  );
};

export default FolderExpenses;
