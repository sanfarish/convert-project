import { useContext, useState, useEffect } from 'react'
import { CategoriesContext } from '../../context/CategoriesContext';

function TableIncomes() {

	const {
		incomes,
		setPopup,
		setPopupType,
		setPopupCategory,
		setPopupInput,
		setUpdateID,
		getIncomesData,
		deleteIncomeData,
		transactions
	} = useContext(CategoriesContext);
	const [transactionsIncomes, setTransactionsIncomes] = useState([]);

	useEffect(() => {

		getIncomesData();
		setTransactionsIncomes([]);
	
		transactions.forEach(item => {
			if (item.id_income !== '') {
				setTransactionsIncomes(prev => [...prev, item.id_income]);
			};
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [transactions]);

	const editIncomePopup = (name, id) => {
		setPopup(true);
		setPopupType('edit');
		setPopupCategory('income');
		setPopupInput(name);
		setUpdateID(id);
	};

	const handleDeleteIncome = async (id) => {
		if (transactionsIncomes.includes(id)) {
			alert('Cannot delete category that is in use on transactions!');
		} else {
			deleteIncomeData(id);
		};
	};

	function Render({ Item }) {
		return(
			<>
				<div className="id">
                    <div className="name">{Item.income_name}</div>
                    <div className="edit-wrapper">
                        <button className="edit-income-btn" onClick={() => editIncomePopup(
							Item.income_name,
							Item.income_id
						)}>Edit</button>
                    </div>
                    <div className="del-wrapper">
                        <button className="del-btn" onClick={() => handleDeleteIncome(Item.income_id)}>Delete</button>
                    </div>
                </div>
                <div className="space"></div>
			</>
		);
	};

	return (
		incomes.map(item => {
			return(
				item.income_id !== '' && <Render Item={item} key={item.income_id} />
			);
		})
	);

};

export default TableIncomes;