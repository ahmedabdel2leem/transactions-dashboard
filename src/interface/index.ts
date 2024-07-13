export interface ICutomers {
    id: number,
    name: string,
    balance: number,
    profileImg: string
}

export interface ITransactions {
    id: number,
    customer_id: number,
    date: Date,
    amount: number,
    to: string
}

export interface IRowData extends ICutomers {
    transactions: ITransactions[];
}