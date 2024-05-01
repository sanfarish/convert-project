import axios from "axios";
import { config } from "./config";

const incomes = axios.create({
	baseURL: "http://localhost:3500/api/v1/incomes"
});

async function getIncomes() {
	try {
		const res = await incomes.get('/', config);
		return res.data;
	} catch (err) {console.log(err)};
};

async function postIncome(body) {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		jsonAccount.income_name = jsonAccount.income_name.trim();
		const res = await incomes.post('/', jsonAccount, config);
		return res;
	} catch (err) {return err};
};

async function putIncome(id, body) {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		jsonAccount.income_name = jsonAccount.income_name.trim();
		const res = await incomes.put(`/${id}`, jsonAccount, config);
		return res;
	} catch (err) {return err};
};

async function deleteIncome(id) {
	try {
		const res = await incomes.delete(`/${id}`, config);
		return res;
	} catch (err) {return err};
};

export { getIncomes, postIncome, putIncome, deleteIncome };