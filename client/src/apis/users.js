import axios from "axios";
import { config } from "./config";

const getUser = async (token) => {
	try {
		const res = await axios.get('http://localhost:3500/api/v1/users', config(token));
		return res;
	} catch (err) {return err};
};

export { getUser };