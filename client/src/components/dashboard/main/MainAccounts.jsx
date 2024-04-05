import { useContext, useEffect, useState } from 'react';
import { AccountsContext } from '../../../context/AccountsContext';
import TableAccounts from '../../table/TableAccounts';

function MainAccounts() {

	const { accounts, setPopup, setPopupType, setPopupInput, getAccountsData } = useContext(AccountsContext);
	const [assets, setAssets] = useState(0);
	const [liabilities, setLiabilities] = useState(0);
	let aset = 0, beban = 0;

	useEffect(() => {
		Liabilities();
	}, [accounts]);

	useEffect(() => {
		Assets();
	}, [accounts]);

	function addPopup() {
		setPopup(true);
		setPopupType('add');
		setPopupInput('');
	};

	function Assets() {
		accounts.map(item => {
			if (item.account_id !== '') {
				if (item.account_balance > 0) {
					aset += item.account_balance;
				};
			};
			return(aset);
		});
		setAssets(aset);
	};

	function Liabilities() {
		accounts.map(item => {
			if (item.account_id !== '') {
				if (item.account_balance < 0) {
					beban += (item.account_balance * -1);
				};
			};
			return(beban);
		});
		setLiabilities(beban);
	};

	return (
		<main className="main">
			<div className="table">
				<div className="data">
					<TableAccounts />
				</div>
			</div>
			<div className="add">
				<button id="add-btn" onClick={addPopup}>Add Account</button>
				<div className="add-notes">
					Notes: cannot add/edit balance, only add/edit account name!
				</div>
			</div>
			<div className="total">
				<div className="total-in">
					<header>Assets</header>
					<span className="total-assets">Rp {assets.toLocaleString()},-</span>
				</div>
				<div className="total-ex">
					<header>Liabilities</header>
					<span className="total-liabilities">Rp {liabilities.toLocaleString()},-</span>
				</div>
				<div className="total-bal">
					<header>Total</header>
					<span className="total-balance">Rp {(assets - liabilities).toLocaleString()},-</span>
				</div>
			</div>
		</main>
	);
};

export default MainAccounts;