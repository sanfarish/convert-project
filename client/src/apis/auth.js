import axios from "axios";
import { hostTarget } from "./config";

const postRegister = async (body) => {
	try {
		const jsonRegister = Object.fromEntries(body.entries());
		const res = await axios.post(`${hostTarget}/register`, jsonRegister);
		return res;
	} catch (err) {return err};
};

const postLogin = async (body) => {
	try {
		const jsonLogin = Object.fromEntries(body.entries());
		const res = await axios.post(`${hostTarget}/login`, jsonLogin);
		return res;
	} catch (err) {return err};
};

export { postRegister , postLogin };