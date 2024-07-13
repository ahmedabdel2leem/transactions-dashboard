import { useContext } from 'react';
import './App.css'
import HandelDataContext from './Context/HandelDataContext';
import TransactionData from './TransactionData/TransactionData'
import TransactionDetails from './TransactionDetails/TransactionDetails'
import TransactionGraph from './TransactionGraph/TransactionGraph'
import Loader from './loader';

function App() {
  const { transactions } = useContext(HandelDataContext);
  if (transactions.length == 0) {
    console.log('test')
    return <Loader />; // Render the Loader component while transactions are not available
  }
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
