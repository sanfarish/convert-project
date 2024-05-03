import axios from "axios";
import { config } from "./config";

const accounts = axios.create({
	baseURL: "http://localhost:3500/api/v1/accounts"
});

const getAccounts = async () => {
	try {
		const res = await accounts.get('/', config);
		return res.data;
	} catch (err) {console.log(err)};
};

const postAccount = async (body) => {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		jsonAccount.account_name = jsonAccount.account_name.trim();
		const res = await accounts.post('/', jsonAccount, config);
		return res;
	} catch (err) {return err};
};

const putAccount = async (id, body) => {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		jsonAccount.account_name = jsonAccount.account_name.trim();
		const res = await accounts.put(`/${id}`, jsonAccount, config);
		return res;
	} catch (err) {return err};
};

const deleteAccount = async (id) => {
	try {
		const res = await accounts.delete(`/${id}`, config);
		return res;
	} catch (err) {return err};
};

export { getAccounts, postAccount, putAccount, deleteAccount };