import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const CategoryModal = () => {

	const {
		setIncomes,
		setExpenses,
		modal,
		setModal,
		modalType,
		modalAdd,
		modalForm,
		modalInput,
		setModalInput,
		getIncomes,
		getExpenses,
		postIncome,
		postExpense,
		putIncome,
		putExpense
	} = useContext(GlobalContext);
	const styleModal = {
		opacity: '1',
		top: '50%',
		transform: 'translate(-50%, -50%) scale(1)',
		transition: 'opacity 0.2s ease-in-out, top 0s ease-in-out, transform 0.2s ease-in-out'
	};

	const handleSubmit = async (e) => {

		e.preventDefault();
		const formCategory = new FormData(e.target);

		if (modalAdd && modalForm === 'plus') {
			const res = await postIncome(formCategory);
			if (res.response) {
				alert(res.response.data.message);
			} else {
				const data = await getIncomes();
				setIncomes(data);
				setModal(false);
			};
		} else if (modalAdd && modalForm === 'minus') {
			const res = await postExpense(formCategory);
			if (res.response) {
				alert(res.response.data.message);
			} else {
				const data = await getExpenses();
				setExpenses(data);
				setModal(false);
			};
		} else if (!modalAdd && modalForm === 'plus') {
			const res = await putIncome(modalInput.income_id, formCategory);
			if (res.response) {
				alert(res.response.data.message);
			} else {
				const data = await getIncomes();
				setIncomes(data);
				setModal(false);
			};
		} else if (!modalAdd && modalForm === 'minus') {
			const res = await putExpense(modalInput.expense_id, formCategory);
			if (res.response) {
				alert(res.response.data.message);
			} else {
				const data = await getExpenses();
				setExpenses(data);
				setModal(false);
			};
		};
	};

	return (
		<div className='modal' style={(modal && (modalType === 'category')) ? styleModal : {}}>

			<button onClick={() => setModal(false)}>{'\u2716'}</button>

			<div className="form-header">
				{(modalAdd && modalForm === 'plus')
				? 'Add Income:'
				: (modalAdd && modalForm === 'minus')
				? 'Add Expense:'
				: (!modalAdd && modalForm === 'plus')
				? 'Edit Income:'
				: (!modalAdd && modalForm === 'minus')
				&& 'Edit Expense:'}
			</div>

			<form onSubmit={handleSubmit}>

				{modalForm === 'plus' && (
					<label>
					Name:
						<input
							type="text"
							name='income_name'
							autoComplete='name'
							value={modalInput.income_name}
							onChange={(e) => setModalInput({...modalInput, income_name: e.target.value})}
						/>
					</label>
				)}

				{modalForm === 'minus' && (
					<label>
					Name:
						<input
							type="text"
							name='expense_name'
							autoComplete='name'
							value={modalInput.expense_name}
							onChange={e => setModalInput({...modalInput, expense_name: e.target.value})}
						/>
					</label>
				)}

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

export default CategoryModal;