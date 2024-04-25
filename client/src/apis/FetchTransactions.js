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

async function postTransaction(body) {
	try {
		const res = await transactions.post('/', body);
		return res.data.data;
	} catch (err) {console.log(err)};
};

async function putTransaction(id, body) {
	try {
		const res = await transactions.put(`/${id}`, body);
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