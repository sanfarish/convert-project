import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const IncomeAdd = () => {

	const {
		setModal,
		setModalType,
		setModalAdd,
		setModalForm,
		modalInput,
		setModalInput,
	} = useContext(GlobalContext);

	const handleAdd = () => {
		setModal(true);
		setModalType('category');
		setModalAdd(true);
		setModalForm('plus');
		setModalInput({...modalInput, income_name: ''});
	};

	return (
		<div className="income-btn">
			<button onClick={handleAdd}>Add Income Category</button>
		</div>
	);
};

export default IncomeAdd;