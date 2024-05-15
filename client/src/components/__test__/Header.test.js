import { act, render, screen } from '@testing-library/react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { DataContextProvider } from "../../context/DataContext";
import { GlobalContextProvider } from "../../context/GlobalContext";
import '@testing-library/jest-dom';

import Header from '../Header';

jest.mock('axios', () => {
	return {
		create: jest.fn(() => {
		})
	};
});

it('Header render', () => {

	const { getByTestId } = render(
		<BrowserRouter>
			<Routes>
				<Route element={ <GlobalContextProvider> <Outlet /> </GlobalContextProvider> }>
					<Route element={ <DataContextProvider> <Outlet /> </DataContextProvider> }>
							<Route path='/' element={ <Header /> } />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);

	expect(getByTestId('avatar-image')).toBeInTheDocument();
});