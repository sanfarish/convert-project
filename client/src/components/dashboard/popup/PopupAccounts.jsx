import { useContext } from 'react';
import { AccountsContext } from '../../../context/AccountsContext';

function PopupAccounts() {
	const { popup, popupInput, popupType, setPopup, setPopupInput } = useContext(AccountsContext);
	function closePopup() {
		setPopup(false);
	};
	function activation() {
		return popup ? "active" : "";
	};
	function handleAddAccount() {
		// postData(accountName);
		setPopup(false);
	};
	return (
		<div className={`popup ${activation()} ${popupType}`}>
			<button id="close-btn" onClick={closePopup}>x</button>
			<div className="form">
				<div className="form-header">
					<header>Add Account:</header>
					<header>Edit Account:</header>
				</div>
				<div className="form-content">
					<div className="form-input">
						<label htmlFor="name">Name:</label>
						<input
							type="text"
							id="name"
							value={popupInput}
							onChange={(e) => setPopupInput(e.target.value)}
							autoComplete='name'
						/>
					</div>
				</div>
				{/* <button id="save-add-btn" onClick={addAccount()}>Add</button> */}
				<button id="save-add-btn" onClick={() => handleAddAccount()}>Add</button>
				<button id="save-edit-btn">Edit</button>
			</div>
		</div>
	);
};

export default PopupAccounts;