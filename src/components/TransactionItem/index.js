import './index.css'

const TransactionItem = props => {
  const {transactionObj, onDeleteItem} = props
  const {id, title, amount, type} = transactionObj
  const {displayText} = type
  const onDelete = () => {
    onDeleteItem(id)
  }
  return (
    <li className="history-item">
      <p>{title}</p>
      <p>Rs {amount} </p>
      <p>{displayText} </p>
      <button type="button" className="delete-btn" data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-img"
          onClick={onDelete}
        />
      </button>
    </li>
  )
}

export default TransactionItem
