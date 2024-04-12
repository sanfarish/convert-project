import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CategoriesContextProvider } from "./context/CategoriesContext";
import { AccountsContextProvider } from "./context/AccountsContext";
import { TransactionsContextProvider } from "./context/TransactionsContext";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<NotFound />} />
				<Route path="/" element={<Navigate to='/transactions' />} />
				<Route path="/categories" element={
					<CategoriesContextProvider>
						<Categories />
					</CategoriesContextProvider>
				} />
				<Route path="/accounts" element={
					<AccountsContextProvider>
						<Accounts />
					</AccountsContextProvider>
				} />
				<Route path="/transactions" element={
					<TransactionsContextProvider>
						<Transactions />
					</TransactionsContextProvider>
				} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;