import axios from "axios";

const transactions = axios.create({
	baseURL: "http://localhost:3500/api/v1/transactions"
});

async function getTransactions() {
	try {
		const res = await transactions.get('/');
		return res.data;
	} catch (err) {console.log(err)};
};

async function postTransaction(datetime, account, income, expense, transfer, amount, note) {
	try {
		const res = await transactions.post('/', {
			transaction_time: datetime,
			id_account: account,
			id_income: income,
			id_expense: expense,
			id_transfer: transfer,
			transaction_amount: amount,
			transaction_note: note
		});
		return res.data.data;
	} catch (err) {console.log(err)};
};

async function putTransaction(id, datetime, account, income, expense, transfer, amount, note) {
	try {
		const res = await transactions.put(`/${id}`, {
			transaction_time: datetime,
			id_account: account,
			id_income: income,
			id_expense: expense,
			id_transfer: transfer,
			transaction_amount: amount,
			transaction_note: note
		});
		return res.data.data;
	} catch (err) {console.log(err)};
};

async function deleteTransaction(id) {
	try {
		const res = await transactions.delete(`/${id}`);
		return res.data.data;
	} catch (err) {console.log(err)};
};

export { getTransactions, postTransaction, putTransaction, deleteTransaction };