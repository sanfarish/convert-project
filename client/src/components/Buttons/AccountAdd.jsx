import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const AccountAdd = () => {

	const {
		setModal,
		setModalType,
		setModalAdd,
		setModalForm,
		modalInput,
		setModalInput
	} = useContext(GlobalContext);

	const handleAdd = () => {
		setModal(true);
		setModalType('accounts');
		setModalAdd(true);
		setModalForm('empty');
		setModalInput({...modalInput, account_name: ''});
	};

	return (
		<div className="add-btn">
			<button onClick={handleAdd}>Add Account</button>
			<div className="add-notes">
				Notes: cannot add/edit balance, only add/edit account name!
			</div>
		</div>
	);
};

export default AccountAdd;