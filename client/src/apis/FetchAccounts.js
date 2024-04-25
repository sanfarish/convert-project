import axios from "axios";

const accounts = axios.create({
	baseURL: "http://localhost:3500/api/v1/accounts"
});

async function getAccounts() {
	try {
		const res = await accounts.get('/');
		return res.data;
	} catch (err) {console.log(err)};
};

async function getAccount(id) {
	try {
		const res = await accounts.get(`/${id}`);
		return res.data;
	} catch (err) {console.log(err)};
};

async function postAccount(body) {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		const res = await accounts.post('/', jsonAccount);
		return res.data.data;
	} catch (err) {console.log(err)};
};

async function putAccount(id, body) {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		const res = await accounts.put(`/${id}`, jsonAccount);
		return res.data.data;
	} catch (err) {console.log(err)};
};

async function deleteAccount(id) {
	try {
		const res = await accounts.delete(`/${id}`);
		return res.data.data;
	} catch (err) {console.log(err)};
};

export { getAccounts, getAccount, postAccount, putAccount, deleteAccount };