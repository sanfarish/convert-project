import { useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { DataContext } from '../../context/DataContext';
import { message } from 'antd';
import './CategoryModal.css';

const CategoryModal = () => {

	const { token, setLoad } = useContext(GlobalContext);
	const {
		setIncomes,
		setExpenses,
		modal,
		setModal,
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
	} = useContext(DataContext);
	const [colors, setColors] = useState({ background: 'rgb(10, 10, 10)', color: 'white' });
	const styleModal = {
		top: '50%',
        transition: 'top 400ms ease-out'
	};

	const handleHover = () => {
		if (modalForm === 'plus') {
			setColors({ background: '#1454DC', color: 'white' })
		} else if (modalForm === 'minus') {
			setColors({ background: 'crimson', color: 'white' })
		} else if (modalForm === 'empty') {
			setColors({ background: 'white', color: 'black' })
		};
	};

	const handleLeftHover = () => {
		setColors({ background: 'rgb(10, 10, 10)', color: 'white' })
	};

	const handleSubmit = async (e) => {

		e.preventDefault();
		setLoad(true);
		const formCategory = new FormData(e.target);

		if (modalAdd && modalForm === 'plus') {
			const res = await postIncome(formCategory, token);
			if (res.response) {
				message.error(res.response.data.message);
				setLoad(false);
			} else {
				const data = await getIncomes(token);
				if (data) {
					setIncomes(data);
				};
				message.success('New income category added!');
				setLoad(false);
				setModal(false);
			};
		} else if (modalAdd && modalForm === 'minus') {
			const res = await postExpense(formCategory, token);
			if (res.response) {
				message.error(res.response.data.message);
				setLoad(false);
			} else {
				const data = await getExpenses(token);
				if (data) {
					setExpenses(data);
				};
				message.success('New expense category added!');
				setLoad(false);
				setModal(false);
			};
		} else if (!modalAdd && modalForm === 'plus') {
			const res = await putIncome(modalInput.income_id, formCategory, token);
			if (res.response) {
				message.error(res.response.data.message);
				setLoad(false);
			} else {
				const data = await getIncomes(token);
				if (data) {
					setIncomes(data);
				};
				message.success('Income category successfully updated!');
				setLoad(false);
				setModal(false);
			};
		} else if (!modalAdd && modalForm === 'minus') {
			const res = await putExpense(modalInput.expense_id, formCategory, token);
			if (res.response) {
				message.error(res.response.data.message);
				setLoad(false);
			} else {
				const data = await getExpenses(token);
				if (data) {
					setExpenses(data);
				};
				message.success('Expense category successfully updated!');
				setLoad(false);
				setModal(false);
			};
		};
	};

	return (
		<div className='modal cat' style={modal ? styleModal : {}}>

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

				{modalForm === 'plus' &&
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
				}

				{modalForm === 'minus' &&
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
				}

				<button
					type='submit'
					style={colors}
					onMouseEnter={handleHover}
					onMouseLeave={handleLeftHover}
				>{modalAdd ? 'Add' : 'Save'}</button>
			</form>
		</div>
	);
};

export default CategoryModal;