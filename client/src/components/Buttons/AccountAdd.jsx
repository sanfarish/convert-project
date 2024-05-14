import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import './AccountAdd.css';

const AccountAdd = () => {

	const {
		setModal,
		setModalAdd,
		setModalForm,
		modalInput,
		setModalInput
	} = useContext(DataContext);

	const handleAdd = () => {
		setModal(true);
		setModalAdd(true);
		setModalForm('empty');
		setModalInput({...modalInput, account_name: ''});
	};

	return <button className='card' onClick={handleAdd}>ADD ACCOUNT</button>;
};

export default AccountAdd;