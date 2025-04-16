import './App.css'
import MonthlyBarChart from './charts/MonthlyBarChart'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'

function App() {

  return (
    <div className="container">
      <TransactionForm />
      <TransactionList />
      <MonthlyBarChart />
    </div>
  )
}

export default App
