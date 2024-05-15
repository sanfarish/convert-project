import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { DataContext } from '../../context/DataContext';
import { message } from 'antd';
import './TransactionTable.css';

const TransactionTable = () => {

	const { token, setLoad } = useContext(GlobalContext);
	const {
		transactions,
		setTransactions,
		setModal,
		setModalAdd,
		setModalForm,
		modalInput,
		setModalInput,
		inputFile,
		getTransactions,
		deleteTransaction
	} = useContext(DataContext);
	const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

	useEffect(() => {
		const getData = async () => {
			const data = await getTransactions(token);
			if (data) {
				setTransactions(data);
			};
		};
		getData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	const dayDate = (datetime) => days[new Date(datetime).getDay()];

	const dates = (datetime) => {
		const time = new Date(datetime);
		return `${
			time.getDate().toString().length === 1 ? '0' + time.getDate() : time.getDate()
		}/${
			(time.getMonth() + 1).toString().length === 1 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)
		}/${time.getFullYear()}`;
	};

	const datetimeFormat = (date) => {
		let local = new Date(date);
		let offset = local.getTimezoneOffset();
		let utc = new Date(local.getTime() - offset * 60000).toISOString().slice(0, 16);
		return utc;
	};

	const handleColor = (data) => {
		if (data.id_income !== '') {
			return { color: '#1454DC' };
		} else if (data.id_expense !== '') {
			return { color: 'crimson' };
		} else {
			return { color: 'white' };
		};
	};

	const handleEditModal = (item) => {
		setModal(true);
		setModalAdd(false);
		setModalForm(item.id_income !== '' ? 'plus' : item.id_expense !== '' ? 'minus' : item.id_transfer !== '' && 'empty');
		setModalInput({
			...modalInput,
			transaction_id: item.transaction_id,
			transaction_time: datetimeFormat(item.transaction_time),
			id_account: item.id_account,
			id_income: item.id_income,
			id_expense: item.id_expense,
			id_transfer: item.id_transfer,
			transaction_amount: item.transaction_amount,
			transaction_note: item.transaction_note,
			transaction_bill: '',
			transaction_image: item.transaction_bill
		});
		if (inputFile.current) {
			inputFile.current.value = '';
			inputFile.current.type = 'text';
			inputFile.current.type = 'file';
		};
	};

	const handleDelete = async (id) => {
		setLoad(true);
		const res = await deleteTransaction(id, token);
		if (res.response) {
			message.error(res.response.data.message);
			setLoad(false);
		} else {
			const data = await getTransactions(token);
			if (data) {
				setTransactions(data);
			};
			message.success('Transaction successfully deleted!');
			setLoad(false);
			setModal(false);
		};
	};

	const Render = ({ data }) => {
		return (
			<div className='id'>

				<div className="day">{dayDate(data.transaction_time)}</div>

				<div className="date">{dates(data.transaction_time)}</div>

				<div className="category">{
					data.id_income !== ''
					? data.income_name
					: data.id_expense
					? data.expense_name
					: data.id_transfer
					&& `${data.account_name} \u2192 ${data.transfer_name}`
				}</div>

				<div className="note">{data.transaction_note}</div>

				<div className="amount" style={handleColor(data)}>Rp {data.transaction_amount.toLocaleString()},-</div>

				<div className="account">
					{(data.id_income !== '' || data.id_expense !== '') && data.account_name}
				</div>

				<button className="edit" onClick={() => handleEditModal(data)}>Edit</button>

				<button className="delete" onClick={() => handleDelete(data.transaction_id)}>Delete</button>
			</div>
		);
	};

	return (
		<div className="card">
			<div className="data">
				{transactions.length !== 0 ? transactions.map(item => <Render data={item} key={item.transaction_id} />)
				: <div className='no-data'>No Data</div>}
			</div>
		</div>
	);
};

export default TransactionTable;