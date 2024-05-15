import axios from "axios";
import { config, hostTarget } from "./config";

const incomes = axios.create({
	baseURL: `${hostTarget}/incomes`
});

const getIncomes = async (token) => {
	try {
		const res = await incomes.get('/', config(token));
		return res.data;
	} catch (err) {console.log(err)};
};

const postIncome = async (body, token) => {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		jsonAccount.income_name = jsonAccount.income_name.trim();
		const res = await incomes.post('/', jsonAccount, config(token));
		return res;
	} catch (err) {return err};
};

const putIncome = async (id, body, token) => {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		jsonAccount.income_name = jsonAccount.income_name.trim();
		const res = await incomes.put(`/${id}`, jsonAccount, config(token));
		return res;
	} catch (err) {return err};
};

const deleteIncome = async (id, token) => {
	try {
		const res = await incomes.delete(`/${id}`, config(token));
		return res;
	} catch (err) {return err};
};

export { getIncomes, postIncome, putIncome, deleteIncome };