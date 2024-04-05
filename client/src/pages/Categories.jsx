import { Helmet } from 'react-helmet';
import Header from '../components/dashboard/Header';
import Nav from '../components/dashboard/Nav';
import Main from '../components/dashboard/main/MainCategories';
import Popup from '../components/dashboard/popup/PopupCategories';
import Title from '../components/Title';

function Categories() {
	Title('Categories | Expense Manager');
	return (
		<div className='categories'>
			{ <Helmet>
				<link rel="stylesheet" href="/css/dashboard.css" />
				<link rel="stylesheet" href="/css/categories/main.css" />
				<link rel="stylesheet" href="/css/categories/table.css" />
				<link rel="stylesheet" href="/css/categories/popup.css" />
			</Helmet> }
			<div className="view">
				<Header Title="Categories" />
				<Main />
				<Nav />
			</div>
			<Popup />
		</div>
	);
};

export default Categories;