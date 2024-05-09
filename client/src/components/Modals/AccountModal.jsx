import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const AccountModal = () => {

	const {
		token,
		setAccounts,
		modal,
		setModal,
		modalType,
		modalAdd,
		modalForm,
		modalInput,
		setModalInput,
		setLoad,
		getAccounts,
		postAccount,
		putAccount
	} = useContext(GlobalContext);
	const styleModal = {
		opacity: '1',
		top: '50%',
		transform: 'translate(-50%, -50%) scale(1)',
		transition: 'opacity 0.2s ease-in-out, top 0s ease-in-out, transform 0.2s ease-in-out'
	};

	const handleSubmit = async (e) => {

		e.preventDefault();
		setLoad(true);
		const formAccount = new FormData(e.target);
	
		if (modalAdd) {
			const res = await postAccount(formAccount, token);
			if (res.response) {
				alert(res.response.data.message);
				setLoad(false);
			} else {
				const data = await getAccounts(token);
				setAccounts(data);
				setLoad(false);
				setModal(false);
			};
		} else {
			const res = await putAccount(modalInput.account_id, formAccount, token);
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
	};

	return (
		<div className='modal' style={(modal && (modalType === 'accounts')) ? styleModal : {}}>

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

				<button
				type='submit'
					style={
						modalForm === 'plus'
						? {backgroundColor: '#1999FC'}
						: modalForm === 'minus'
						? {backgroundColor: '#FF6255'}
						: modalForm === 'empty'
						&& {backgroundColor: '#888888'}
					}
				>{modalAdd ? 'Add' : 'Save'}</button>
			</form>
		</div>
	);
};

export default AccountModal;