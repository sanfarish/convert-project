import axios from "axios";

const incomes = axios.create({
	baseURL: "http://localhost:3500/api/v1/incomes"
});

async function getIncomes() {
	try {
		const res = await incomes.get('/');
		return res.data;
	} catch (err) {console.log(err)};
};

async function getIncome(id) {
	try {
		const res = await incomes.get(`/${id}`);
		return res.data;
	} catch (err) {console.log(err)};
};

async function postIncome(name) {
	try {
		const res = await incomes.post('/', {
			income_name: name
		});
		return res.data.data;
	} catch (err) {console.log(err)};
};

async function putIncome(name, id) {
	try {
		const res = await incomes.put(`/${id}`, {
			income_name: name
		});
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