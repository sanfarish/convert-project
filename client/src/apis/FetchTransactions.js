import axios from "axios";

const transactions = axios.create({
	baseURL: "http://localhost:3500/api/v1/transactions"
});

const token = 'Mariana';
// eslint-disable-next-line no-unused-vars
const tokenTest = 'Test';

const config = {
	headers: { Authorization: `Bearer ${token}` }
};

async function getTransactions() {
	try {
		const res = await transactions.get('/', config);
		return res.data;
	} catch (err) {console.log(err)};
};

async function getTransaction(id) {
	try {
		const res = await transactions.get(`/${id}`);
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

export { getTransactions, getTransaction, postTransaction, putTransaction, deleteTransaction };