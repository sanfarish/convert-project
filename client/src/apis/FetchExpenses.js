import axios from "axios";
import { config } from "./config";

const expenses = axios.create({
	baseURL: "http://localhost:3500/api/v1/expenses"
});

async function getExpenses() {
	try {
		const res = await expenses.get('/', config);
		return res.data;
	} catch (err) {console.log(err)};
};

async function postExpense(body) {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		jsonAccount.expense_name = jsonAccount.expense_name.trim();
		const res = await expenses.post('/', jsonAccount, config);
		return res;
	} catch (err) {return err};
};

async function putExpense(id, body) {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		jsonAccount.expense_name = jsonAccount.expense_name.trim();
		const res = await expenses.put(`/${id}`, jsonAccount, config);
		return res;
	} catch (err) {return err};
};

async function deleteExpense(id) {
	try {
		const res = await expenses.delete(`/${id}`, config);
		return res;
	} catch (err) {return err};
};

export { getExpenses, postExpense, putExpense, deleteExpense };