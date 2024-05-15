import { render } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import Nav from '../Nav';
import '@testing-library/jest-dom';

it('Nav render', () => {

    const { getByText } = render(
        <BrowserRouter>
            <Nav />
        </BrowserRouter>
    );

    expect(getByText('Logout')).toBeInTheDocument();
});