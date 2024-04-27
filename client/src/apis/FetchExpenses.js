import axios from "axios";

const expenses = axios.create({
	baseURL: "http://localhost:3500/api/v1/expenses"
});

async function getExpenses() {
	try {
		const res = await expenses.get('/');
		return res.data;
	} catch (err) {console.log(err)};
};

async function getExpense(id) {
	try {
		const res = await expenses.get(`/${id}`);
		return res.data;
	} catch (err) {console.log(err)};
};

async function postExpense(body) {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		const res = await expenses.post('/', jsonAccount);
		return res.data.data;
	} catch (err) {console.log(err)};
};

async function putExpense(id, body) {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		const res = await expenses.put(`/${id}`, jsonAccount);
		return res.data.data;
	} catch (err) {console.log(err)};
};

async function deleteExpense(id) {
	try {
		const res = await expenses.delete(`/${id}`);
		return res.data.data;
	} catch (err) {console.log(err)};
};

export { getExpenses, getExpense, postExpense, putExpense, deleteExpense };