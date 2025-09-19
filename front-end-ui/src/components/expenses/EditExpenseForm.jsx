import { useState, useEffect } from "react";

const EditExpenseForm = ({ editingExpense, folderId, onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  // Pre-fill fields when editingExpense changes
  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title || "");
      setAmount(editingExpense.amount || "");
    }
  }, [editingExpense]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedExpense = {
      title,
      amount: parseFloat(amount),
    };

    await onSave(editingExpense.expenseId, folderId, updatedExpense);

    // Clear after save
    setTitle("");
    setAmount("");
  };

  if (!editingExpense) return null;
  return (
    <div className="edit-expense-form mt-4">
      <h3>Edit Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success me-2 expense-btn">
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary expense-btn"
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditExpenseForm;
