import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { DataContext } from '../../context/DataContext';
import { message } from 'antd';
import './ExpenseTable.css';

const ExpenseTable = () => {

	const { token, setLoad } = useContext(GlobalContext);
	const {
		expenses,
		setExpenses,
		setModal,
		setModalAdd,
		setModalForm,
		modalInput,
		setModalInput,
		getExpenses,
		deleteExpense
	} = useContext(DataContext);

	useEffect(() => {
		const getData = async () => {
			const data = await getExpenses(token);
			if (data) {
				setExpenses(data);
			};
		};
		getData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	const handleEditModal = (id, name) => {
		setModal(true);
		setModalAdd(false);
		setModalForm('minus');
		setModalInput({...modalInput, expense_id: id, expense_name: name});
	};

	const handleDelete = async (id) => {
		setLoad(true);
		const res = await deleteExpense(id, token);
		if (res.response) {
			message.error(res.response.data.message);
			setLoad(false);
		} else {
			const data = await getExpenses(token);
			if (data) {
				setExpenses(data);
			};
			message.success('Expense category successfully deleted!');
			setLoad(false);
			setModal(false);
		};
	};

	const Render = ({ data }) => {
		return (
			<div className="id">
				<div className="name">{data.expense_name}</div>
				<button className="edit" onClick={() => handleEditModal(
					data.expense_id,
					data.expense_name
				)}>Edit</button>
				<button className="delete" onClick={() => handleDelete(data.expense_id)}>Delete</button>
			</div>
		);
	};

	return (
		<div className="card">
			<span>Expense Category</span>
			<div className="data">
				{expenses.length !== 0 ? expenses.map(item => <Render data={item} key={item.expense_id} />) : <div className='no-data'>No Data</div>}
			</div>
		</div>
	);
};

export default ExpenseTable;