import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const AccountTable = () => {

	const {
		token,
		accounts,
		setAccounts,
		setModal,
		setModalType,
		setModalAdd,
		setModalForm,
		modalInput,
		setModalInput,
		setLoad,
		getAccounts,
		deleteAccount
	} = useContext(GlobalContext);

	useEffect(() => {
		const getData = async () => {
			const data = await getAccounts(token);
			setAccounts(data);
		};
		getData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	const handleEditModal = (id, name, bal) => {
		setModal(true);
		setModalType('accounts');
		setModalAdd(false);
		setModalForm(bal > 0 ? 'plus' : bal < 0 ? 'minus' : 'empty');
		setModalInput({...modalInput, account_id: id, account_name: name});
	};

	const handleDelete = async (id) => {
		setLoad(true);
		const res = await deleteAccount(id, token);
		if (res.response) {
			alert(res.response.data.message);
			setLoad(false);
		} else {
			const data = await getAccounts(token);
			setAccounts(data);
			setLoad(false);
			setModal(false);
		};
	};

	const Render = ({ id, name, bal }) => {
		return (
			<>
				<div className={`id ${bal > 0 ? 'assets' : bal < 0 ? 'liabilities' : 'empty'}`}>
					<div className="account">{name}</div>
					<div className="amount">Rp {(bal < 0 ? bal * -1 : bal).toLocaleString()},-</div>
					<div className="edit-wrapper">
						<button className="edit-btn" onClick={() => handleEditModal(id, name, bal)}>Edit</button>
					</div>
					<div className="del-wrapper">
						<button className="del-btn" onClick={() => {handleDelete(id)}}>Delete</button>
					</div>
				</div>
				<div className="space"></div>
			</>
		);
	};

	return (
		<div className="table">
			<div className="data">
				{accounts ? accounts.map(item => 
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