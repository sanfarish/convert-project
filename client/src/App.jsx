import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AccountsContextProvider } from "./context/AccountsContext";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<NotFound />} />
				<Route path="/" element={<Navigate to='/transactions' />} />
				<Route path="/categories" element={<Categories />} />
				<Route path="/accounts" element={
					<AccountsContextProvider><Accounts /></AccountsContextProvider>
				} />
				<Route path="/transactions" element={<Transactions />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;