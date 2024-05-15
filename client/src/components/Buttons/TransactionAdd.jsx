import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import './TransactionAdd.css';

const TransactionAdd = () => {

	const {
		setModal,
		setModalAdd,
		setModalForm,
		modalInput,
		setModalInput,
		inputFile
	} = useContext(DataContext);

	const datetimeFormat = (date) => {
		let local = new Date(date);
		let offset = local.getTimezoneOffset();
		let utc = new Date(local.getTime() - offset * 60000).toISOString().slice(0, 16);
		return utc;
	};

	const handleAdd = () => {
		setModal(true);
		setModalAdd(true);
		setModalForm('minus');
		setModalInput({
			...modalInput,
			transaction_time: datetimeFormat(new Date()),
			id_account: '',
			id_income: '',
			id_expense: '',
			id_transfer: '',
			transaction_amount: '',
			transaction_note: '',
			transaction_bill: '',
			transaction_image: ''
		});
		if (inputFile.current) {
			inputFile.current.value = '';
			inputFile.current.type = 'text';
			inputFile.current.type = 'file';
		};
	};

	return <button className='card' onClick={handleAdd}>ADD TRANSACTION</button>;
}

export default TransactionAdd