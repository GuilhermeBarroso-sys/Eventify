export function parseDateToDatabase(datetime : string) {
	const [date, time] = datetime.split("T");
	const [timeWithoutMs] = time.split(".");
	return `${date} ${timeWithoutMs}`;
}