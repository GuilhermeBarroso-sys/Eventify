export function setDocumentCookie(cookieName : string, cookieValue : string) {
	document.cookie = `${cookieName}=${cookieValue}`;
}

export function deleteDocumentCookie(cookieName: string) {
	document.cookie = `${cookieName}=`;
}

export function getDocumentCookie(cName : string) {
	const name = cName + "=";
	const cDecoded = decodeURIComponent(document.cookie); //to be careful
	const cArr = cDecoded .split("; ");
	let res;
	cArr.forEach(val => {
		if (val.indexOf(name) === 0) res = val.substring(name.length);
	});
	return res;
}