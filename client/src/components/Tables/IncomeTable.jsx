import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { DataContext } from '../../context/DataContext';
import { message } from 'antd';
import './IncomeTable.css';

const IncomeTable = () => {

	const { token, setLoad } = useContext(GlobalContext);
	const {
		incomes,
		setIncomes,
		setModal,
		setModalAdd,
		setModalForm,
		modalInput,
		setModalInput,
		getIncomes,
		deleteIncome
	} = useContext(DataContext);

	useEffect(() => {
		const getData = async () => {
			const data = await getIncomes(token);
			if (data) {
				setIncomes(data);
			};
		};
		getData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	const handleEditModal = (id, name) => {
		setModal(true);
		setModalAdd(false);
		setModalForm('plus');
		setModalInput({...modalInput, income_id: id, income_name: name});
	};

	const handleDelete = async (id) => {
		setLoad(true);
		const res = await deleteIncome(id, token);
		if (res.response) {
			message.error(res.response.data.message);
			setLoad(false);
		} else {
			const data = await getIncomes(token);
			if (data) {
				setIncomes(data);
			};
			message.success('Income category successfully deleted!');
			setLoad(false);
			setModal(false);
		};
	};

	const Render = ({ data }) => {
		return (
			<div className="id">
				<div className="name">{data.income_name}</div>
				<button className="edit" onClick={() => handleEditModal(
					data.income_id,
					data.income_name
				)}>Edit</button>
				<button className="delete" onClick={() => handleDelete(data.income_id)}>Delete</button>
			</div>
		);
	};

	return (
		<div className="card">
			<span>Income Category</span>
			<div className="data">
				{incomes.length !== 0 ? incomes.map(item => <Render data={item} key={item.income_id} />) : <div className='no-data'>No Data</div>}
			</div>
		</div>
	);
};

export default IncomeTable;