import axios from "axios";
import { config, hostTarget } from "./config";

const getUser = async (token) => {
	try {
		const res = await axios.get(`${hostTarget}/users`, config(token));
		return res.data;
	} catch (err) {return err};
};

export { getUser };