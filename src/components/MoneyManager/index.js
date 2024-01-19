import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const historyArr = []

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: null,
    selectedOption: transactionTypeOptions[0].optionId,
    amountDetails: {
      totalIncome: 0,
      totalExpenses: 0,
    },
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOption = event => {
    this.setState({selectedOption: event.target.value})
  }

  createAndAppendNewObjToHistoryArr = () => {
    const {titleInput, amountInput, selectedOption} = this.state
    const selectedOptObj = transactionTypeOptions.find(
      eachObj => eachObj.optionId === selectedOption,
    )
    const newObj = {
      id: uuidv4(),
      title: titleInput,
      amount: Number(amountInput),
      type: selectedOptObj,
    }
    historyArr.push(newObj)
  }

  onSubmitForm = event => {
    event.preventDefault()
    this.createAndAppendNewObjToHistoryArr()
    this.setState(prevState => {
      const {amountDetails, amountInput, selectedOption} = prevState
      let {totalIncome, totalExpenses} = amountDetails
      if (selectedOption === 'INCOME') {
        totalIncome += Number(amountInput)
      } else {
        totalExpenses += Number(amountInput)
      }
      return {
        titleInput: '',
        amountInput: '',
        selectedOption: transactionTypeOptions[0].optionId,
        amountDetails: {...amountDetails, totalIncome, totalExpenses},
      }
    })
  }

  onDeleteItem = id => {
    const deleteObj = historyArr.find(eachObj => eachObj.id === id)
    historyArr.pop(deleteObj)
    this.setState(prevState => {
      const {amountDetails} = prevState
      let {totalIncome, totalExpenses} = amountDetails
      if (deleteObj.type.optionId === 'INCOME') {
        totalIncome -= Number(deleteObj.amount)
      } else {
        totalExpenses -= Number(deleteObj.amount)
      }
      return {
        amountDetails: {...amountDetails, totalIncome, totalExpenses},
      }
    })
  }

  render() {
    const {titleInput, amountInput, amountDetails, selectedOption} = this.state
    return (
      <div className="bg-container">
        <div className="name-card">
          <h1 className="heading-1">Hi, Richard</h1>
          <p className="description">
            Welcome back to your <span>Money Manager</span>{' '}
          </p>
        </div>
        <MoneyDetails amountDetails={amountDetails} />
        <div className="boxes-container">
          <form className="input-form" onSubmit={this.onSubmitForm}>
            <h2 className="heading-2">Add Transaction</h2>
            <label htmlFor="title">TITLE</label>
            <input
              type="text"
              id="title"
              placeholder="TITLE"
              className="input-box"
              value={titleInput}
              onChange={this.onChangeTitle}
            />
            <label htmlFor="amount">AMOUNT</label>
            <input
              type="text"
              id="amount"
              placeholder="AMOUNT"
              className="input-box"
              value={amountInput}
              onChange={this.onChangeAmount}
            />
            <label htmlFor="type">TYPE</label>
            <select
              value={selectedOption}
              className="input-box"
              onChange={this.onChangeOption}
            >
              {transactionTypeOptions.map(eachObj => (
                <option key={eachObj.optionId} value={eachObj.optionId}>
                  {eachObj.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <div className="history-card">
            <h2 className="heading-2">History</h2>
            <ul>
              <li className="table-headings">
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
                  alt="delete"
                  className="delete-btn hide"
                />
              </li>
              {historyArr.map(eachObj => (
                <TransactionItem
                  transactionObj={eachObj}
                  onDeleteItem={this.onDeleteItem}
                  key={eachObj.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
