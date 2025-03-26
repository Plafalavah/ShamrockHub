import React, { useState } from "react";
import { Button } from 'primereact/button';
import CSVReader from 'react-csv-reader';
import 'primereact/resources/themes/saga-blue/theme.css';  // Choose a theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "./budget.css";

function BudgetInfo({ budget }) {
  return (
    <div className="budget-info">
      <h2>Budget: {budget}</h2>
    </div>
  );
}

function IncomeInput({ newIncome, setNewIncome, addIncome }) {
  return (
    <div className="income-input">
      <input
        type="number"
        value={newIncome}
        onChange={(e) => setNewIncome(Number(e.target.value))}
      />
      <Button label="Add Income" icon="pi pi-plus" onClick={addIncome} />
    </div>
  );
}

function IncomeList({ incomes, removeIncome }) {
  return (
    <div className="incomes">
      <h2>Incomes</h2>
      <ul>
        {incomes.map((income, index) => (
          <li key={index}>
            {income}
            <Button label="Remove" icon="pi pi-times" className="p-button-danger" onClick={() => removeIncome(index)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExpenseInput({ newExpense, setNewExpense, addExpense }) {
  return (
    <div className="expense-input">
      <input
        type="number"
        value={newExpense}
        onChange={(e) => setNewExpense(Number(e.target.value))}
      />
      <Button label="Add Expense" icon="pi pi-plus" onClick={addExpense} />
    </div>
  );
}

function ExpenseList({ expenses, removeExpense }) {
  return (
    <div className="expenses">
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense}
            <Button label="Remove" icon="pi pi-times" className="p-button-danger" onClick={() => removeExpense(index)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Budget() {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState(0);
  const [incomes, setIncomes] = useState([]);
  const [newIncome, setNewIncome] = useState(0);

  const addExpense = () => {
    if (newExpense > 0) {
      setExpenses([...expenses, newExpense]);
      setBudget(budget - newExpense);
      setNewExpense(0);
    } else {
      alert("Expense must be a positive number");
    }
  };

  const removeExpense = (index) => {
    const expenseToRemove = expenses[index];
  const addIncome = () => {
    if (newIncome <= 0) {
      alert("Income must be a positive number");
      return;
    }
    setIncomes([...incomes, newIncome]);
    setBudget(budget + newIncome);
    setNewIncome(0);
  };
    setIncomes([...incomes, newIncome]);
    setBudget(budget + newIncome);
    setNewIncome(0);
  };

  const removeIncome = (index) => {
    const incomeToRemove = incomes[index];
    setIncomes(incomes.filter((_, i) => i !== index));
    setBudget(budget - incomeToRemove);
  };

  const handleCSVImport = (data) => {
    const importedIncomes = [];
    const importedExpenses = [];
    data.forEach(row => {
      if (row.length < 2) {
        console.error("Invalid row format:", row);
        return;
      }
      const [income, expense] = row;
      if (!isNaN(income)) {
        importedIncomes.push(Number(income));
      }
      if (!isNaN(expense)) {
        importedExpenses.push(Number(expense));
      }
    });
    setIncomes(importedIncomes);
    setExpenses(importedExpenses);
    const totalIncome = importedIncomes.reduce((acc, curr) => acc + curr, 0);
    const totalExpense = importedExpenses.reduce((acc, curr) => acc + curr, 0);
    setBudget(totalIncome - totalExpense);
  };

  return (
    <div className="budget">
      <h1>Budget</h1>
      <div className="budget-container">
        <BudgetInfo budget={budget} />
        <CSVReader
          cssClass="csv-reader-input"
          label="Import CSV"
          onFileLoaded={handleCSVImport}
          inputId="csv"
          inputStyle={{ color: 'red' }}
        />
        <IncomeInput
          newIncome={newIncome}
          setNewIncome={setNewIncome}
          addIncome={addIncome}
        />
        <IncomeList incomes={incomes} removeIncome={removeIncome} />
        <ExpenseInput
          newExpense={newExpense}
          setNewExpense={setNewExpense}
          addExpense={addExpense}
        />
        <ExpenseList expenses={expenses} removeExpense={removeExpense} />
      </div>
    </div>
  );
}

export default Budget;