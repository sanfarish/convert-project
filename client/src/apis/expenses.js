import axios from "axios";
import { config, hostTarget } from "./config";

const expenses = axios.create({
	baseURL: `${hostTarget}/expenses`
});

const getExpenses = async (token) => {
	try {
		const res = await expenses.get('/', config(token));
		return res.data;
	} catch (err) {console.log(err)};
};

const postExpense = async (body, token) => {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		jsonAccount.expense_name = jsonAccount.expense_name.trim();
		const res = await expenses.post('/', jsonAccount, config(token));
		return res;
	} catch (err) {return err};
};

const putExpense = async (id, body, token) => {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		jsonAccount.expense_name = jsonAccount.expense_name.trim();
		const res = await expenses.put(`/${id}`, jsonAccount, config(token));
		return res;
	} catch (err) {return err};
};

const deleteExpense = async (id, token) => {
	try {
		const res = await expenses.delete(`/${id}`, config(token));
		return res;
	} catch (err) {return err};
};

export { getExpenses, postExpense, putExpense, deleteExpense };