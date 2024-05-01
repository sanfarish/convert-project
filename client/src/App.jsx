import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GlobalContextProvider } from "./context/GlobalContext";
import NotFound from "./pages/NotFound";
import Category from "./pages/Category";
import Account from "./pages/Account";
import Transaction from "./pages/Transaction";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<NotFound />} />
				<Route path="/" element={<Navigate to='/transactions' />} />
				<Route path="/categories" element={
					<GlobalContextProvider>
						<Category />
					</GlobalContextProvider>
				} />
				<Route path="/accounts" element={
					<GlobalContextProvider>
						<Account />
					</GlobalContextProvider>
				} />
				<Route path="/transactions" element={
					<GlobalContextProvider>
						<Transaction />
					</GlobalContextProvider>
				} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;