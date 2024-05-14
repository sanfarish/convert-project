import { createContext, useState } from 'react';
import { postRegister, postLogin } from "../apis/auth";

const AuthContext = createContext();

const AuthContextProvider = (props) => {

	const [login, setLogin] = useState(false);

	return (
		<AuthContext.Provider
			value={{
				login,
				setLogin,
				postRegister,
				postLogin
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthContextProvider };