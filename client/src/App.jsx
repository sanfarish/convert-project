import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { GlobalContextProvider } from "./context/GlobalContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Transaction from "./pages/Transaction";
import Account from "./pages/Account";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<NotFound />} />
				<Route path="/" element={<Navigate to='/login' />} />
				<Route path="/login" element={
					<AuthContextProvider> <Login /> </AuthContextProvider>
				} />
				<Route path="/register" element={
					<AuthContextProvider> <Register /> </AuthContextProvider>
				} />

				<Route element={ <GlobalContextProvider> <PrivateRoute /> </GlobalContextProvider> }>
					<Route path="/transactions" element={
						<GlobalContextProvider> <Transaction /> </GlobalContextProvider>
					} />
					<Route path="/accounts" element={
						<GlobalContextProvider> <Account /> </GlobalContextProvider>
					} />
					<Route path="/categories" element={
						<GlobalContextProvider> <Category /> </GlobalContextProvider>
					} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;