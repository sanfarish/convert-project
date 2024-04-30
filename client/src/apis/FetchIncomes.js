import axios from "axios";

const incomes = axios.create({
	baseURL: "http://localhost:3500/api/v1/incomes"
});

const token = 'Mariana';
// eslint-disable-next-line no-unused-vars
const tokenTest = 'Test';

const config = {
	headers: { Authorization: `Bearer ${token}` }
};

async function getIncomes() {
	try {
		const res = await incomes.get('/', config);
		return res.data;
	} catch (err) {console.log(err)};
};

async function getIncome(id) {
	try {
		const res = await incomes.get(`/${id}`);
		return res.data;
	} catch (err) {console.log(err)};
};

async function postIncome(body) {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		const res = await incomes.post('/', jsonAccount);
		return res.data.data;
	} catch (err) {console.log(err)};
};

async function putIncome(id, body) {
	try {
		const jsonAccount = Object.fromEntries(body.entries());
		const res = await incomes.put(`/${id}`, jsonAccount);
		return res.data.data;
	} catch (err) {console.log(err)};
};

async function deleteIncome(id) {
	try {
		const res = await incomes.delete(`/${id}`);
		return res.data.data;
	} catch (err) {console.log(err)};
};

export { getIncomes, getIncome, postIncome, putIncome, deleteIncome };