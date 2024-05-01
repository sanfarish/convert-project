import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const ExpenseTable = () => {

	const {
		expenses,
		setExpenses,
		setModal,
		setModalType,
		setModalAdd,
		setModalForm,
		modalInput,
		setModalInput,
		getExpenses,
		deleteExpense
	} = useContext(GlobalContext);

	useEffect(() => {
		const getData = async () => {
			const data = await getExpenses();
			setExpenses(data);
		};
		getData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleEditModal = (id, name) => {
		setModal(true);
		setModalType('category');
		setModalAdd(false);
		setModalForm('minus');
		setModalInput({...modalInput, expense_id: id, expense_name: name});
	};

	const handleDelete = async (id) => {
		const res = await deleteExpense(id);
		if (res.response) {
			alert(res.response.data.message);
		} else {
			const data = await getExpenses();
			setExpenses(data);
			setModal(false);
		};
	};

	const Render = ({ data }) => {
		return (
			<>
				<div className="id">
					<div className="name">{data.expense_name}</div>
					<div className="edit-wrapper">
						<button className="edit-btn" onClick={() => handleEditModal(
							data.expense_id,
							data.expense_name
						)}>Edit</button>
					</div>
					<div className="del-wrapper">
						<button className="del-btn" onClick={() => handleDelete(data.expense_id)}>Delete</button>
					</div>
				</div>
				<div className="space"></div>
			</>
		);
	};

	return (
		<div className="expense-table">
			Expense Category
			<div className="data">
				{expenses ? expenses.map(item => <Render data={item} key={item.expense_id} />) : <div className='no-data'>No Data</div>}
			</div>
		</div>
	);
};

export default ExpenseTable;