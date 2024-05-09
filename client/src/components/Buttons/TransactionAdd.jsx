import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const TransactionAdd = () => {

	const {
		setModal,
		setModalType,
		setModalAdd,
		setModalForm,
		modalInput,
		setModalInput,
		inputFile
	} = useContext(GlobalContext);

	const datetimeFormat = (date) => {
		let local = new Date(date);
		let offset = local.getTimezoneOffset();
		let utc = new Date(local.getTime() - offset * 60000).toISOString().slice(0, 16);
		return utc;
	};

	const handleAdd = () => {
		setModal(true);
		setModalType('transactions');
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

	return (
		<div className="add-btn">
			<button onClick={handleAdd}>Add Transaction</button>
			<div className="add-notes">
				Notes: to edit/delete a transaction, use buttons in the transaction list!
			</div>
		</div>
	)
}

export default TransactionAdd