import { createContext, useState } from "react";
import { getIncomes, postIncome, putIncome, deleteIncome } from "../apis/FetchIncomes";
import { getExpenses, postExpense, putExpense, deleteExpense } from "../apis/FetchExpenses";
import { getTransactions } from '../apis/FetchTransactions';

const CategoriesContext = createContext();

const CategoriesContextProvider = (props) => {

	const [incomes, setIncomes] = useState([]);
	const [expenses, setExpenses] = useState([]);
	const [popup, setPopup] = useState(false);
	const [popupType, setPopupType] = useState('');
	const [popupCategory, setPopupCategory] = useState('');
	const [popupInput, setPopupInput] = useState('');
	const [updateID, setUpdateID] = useState('');
	const [transactions, setTransactions] = useState([]);

	async function getIncomesData() {
		const data = await getIncomes();
		setIncomes(data);
	};

	async function getExpensesData() {
		const data = await getExpenses();
		setExpenses(data);
	};

	const postIncomeData = async(name) => {
		await postIncome(name);
		await getIncomesData();
	};

	const postExpenseData = async(name) => {
		await postExpense(name);
		await getExpensesData();
	};

	const putIncomeData = async(name, id) => {
		await putIncome(name, id);
		await getIncomesData();
	};

	const putExpenseData = async(name, id) => {
		await putExpense(name, id);
		await getExpensesData();
	};

	const deleteIncomeData = async(id) => {
		await deleteIncome(id);
		await getIncomesData();
	};

	const deleteExpenseData = async(id) => {
		await deleteExpense(id);
		await getExpensesData();
	};

	const getTransactionsData = async() => {
		const data = await getTransactions();
		setTransactions(data);
	};

	return (
		<CategoriesContext.Provider value={{
			incomes,
			setIncomes,
			expenses,
			setExpenses,
			popup,
			setPopup,
			popupType,
			setPopupType,
			popupCategory,
			setPopupCategory,
			popupInput,
			setPopupInput,
			updateID,
			setUpdateID,
			getIncomesData,
			getExpensesData,
			postIncomeData,
			postExpenseData,
			putIncomeData,
			putExpenseData,
			deleteIncomeData,
			deleteExpenseData,
			transactions,
			getTransactionsData
		}}>
			{props.children}
		</CategoriesContext.Provider>
	);

};

export { CategoriesContext, CategoriesContextProvider };