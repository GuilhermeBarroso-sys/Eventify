import { api } from "@/services/api";
import { cookies } from "next/headers";

export function isAuthenticated() {
	const haveSessionCookie = cookies().has("session");
	if(!haveSessionCookie) {
		return false;
	}
	const validCookie = cookies().get("session")?.value;
	if(!validCookie) {
		return false;
	}
	const authCookie = cookies().get("session");
	api.defaults.headers.Cookie = `${authCookie!.name}=${authCookie!.value}`;
	return true;
}