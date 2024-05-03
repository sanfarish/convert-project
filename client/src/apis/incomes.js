import axios from "axios";
import { config } from "./config";

const incomes = axios.create({
	baseURL: "http://localhost:3500/api/v1/incomes"
});

const getIncomes = async () => {
	try {
		const res = await incomes.get('/', config);
		return res.data;
	} catch (err) {console.log(err)};
};

const postIncome = async (body) => {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		jsonAccount.income_name = jsonAccount.income_name.trim();
		const res = await incomes.post('/', jsonAccount, config);
		return res;
	} catch (err) {return err};
};

const putIncome = async (id, body) => {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		jsonAccount.income_name = jsonAccount.income_name.trim();
		const res = await incomes.put(`/${id}`, jsonAccount, config);
		return res;
	} catch (err) {return err};
};

const deleteIncome = async (id) => {
	try {
		const res = await incomes.delete(`/${id}`, config);
		return res;
	} catch (err) {return err};
};

export { getIncomes, postIncome, putIncome, deleteIncome };