import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const TransactionTable = () => {

	const {
		transactions,
		setTransactions,
		setModal,
		setModalType,
		setModalAdd,
		setModalForm,
		modalInput,
		setModalInput,
		getTransactions,
		deleteTransaction
	} = useContext(GlobalContext);
	const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

	useEffect(() => {
		const getData = async () => {
			const data = await getTransactions();
			setTransactions(data);
		};
		getData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [localStorage.getItem('accessToken')]);

	const dayDate = (datetime) => days[new Date(datetime).getDay()];

	const dates = (datetime) => {
		const time = new Date(datetime);
		return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
	};

	const datetimeFormat = (date) => {
		let local = new Date(date);
		let offset = local.getTimezoneOffset();
		let utc = new Date(local.getTime() - offset * 60000).toISOString().slice(0, 16);
		return utc;
	};

	const handleEditModal = (item) => {
		setModal(true);
		setModalType('transactions');
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
			transaction_note: item.transaction_note
		});
	};

	const handleDelete = async (id) => {
		const res = await deleteTransaction(id);
		if (res.response) {
			alert(res.response.data.message);
		} else {
			const data = await getTransactions();
			setTransactions(data);
			setModal(false);
		};
	};

	const Render = ({ title, data }) => {
		return (
			<>
				<div className={`id ${title}`}>

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

                    <div className="amount">Rp {data.transaction_amount.toLocaleString()},-</div>

                    <div className="account">
						{(data.id_income !== '' || data.id_expense !== '') && data.account_name}
					</div>

                    <div className="edit-wrapper">
                        <button className="edit-btn" onClick={() => handleEditModal(data)}>Edit</button>
                    </div>

                    <div className="del-wrapper">
                        <button className="del-btn" onClick={() => handleDelete(data.transaction_id)}>Delete</button>
                    </div>
                </div>

                <div className="space"></div>
			</>
		);
	};

	return (
		<div className="table">
			<div className="data">
				{transactions ? transactions.map(item => {
					return(
						item.id_income !== ''
						? <Render title="income" data={item} key={item.transaction_id} />
						: item.id_expense !== ''
						? <Render title="expense" data={item} key={item.transaction_id} />
						: item.id_transfer !== ''
						&& <Render title="transfer" data={item} key={item.transaction_id} />
					);
				})
				: <div className='no-data'>No Data</div>}
			</div>
		</div>
	);
};

export default TransactionTable;