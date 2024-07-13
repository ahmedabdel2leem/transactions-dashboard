import { useContext } from "react";
import HandelDataContext from "../Context/HandelDataContext";
import { ITransactions } from "../interface";


function TransactionData() {

    const { getCustomerById, filteredTransactions, toggleSortByAmount, toggleSortByDate, formatCurrency, sortByAmount, sortByDate, maxAmount, minAmount, searchTerm, setMaxAmount, setMinAmount, setSearchTerm } = useContext(HandelDataContext)


    const handelClick = (e: any) => {

        const newUrl = `${window.location.pathname}?id=${e}`;
        window.history.replaceState(null, '', newUrl);
        const event = new PopStateEvent('popstate');
        window.dispatchEvent(event);
    }

    return (
        //  filtrations
        <div className="lg:w-1/2  w-full h-[30rem] lg:h-auto   md:mx-2">
            <div className="flex items-center justify-between mb-4 lg:space-x-20">
                <div className="flex flex-col">
                    {/* <label htmlFor="search" className="text-start font-semibold ">Name</label> */}
                    <input
                        type="text"
                        id="search"
                        className="placeholder-gray-300  bg-opacity-10 bg-white backdrop-blur-lg focus:placeholder-transparent  text-white rounded-[.40rem]  py-2 px-3 outline-none "
                        placeholder="Search by name . . ."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    {/* <div className="text-start font-semibold ">Amount Range</div> */}
                    <div className="flex lg:flex-row flex-col gap-2">
                        <input
                            type="text"
                            className="w-32  placeholder-gray-300 bg-opacity-10 text-white bg-white backdrop-blur-lg focus:placeholder-transparent   rounded-[.40rem]  py-2 px-3 outline-none "
                            placeholder="Min Amount"
                            value={minAmount === undefined ? '' : minAmount}
                            onChange={(e) => setMinAmount(e.target.value === '' ? undefined : parseFloat(e.target.value))}
                        />
                        <input
                            type="text"
                            className="w-32 placeholder-gray-300 bg-opacity-10 text-white bg-white backdrop-blur-lg focus:placeholder-transparent   rounded-[.40rem]  py-2 px-3 outline-none"
                            placeholder="Max Amount"
                            value={maxAmount === undefined ? '' : maxAmount}
                            onChange={(e) => setMaxAmount(e.target.value === '' ? undefined : parseFloat(e.target.value))}
                        />
                    </div>
                </div>
            </div >

            {/* table */}
            <div className="card   rounded-2xl w-full overflow-y-scroll h-[90%] scrollbar  mt-2   bg-white bg-opacity-5   backdrop-blur-lg" >
                <div className="text-white  ">
                    <table className="min-w-full divide-y  divide-gray-200">
                        <thead className="">
                            <tr className="space-x-6" >
                                <th className=" ps-4 py-7 text-left text-xs  font-medium text-gray-300 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className=" px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer text-nowrap" onClick={toggleSortByDate}>
                                    Transaction Date{' '}
                                    <span>{sortByDate === 'asc' ? '▲' : '▼'}</span>
                                </th>
                                <th className=" py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer text-nowrap" onClick={toggleSortByAmount}>
                                    Transaction Amount{' '}
                                    <span>{sortByAmount === 'asc' ? '▼' : '▲'}</span>
                                </th>
                                <th className=" py-3 hidden lg:table-cell  text-center text-xs font-base text-gray-300 uppercase tracking-wider ">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="   ">
                            {filteredTransactions.map((transaction: ITransactions) => {
                                const customer = getCustomerById(transaction.customer_id);
                                return (
                                    <tr onClick={() => handelClick(transaction.customer_id)} key={transaction.id} className="cursor-pointer" >
                                        <td className="ps-3  py-4 whitespace-nowrap align-top">
                                            {customer && (
                                                <div className="flex items-center ps-2 lg:ps-0 box-border">
                                                    <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                                        <img src={customer.profileImg} className="w-full h-full object-cover" alt={customer.name} />
                                                    </div>
                                                    <span className="ml-2 font-semibold">{customer.name}</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className=" py-4 whitespace-nowrap align-middle text-center ">
                                            {new Date(transaction.date).toLocaleDateString()}
                                        </td>
                                        <td className=" py-4 whitespace-nowrap align-middle text-center ">
                                            {formatCurrency(transaction.amount)}
                                        </td>
                                        <td className="text-sm hidden lg:table-cell text-nowrap text-center  hover:bg-bink-100 group">
                                            <button onClick={() => handelClick(transaction.customer_id)} className="bg-gradient-to-r flex from-blue-500 to-purple-500 text-white font-thin rounded-lg p-0.5">
                                                <span className="flex justify-center w-full text-center bg-gray-900 group-hover:bg-opacity-0 text-white  transition-all duration-700 rounded-lg p-2">
                                                    Show Transactions Info
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div >
        </div >
    );
}

export default TransactionData;
