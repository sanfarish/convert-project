import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const AccountSum = () => {

	const { accounts } = useContext(GlobalContext);
	const [assets, setAssets] = useState(0);
	const [liabilities, setLiabilities] = useState(0);

	useEffect(() => {
		setAssets(0);
		setLiabilities(0);
		accounts && accounts.forEach(item => {
			if (item.account_balance > 0) {
				setAssets(prev => prev + item.account_balance);
			} else if (item.account_balance < 0) {
				setLiabilities(prev => prev + (item.account_balance * -1));
			};
		});
	}, [accounts]);

	return (
		<div className="summary">
			<div className="sum-in">
				Assets
				<span>Rp {assets.toLocaleString()},-</span>
			</div>
			<div className="sum-out">
				Liabilities
				<span>Rp {liabilities.toLocaleString()},-</span>
			</div>
			<div>
				Total
				<span>Rp {(assets - liabilities).toLocaleString()},-</span>
			</div>
		</div>
	);
};

export default AccountSum;