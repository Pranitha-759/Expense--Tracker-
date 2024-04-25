const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expenses');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function displayExpenses() {
  expenseList.innerHTML = '';
  expenses.forEach((expense) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${expense.expense} - $${expense.amount} - <span class="math-inline">\{expense\.date\}</span\>
<div class\="actions"\>
<button data\-id\="</span>{expense.id}">Edit</button>
        <button data-id="${expense.id}">Delete</button>
      </div>
    `;
    expenseList.appendChild(listItem);
  });
}

displayExpenses();

expenseForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const expense = document.getElementById('expense').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const date = document.getElementById('date').value;

  const newExpense = { id: Date.now(), expense, amount, date };

  expenses.push(newExpense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  displayExpenses();

  expenseForm.reset();
});

expenseList.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const expenseId = parseInt(event.target.dataset.id);
      const action = event.target.classList.contains('edit-btn') ? 'edit' : 'delete';
  
      if (action === 'delete') {
        const expenseIndex = expenses.findIndex(expense => expense.id === expenseId);
        if (expenseIndex !== -1) {
          expenses.splice(expenseIndex, 1); // Remove expense from array
          localStorage.setItem('expenses', JSON.stringify(expenses));
          displayExpenses(); // Update displayed list
        }
      }
    }
  });