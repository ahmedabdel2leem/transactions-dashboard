import { useContext, useEffect, useState } from "react";
import HandelDataContext from "../Context/HandelDataContext";
import { ICutomers, ITransactions } from "../interface";
import useQuery from "./CustomeHook";


function TransactionDetails() {
    const { getCustomerById, formatCurrency, getTransacitons, customerId } = useContext(HandelDataContext);


    const customerTransactions = getTransacitons();

    let customer = getCustomerById(customerId)

    console.log(customer)
    const uniqueTransactions = customerTransactions.reduce((accumulator: ITransactions[], currentTransaction: ITransactions) => {
        const isDuplicate = accumulator.some((transaction: ITransactions) => transaction.to === currentTransaction.to);
        if (!isDuplicate) {
            accumulator.push(currentTransaction);
        }
        return accumulator;
    }, []);
    // calc average
    const amounts = customerTransactions.map((transaction: ITransactions) => transaction.amount);
    const total = amounts.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);
    const average = total / amounts.length

    return (
        <div className="lg:h-1/2  w-full space-x-3 flex">
            <div className="flex flex-col w-2/3 space-y-4">
                <div className="flex justify-around p-8 bg-white bg-opacity-5 rounded-xl backdrop-blur-lg">
                    <div className="text-white flex flex-col">
                        <span className="text-base font-mono text-slate-300">Total Balance</span>
                        <span className="text-xl">{formatCurrency(customer?.balance)}</span>
                    </div>
                    <div className="text-white flex flex-col">
                        <span className="text-base font-mono text-slate-300"> Average</span>
                        <span className="text-xl">{formatCurrency(average)}</span>
                    </div>
                </div>
                <div className="flex-1 bg-white bg-opacity-5 rounded-xl backdrop-blur-lg">
                    <div className="text-2xl text-white font-thin py-4 ps-4">Receivers</div>
                    <div className="flex flex-wrap justify-around mt-4 space-x-7">
                        {uniqueTransactions.map((trans: ITransactions) => (
                            <div key={trans.id} className="text-white text-2xl">{trans.to}</div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="   All Transactions overflow-y-scroll  scrollbar flex flex-col h-full w-2/6 px-3 py-3 bg-white bg-opacity-5 rounded-xl backdrop-blur-lg shadow-2xl">
                <div className="transactionsHeader  text-white  border-gray-500 border-b sm:text-center py-3 flex items-center flex-col sm:flex-row space-x-2">
                    <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        <img src={customer?.profileImg} className="w-full h-full object-cover" alt={customer?.name} />
                    </div>
                    <div className="font-light text-sm text-wrap text-center "> {customer?.name} Transactions </div>
                </div>
                <div className=" h-60">
                    {customerTransactions.map((trans: ITransactions) => (
                        <div key={trans.id} className="tranRow flex flex-col py-3 space-y-1 w-full text-white my-auto border-b border-gray-700">
                            <div className="w-fit text-right text-xs font-thin text-gray-300">{new Date(trans.date).toLocaleDateString()}</div>
                            <div className="w-full flex lg:flex-row flex-col justify-between space-y-1 lg:space-y-0">
                                <div className="w-1/2 text-start text-sm">{trans.to}</div>
                                <div className="w-1/2 self-end text-sm">{formatCurrency(trans.amount)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TransactionDetails;
