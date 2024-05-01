import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const ExpenseAdd = () => {

	const {
		setModal,
		setModalType,
		setModalAdd,
		setModalForm,
		modalInput,
		setModalInput,
	} = useContext(GlobalContext);

	const handleAdd = () => {
		setModal(true);
		setModalType('category');
		setModalAdd(true);
		setModalForm('minus');
		setModalInput({...modalInput, expense_name: ''});
	};

	return (
		<div className="expense-btn">
			<button onClick={handleAdd}>Add Expense Category</button>
		</div>
	);
};

export default ExpenseAdd;