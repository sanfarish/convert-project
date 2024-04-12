import { Fragment, useContext, useEffect } from 'react';
import { TransactionsContext } from '../../context/TransactionsContext';

function TableTransactions() {

	const { transactions, getTransactionsData } = useContext(TransactionsContext);

	useEffect(() => {
		getTransactionsData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function days(day) {
		switch (day.getDay()) {
			case 0: return('Minggu');
			case 1: return('Senin')
			case 2: return('Selasa');
			case 3: return('Rabu');
			case 4: return('Kamis');
			case 5: return('Jumat');
			case 6: return('Sabtu');
			default: return null;
		};
	};

	function Dates({ Time }) {
		return(
			<>
			{Time.getDate()}/
			{Time.getMonth() + 1}/
			{Time.getFullYear()}
			</>
		);
	};

	function Render({ Title, Item, Time }) {
		return(
			<>
				<div className={`id ${Title}`}>
                    <div className="day">{days(Time)}</div>
                    <div className="date"><Dates Time={Time} /></div>
                    <div className="category">
						{
							(
								Item.id_income !== ''
							) ? (
								Item.income_name
							) : (
								Item.id_expense
							) ? (
								Item.expense_name
							) : (
								Item.id_transfer
							) && (
								`${Item.account_name} → ${Item.transfer_name}`
							)
						}
					</div>
                    <div className="note">{Item.transaction_note}</div>
                    <div className="amount">Rp {Item.transaction_amount.toLocaleString()},-</div>
                    <div className="account">
						{(Item.id_income !== '' || Item.id_expense !== '') && Item.account_name}
					</div>
                    {/* <div className="edit-wrapper">
                        <button className="edit-btn" onclick="editPopup(
                            '${item.transaction_time}',
                            '${item.id_acc}',
                            '${item.id_inc}',
                            '${item.id_exp}',
                            '${item.id_tra}',
                            '${item.transaction_amount}',
                            '${item.transaction_note}',
                            '${item.transaction_id}'
                        )">Edit</button>
                    </div> */}
                    {/* <div className="del-wrapper">
                        <button className="del-btn" onclick="deleteTransaction(
                            '${item.transaction_id}',
                            '${item.id_acc}',
                            '${item.id_inc}',
                            '${item.id_exp}',
                            '${item.id_tra}',
                            '${item.transaction_amount}'
                            )">Delete</button>
                    </div> */}
                    <div className="edit-wrapper">
                        <button className="edit-btn">Edit</button>
                    </div>
                    <div className="del-wrapper">
                        <button className="del-btn">Delete</button>
                    </div>
                </div>
                <div className="space"></div>
			</>
		);
	};

	return (
		transactions.map(item => {
			return(
				(
					item.id_income !== ''
				) ? (
					<Render
						Title="income"
						Item={item}
						Time={new Date(item.transaction_time)}
						key={item.transaction_id}
					/>
				) : (
					item.id_expense !== ''
				) ? (
					<Render
						Title="expense"
						Item={item}
						Time={new Date(item.transaction_time)}
						key={item.transaction_id}
					/>
				) : (
					item.id_transfer !== ''
				) && (
					<Render
						Title="transfer"
						Item={item}
						Time={new Date(item.transaction_time)}
						key={item.transaction_id}
					/>
				)
			);
		})
	);
};

export default TableTransactions;