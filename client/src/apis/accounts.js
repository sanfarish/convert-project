import axios from "axios";
import { config, hostTarget } from "./config";

const accounts = axios.create({
	baseURL: `${hostTarget}/accounts`
});

const getAccounts = async (token) => {
	try {
		const res = await accounts.get('/', config(token));
		return res.data;
	} catch (err) {console.log(err)};
};

const postAccount = async (body, token) => {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		jsonAccount.account_name = jsonAccount.account_name.trim();
		const res = await accounts.post('/', jsonAccount, config(token));
		return res;
	} catch (err) {return err};
};

const putAccount = async (id, body, token) => {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		jsonAccount.account_name = jsonAccount.account_name.trim();
		const res = await accounts.put(`/${id}`, jsonAccount, config(token));
		return res;
	} catch (err) {return err};
};

const deleteAccount = async (id, token) => {
	try {
		const res = await accounts.delete(`/${id}`, config(token));
		return res;
	} catch (err) {return err};
};

export { getAccounts, postAccount, putAccount, deleteAccount };