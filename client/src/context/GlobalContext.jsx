import { createContext, useState } from 'react';

const GlobalContext = createContext();

const GlobalContextProvider = (props) => {

	const [token, setToken] = useState(localStorage.getItem('accessToken'));
	const [load, setLoad] = useState(false);

	return <GlobalContext.Provider
		value={{
			token,
			setToken,
			load,
			setLoad
		}}
	>
		{props.children}
	</GlobalContext.Provider>;
};

export { GlobalContext,GlobalContextProvider };