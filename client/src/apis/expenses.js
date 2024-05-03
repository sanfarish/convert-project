import axios from "axios";
import { config } from "./config";

const expenses = axios.create({
	baseURL: "http://localhost:3500/api/v1/expenses"
});

const getExpenses = async () => {
	try {
		const res = await expenses.get('/', config);
		return res.data;
	} catch (err) {console.log(err)};
};

const postExpense = async (body) => {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		jsonAccount.expense_name = jsonAccount.expense_name.trim();
		const res = await expenses.post('/', jsonAccount, config);
		return res;
	} catch (err) {return err};
};

const putExpense = async (id, body) => {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		jsonAccount.expense_name = jsonAccount.expense_name.trim();
		const res = await expenses.put(`/${id}`, jsonAccount, config);
		return res;
	} catch (err) {return err};
};

const deleteExpense = async (id) => {
	try {
		const res = await expenses.delete(`/${id}`, config);
		return res;
	} catch (err) {return err};
};

export { getExpenses, postExpense, putExpense, deleteExpense };