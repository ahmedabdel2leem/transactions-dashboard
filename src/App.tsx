import './App.css'
import TransactionData from './TransactionData/TransactionData'
import TransactionDetails from './TransactionDetails/TransactionDetails'
import TransactionGraph from './TransactionGraph/TransactionGraph'

function App() {
  return (
    <>
      <div className='container-fluid mx-auto w-full'>
        <div className=' flex  lg:flex-row flex-col  lg:h-dvh w-full px-3 lg:gap-3 gap-20 py-3 test  ' >
          <TransactionData />
          <div className='lg:w-1/2 space-y-5 flex flex-col relative z-30 flex-auto'>

            <TransactionDetails />
            <TransactionGraph />
          </div>
        </div >
      </div>


    </>
  )
}

export default App
