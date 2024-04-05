import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3500/api/v1/categories-income"
});