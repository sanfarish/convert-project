import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import './IncomeAdd.css';

const IncomeAdd = () => {

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
		setModalForm('plus');
		setModalInput({...modalInput, income_name: ''});
	};

	return <button className='card' onClick={handleAdd}>ADD INCOME CATEGORY</button>;
};

export default IncomeAdd;