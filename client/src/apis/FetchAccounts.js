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

async function postAccount(body) {
	try {
		const res = await accounts.post('/', {
			account_name: body,
			account_balance: 0
		});
		return res.data.data;
	} catch (err) {console.log(err)};
};

async function putAccount(body, id) {
	try {
		const res = await accounts.put(`/${id}`, {
			account_name: body
		});
		return res.data.data;
	} catch (err) {console.log(err)};
};

async function deleteAccount(id) {
	try {
		const res = await accounts.delete(`/${id}`);
		return res.data.data;
	} catch (err) {console.log(err)};
};

export { getAccounts, postAccount, putAccount, deleteAccount };