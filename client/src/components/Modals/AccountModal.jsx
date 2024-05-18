import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { DataContext } from '../../context/DataContext';
import { message } from 'antd';
import './AccountModal.css';

const AccountModal = () => {

	const { token, setLoad } = useContext(GlobalContext);
	const {
		setAccounts,
		modal,
		setModal,
		modalAdd,
		modalInput,
		setModalInput,
		getAccounts,
		postAccount,
		putAccount
	} = useContext(DataContext);
	const styleModal = {
		top: '50%',
        transition: 'top 400ms ease-out'
	};

	const handleSubmit = async (e) => {

		e.preventDefault();
		setLoad(true);
		const formAccount = new FormData(e.target);
	
		if (modalAdd) {
			const res = await postAccount(formAccount, token);
			if (res.response) {
				message.error(res.response.data.message);
				setLoad(false);
			} else {
				const data = await getAccounts(token);
				if (data) {
					setAccounts(data);
				};
				message.success('New account added!');
				setLoad(false);
				setModal(false);
			};
		} else {
			const res = await putAccount(modalInput.account_id, formAccount, token);
			if (res.response) {
				message.error(res.response.data.message);
				setLoad(false);
			} else {
				const data = await getAccounts(token);
				if (data) {
					setAccounts(data);
				};
				message.success('Account successfully updated!');
				setLoad(false);
				setModal(false);
			};
		};
	};

	return (
		<div className='modal acc' style={modal ? styleModal : {}}>

			<button onClick={() => setModal(false)}>{'\u2716'}</button>

			<div className="form-header">
				{modalAdd ? 'Add Account:' : 'Edit Account:'}
			</div>

			<form onSubmit={handleSubmit}>

				<label>
					Name:
					<input
						type="text"
						name='account_name'
						autoComplete='name'
						value={modalInput.account_name}
						onChange={(e) => setModalInput({...modalInput, account_name: e.target.value})}
					/>
				</label>

				<button type='submit'>{modalAdd ? 'Add' : 'Save'}</button>
			</form>
		</div>
	);
};

export default AccountModal;