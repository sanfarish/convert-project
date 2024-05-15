import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import './AccountSum.css';

const AccountSum = () => {

	const { accounts } = useContext(DataContext);
	const [assets, setAssets] = useState(0);
	const [liabilities, setLiabilities] = useState(0);

	useEffect(() => {
		setAssets(0);
		setLiabilities(0);
		accounts.length !== 0 && accounts.forEach(item => {
			if (item.account_balance > 0) {
				setAssets(prev => prev + item.account_balance);
			} else if (item.account_balance < 0) {
				setLiabilities(prev => prev + (item.account_balance * -1));
			};
		});
	}, [accounts]);

	return (
		<div className="card">
			<div className="sum">
				<span>Assets</span>
				<span>Rp {assets.toLocaleString()},-</span>
			</div>
			<div className="sum">
				<span>Liabilities</span>
				<span>Rp {liabilities.toLocaleString()},-</span>
			</div>
			<div className='sum'>
				<span>Total</span>
				<span>Rp {(assets - liabilities).toLocaleString()},-</span>
			</div>
		</div>
	);
};

export default AccountSum;