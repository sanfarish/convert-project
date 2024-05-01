import axios from "axios";
import { config } from "./config";

const transactions = axios.create({
	baseURL: "http://localhost:3500/api/v1/transactions"
});

async function getTransactions() {
	try {
		const res = await transactions.get('/', config);
		return res.data;
	} catch (err) {console.log(err)};
};

async function postTransaction(body) {
	try {
		const res = await transactions.post('/', body, config);
		return res;
	} catch (err) {return err};
};

async function putTransaction(id, body) {
	try {
		const res = await transactions.put(`/${id}`, body, config);
		return res;
	} catch (err) {return err};
};

async function deleteTransaction(id) {
	try {
		const res = await transactions.delete(`/${id}`, config);
		return res;
	} catch (err) {return err};
};

export { getTransactions, postTransaction, putTransaction, deleteTransaction };