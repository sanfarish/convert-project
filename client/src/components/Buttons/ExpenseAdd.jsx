import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import './ExpenseAdd.css';

const ExpenseAdd = () => {

	const {
		setModal,
		setModalType,
		setModalAdd,
		setModalForm,
		modalInput,
		setModalInput,
	} = useContext(DataContext);

	const handleAdd = () => {
		setModal(true);
		setModalType('category');
		setModalAdd(true);
		setModalForm('minus');
		setModalInput({...modalInput, expense_name: ''});
	};

	return <button className='card' onClick={handleAdd}>ADD EXPENSE CATEGORY</button>;
};

export default ExpenseAdd;