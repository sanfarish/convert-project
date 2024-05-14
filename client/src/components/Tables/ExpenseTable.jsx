import { useContext, useEffect } from 'react';
import { DataContext } from '../../context/DataContext';
import './ExpenseTable.css'

const ExpenseTable = () => {

	const {
		token,
		expenses,
		setExpenses,
		setModal,
		setModalAdd,
		setModalForm,
		modalInput,
		setModalInput,
		setLoad,
		getExpenses,
		deleteExpense
	} = useContext(DataContext);

	useEffect(() => {
		const getData = async () => {
			const data = await getExpenses(token);
			setExpenses(data);
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
			alert(res.response.data.message);
			setLoad(false);
		} else {
			const data = await getExpenses(token);
			setExpenses(data);
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
				{expenses ? expenses.map(item => <Render data={item} key={item.expense_id} />) : <div className='no-data'>No Data</div>}
			</div>
		</div>
	);
};

export default ExpenseTable;