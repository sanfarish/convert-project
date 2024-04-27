import { useContext, useEffect } from 'react';
import { TransactionsContext } from '../../context/TransactionsContext';

function TableTransactions() {

	const {
		transactions,
		setPopup,
		setPopupAdd,
		setFormType,
		setPopupInput,
		accounts,
		datetimeFormat,
		getTransactionsData,
		deleteTransactionData,
		putAccountData
	} = useContext(TransactionsContext);

	useEffect(() => {
		getTransactionsData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const days = (day) => {
		const arr = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
		return arr[new Date(day).getDay()];
	};

	function Dates({ Time }) {
		const time = new Date(Time);
		return(
			<>{time.getDate()}/{time.getMonth() + 1}/{time.getFullYear()}</>
		);
	};

	const editPopup = (item) => {
		setPopupInput({...item, transaction_id: item.transaction_id, transaction_time: datetimeFormat(item.transaction_time)});
		setFormType(item.id_income !== '' ? 'income' : item.id_expense !== '' ? 'expense' : item.id_transfer !== '' && 'transfer');
		setPopupAdd(false);
		setPopup(true);
	};

	const handleDelete = (key) => {

		const formTrans = new FormData();

		if (key.id_income !== '') {
			const sum = accounts.find(item => item.account_id === key.id_account).account_balance - key.transaction_amount;
			formTrans.append('account_balance', sum);
			putAccountData(key.id_account, formTrans);
		}

		else if (key.id_expense !== '') {
			const sum = accounts.find(item => item.account_id === key.id_account).account_balance + key.transaction_amount;
			formTrans.append('account_balance', sum);
			putAccountData(key.id_account, formTrans);
		}

		else if (key.id_transfer !== '') {
			const sum = accounts.find(item => item.account_id === key.id_account).account_balance + key.transaction_amount;
			formTrans.append('account_balance', sum);
			putAccountData(key.id_account, formTrans);
			const sum2 = accounts.find(item => item.account_id === key.id_transfer).account_balance - key.transaction_amount;
			formTrans.set('account_balance', sum2);
			putAccountData(key.id_transfer, formTrans);
		};
		deleteTransactionData(key.transaction_id);
	};

	function Render({ Title, Item }) {
		return(
			<>
				<div className={`id ${Title}`}>
                    <div className="day">{days(Item.transaction_time)}</div>
                    <div className="date"><Dates Time={Item.transaction_time} /></div>
                    <div className="category">{
						Item.id_income !== ''
						? Item.income_name
						: Item.id_expense
						? Item.expense_name
						: Item.id_transfer
						&& `${Item.account_name} \u2192 ${Item.transfer_name}`
					}</div>
                    <div className="note">{Item.transaction_note}</div>
                    <div className="amount">Rp {Item.transaction_amount.toLocaleString()},-</div>
                    <div className="account">
						{(Item.id_income !== '' || Item.id_expense !== '') && Item.account_name}
					</div>
                    <div className="edit-wrapper">
                        <button className="edit-btn" onClick={() => editPopup(Item)}>Edit</button>
                    </div>
                    <div className="del-wrapper">
                        <button className="del-btn" onClick={() => handleDelete(Item)}>Delete</button>
                    </div>
                </div>
                <div className="space"></div>
			</>
		);
	};

	return (
		transactions && transactions.map(item => {
			return(
				item.id_income !== ''
				? <Render Title="income" Item={item} key={item.transaction_id} />
				: item.id_expense !== ''
				? <Render Title="expense" Item={item} key={item.transaction_id} />
				: item.id_transfer !== ''
				&& <Render Title="transfer" Item={item} key={item.transaction_id} />
			);
		})
	);
};

export default TableTransactions;