import axios from "axios";

export const api = typeof window == "undefined" ? axios.create({
	baseURL: "http://localhost/api",

})
	: 
	axios.create({ baseURL: "http://localhost/api"});