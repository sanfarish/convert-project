import axios from "axios";
import { config } from "./config";

const accounts = axios.create({
	baseURL: "http://localhost:3500/api/v1/accounts"
});

async function getAccounts() {
	try {
		const res = await accounts.get('/', config);
		return res.data;
	} catch (err) {console.log(err)};
};

async function postAccount(body) {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		jsonAccount.account_name = jsonAccount.account_name.trim();
		const res = await accounts.post('/', jsonAccount, config);
		return res;
	} catch (err) {return err};
};

async function putAccount(id, body) {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		jsonAccount.account_name = jsonAccount.account_name.trim();
		const res = await accounts.put(`/${id}`, jsonAccount, config);
		return res;
	} catch (err) {return err};
};

async function deleteAccount(id) {
	try {
		const res = await accounts.delete(`/${id}`, config);
		return res;
	} catch (err) {return err};
};

export { getAccounts, postAccount, putAccount, deleteAccount };