import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { ICutomers, ITransactions } from "../interface";
import useQuery from "../TransactionDetails/CustomeHook";
type IDataProvider = {
    children: ReactNode;
}

const HandelDataContext = createContext<any | undefined>([]);

// Create a provider component
export const DataProvider: React.FC<IDataProvider> = ({ children }: IDataProvider) => {
    const [customers, setCustomers] = useState<ICutomers[]>([]);
    const [transactions, setTransaction] = useState<ITransactions[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [minAmount, setMinAmount] = useState<number | undefined>(undefined);
    const [maxAmount, setMaxAmount] = useState<number | undefined>(undefined);
    const [sortByDate, setSortByDate] = useState<'asc' | 'desc' | undefined>(undefined);
    const [sortByAmount, setSortByAmount] = useState<'asc' | 'desc' | undefined>(undefined);

    const query = useQuery();
    const [customerId, setCustomerId] = useState(() => {
        const id = query.get('id');
        return id ? +id : 1;
    });

    useEffect(() => {
        const id = query.get('id');
        const newCustomerId = id ? +id : 1;
        if (newCustomerId !== customerId) {
            setCustomerId(newCustomerId);
        }
    }, [query, customerId]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    useEffect(() => {
        axios.get('../../db.json')
            .then((res) => {
                setTransaction(res.data.transactions);
                setCustomers(res.data.customers);
            })
            .catch(err => console.log("Error fetching transactions:", err));


        setSortByDate('asc')
    }, []);

    const getCustomerById = (id: number) => customers.find(customer => customer.id == id);
    const getTransacitons = () => transactions.filter(trans => trans.customer_id == customerId);

    // Filter transactions based on search term and amount range
    const filteredTransactions = transactions.filter(transaction => {
        const customer = getCustomerById(transaction.customer_id);
        return customer &&
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (minAmount === undefined || transaction.amount >= minAmount) &&
            (maxAmount === undefined || transaction.amount <= maxAmount);
    });

    // Sort transactions by date
    if (sortByDate) {
        filteredTransactions.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();

            if (sortByDate === 'asc') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });
    }

    // Sort transactions by amount
    if (sortByAmount) {
        filteredTransactions.sort((a, b) => {
            if (sortByAmount === 'asc') {
                return a.amount - b.amount;
            } else {
                return b.amount - a.amount;
            }
        });
    }

    const toggleSortByDate = () => {
        if (!sortByAmount) {
            setSortByDate(sortByDate === 'asc' ? 'desc' : 'asc');
        } else {
            setSortByDate('asc');
            setSortByAmount(undefined);
        }
    };

    const toggleSortByAmount = () => {
        if (!sortByDate) {
            setSortByAmount(sortByAmount === 'asc' ? 'desc' : 'asc');
        } else {
            setSortByAmount('asc');
            setSortByDate(undefined);
        }
    };

    return (
        <HandelDataContext.Provider value={{ customerId, getTransacitons, getCustomerById, filteredTransactions, toggleSortByAmount, toggleSortByDate, formatCurrency, sortByAmount, sortByDate, maxAmount, minAmount, searchTerm, transactions, setTransaction, customers, setCustomers, setMaxAmount, setMinAmount, setSearchTerm }}>
            {children}
        </HandelDataContext.Provider>
    );
};

export default HandelDataContext;
