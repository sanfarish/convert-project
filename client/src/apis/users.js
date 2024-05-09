import axios from "axios";
import { config, hostTarget } from "./config";

const getUser = async (token) => {
	try {
		const res = await axios.get(`${hostTarget}/api/v1/users`, config(token));
		return res;
	} catch (err) {return err};
};

export { getUser };