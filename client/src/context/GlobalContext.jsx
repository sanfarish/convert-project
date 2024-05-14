import { createContext, useState } from 'react';

const GlobalContext = createContext();

const GlobalContextProvider = (props) => {

	const [load, setLoad] = useState(false);

	return <GlobalContext.Provider value={{
		load,
		setLoad
	}}>
		{props.children}
	</GlobalContext.Provider>;
};

export { GlobalContext,GlobalContextProvider };