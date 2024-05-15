import axios from "axios";
import { config, hostTarget } from "./config";

const transactions = axios.create({
	baseURL: `${hostTarget}/transactions`
});

const getTransactions = async (token) => {
	try {
		const res = await transactions.get('/', config(token));
		return res.data;
	} catch (err) {console.log(err)};
};

const postTransaction = async (body, token) => {
	try {
		const res = await transactions.post('/', body, config(token));
		return res;
	} catch (err) {return err};
};

const putTransaction = async (id, body, token) => {
	try {
		const res = await transactions.put(`/${id}`, body, config(token));
		return res;
	} catch (err) {return err};
};

const deleteTransaction = async (id, token) => {
	try {
		const res = await transactions.delete(`/${id}`, config(token));
		return res;
	} catch (err) {return err};
};

export { getTransactions, postTransaction, putTransaction, deleteTransaction };