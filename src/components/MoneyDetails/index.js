import './index.css'

const MoneyDetails = props => {
  const {amountDetails} = props
  const {totalIncome, totalExpenses} = amountDetails
  return (
    <div className="cards-container">
      <div className="card-1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="image-1"
        />
        <div>
          <p className="your-text">Your Balance</p>
          <p className="amount" data-testid="balanceAmount">
            Rs {totalIncome - totalExpenses}{' '}
          </p>
        </div>
      </div>
      <div className="card-2">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="image-1"
        />
        <div>
          <p className="your-text">Your Income</p>
          <p className="amount" data-testid="incomeAmount">
            Rs {totalIncome}{' '}
          </p>
        </div>
      </div>
      <div className="card-3">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="image-1"
        />
        <div>
          <p className="your-text">Your Expenses</p>
          <p className="amount" data-testid="expensesAmount">
            Rs {totalExpenses}{' '}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
