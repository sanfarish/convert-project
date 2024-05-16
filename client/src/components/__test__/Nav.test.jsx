import { render } from '@testing-library/react';
import { BrowserRouter, Outlet, Routes, Route} from "react-router-dom";
import { GlobalContextProvider } from "../../context/GlobalContext";
import Nav from '../Nav';
import '@testing-library/jest-dom';

it('Nav render', () => {

    const { getByText } = render(
        <BrowserRouter>
            <Routes>
                <Route element={ <GlobalContextProvider> <Outlet /> </GlobalContextProvider> }>
                        <Route path='/' element={ <Nav /> } />
				</Route>
            </Routes>
        </BrowserRouter>
    );

    expect(getByText('Logout')).toBeInTheDocument();
});