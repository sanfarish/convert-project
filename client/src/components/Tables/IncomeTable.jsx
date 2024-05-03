import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const IncomeTable = () => {

	const {
		incomes,
		setIncomes,
		setModal,
		setModalType,
		setModalAdd,
		setModalForm,
		modalInput,
		setModalInput,
		getIncomes,
		deleteIncome
	} = useContext(GlobalContext);

	useEffect(() => {
		const getData = async () => {
			const data = await getIncomes();
			setIncomes(data);
		};
		getData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [localStorage.getItem('accessToken')]);

	const handleEditModal = (id, name) => {
		setModal(true);
		setModalType('category');
		setModalAdd(false);
		setModalForm('plus');
		setModalInput({...modalInput, income_id: id, income_name: name});
	};

	const handleDelete = async (id) => {
		const res = await deleteIncome(id);
		if (res.response) {
			alert(res.response.data.message);
		} else {
			const data = await getIncomes();
			setIncomes(data);
			setModal(false);
		};
	};

	const Render = ({ data }) => {
		return (
			<>
				<div className="id">
                    <div className="name">{data.income_name}</div>
                    <div className="edit-wrapper">
                        <button className="edit-btn" onClick={() => handleEditModal(
							data.income_id,
							data.income_name
						)}>Edit</button>
                    </div>
                    <div className="del-wrapper">
                        <button className="del-btn" onClick={() => handleDelete(data.income_id)}>Delete</button>
                    </div>
                </div>
                <div className="space"></div>
			</>
		);
	};

	return (
		<div className="income-table">
			Income Category
			<div className="data">
				{incomes ? incomes.map(item => <Render data={item} key={item.income_id} />) : <div className='no-data'>No Data</div>}
			</div>
		</div>
	);
};

export default IncomeTable;