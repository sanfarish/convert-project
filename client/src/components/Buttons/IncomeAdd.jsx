import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import './IncomeAdd.css';

const IncomeAdd = () => {

	const {
		setModal,
		setModalAdd,
		setModalForm,
		modalInput,
		setModalInput,
	} = useContext(DataContext);

	const handleAdd = () => {
		setModal(true);
		setModalAdd(true);
		setModalForm('plus');
		setModalInput({...modalInput, income_name: ''});
	};

	return <button className='card' onClick={handleAdd}>ADD INCOME CATEGORY</button>;
};

export default IncomeAdd;