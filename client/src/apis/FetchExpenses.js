import axios from "axios";

const expenses = axios.create({
	baseURL: "http://localhost:3500/api/v1/categories-expense"
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

async function postExpense(name) {
	try {
		const res = await expenses.post('/', {
			expense_name: name
		});
		return res.data.data;
	} catch (err) {console.log(err)};
};

async function putExpense(name, id) {
	try {
		const res = await expenses.put(`/${id}`, {
			expense_name: name
		});
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