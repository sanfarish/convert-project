import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const IncomeTable = () => {

	const {
		token,
		incomes,
		setIncomes,
		setModal,
		setModalType,
		setModalAdd,
		setModalForm,
		modalInput,
		setModalInput,
		setLoad,
		getIncomes,
		deleteIncome
	} = useContext(GlobalContext);

	useEffect(() => {
		const getData = async () => {
			const data = await getIncomes(token);
			setIncomes(data);
		};
		getData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	const handleEditModal = (id, name) => {
		setModal(true);
		setModalType('category');
		setModalAdd(false);
		setModalForm('plus');
		setModalInput({...modalInput, income_id: id, income_name: name});
	};

	const handleDelete = async (id) => {
		setLoad(true);
		const res = await deleteIncome(id, token);
		if (res.response) {
			alert(res.response.data.message);
			setLoad(false);
		} else {
			const data = await getIncomes(token);
			setIncomes(data);
			setLoad(false);
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