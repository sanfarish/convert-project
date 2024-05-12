import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { DataContextProvider } from "./context/DataContext";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";
import Categories from "./pages/Categories";
import DashboardRoute from "./routes/DashboardRoute";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="*" element={ <NotFound /> } />

				<Route path="/" element={ <Navigate to='/login' /> } />

				<Route element={ <AuthContextProvider> <Outlet /> </AuthContextProvider> }>
					<Route path="/login" element={ <Login /> } />
					<Route path="/register" element={ <Register /> } />
				</Route>

				<Route element={ <DataContextProvider> <PrivateRoute /> </DataContextProvider> }>

					<Route element={ <DashboardRoute /> }>

						<Route path="/transactions" element={ <Transactions /> } />
						<Route path="/accounts" element={ <Accounts /> } />
						<Route path="/categories" element={ <Categories /> } />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;