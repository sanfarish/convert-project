import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { DataContext } from '../../context/DataContext';
import { message } from 'antd';
import './AccountTable.css';

const AccountTable = () => {

	const { token, setLoad } = useContext(GlobalContext);
	const {
		accounts,
		setAccounts,
		setModal,
		setModalAdd,
		setModalForm,
		modalInput,
		setModalInput,
		getAccounts,
		deleteAccount
	} = useContext(DataContext);

	useEffect(() => {
		const getData = async () => {
			const data = await getAccounts(token);
			if (data) {
				setAccounts(data);
			};
		};
		getData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	const handleColor = (balance) => {
		if (balance > 0) {
			return { color: '#1454DC' };
		} else if (balance < 0) {
			return { color: 'crimson' };
		} else {
			return { color: 'white' };
		};
	};

	const handleEditModal = (id, name, bal) => {
		setModal(true);
		setModalAdd(false);
		setModalForm(bal > 0 ? 'plus' : bal < 0 ? 'minus' : 'empty');
		setModalInput({...modalInput, account_id: id, account_name: name});
	};

	const handleDelete = async (id) => {
		setLoad(true);
		const res = await deleteAccount(id, token);
		if (res.response) {
			message.error(res.response.data.message);
			setLoad(false);
		} else {
			const data = await getAccounts(token);
			if (data) {
				setAccounts(data);
			};
			message.success('Account successfully deleted!');
			setLoad(false);
			setModal(false);
		};
	};

	const Render = ({ id, name, bal }) => {
		return (
			<div className='id'>
				<div className="name">{name}</div>
				<div className="balance" style={handleColor(bal)}>Rp {(bal < 0 ? bal * -1 : bal).toLocaleString()},-</div>
				<button className="edit" onClick={() => handleEditModal(id, name, bal)}>Edit</button>
				<button className="delete" onClick={() => {handleDelete(id)}}>Delete</button>
			</div>
		);
	};

	return (
		<div className="card">
			<div className="data">
				{accounts.length !== 0 ? accounts.map(item => 
					<Render
						id={item.account_id}
						name={item.account_name}
						bal={item.account_balance}
						key={item.account_id}
					/>
				) : <div className='no-data'>No Data</div>}
			</div>
		</div>
	);
};

export default AccountTable;