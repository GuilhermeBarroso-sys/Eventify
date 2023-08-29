import { exec } from "node:child_process";

const syncDB = () => {
	return new Promise((res,rej) => {
		exec("npx prisma db push", (err) => {
			if(err) {
				rej(err);
			}
			
			res(null);
		});
	});
};

try {
	process.env.DATABASE_URL="mysql://root:root@app-mysql:3306/eventify_test";
	syncDB();
} catch(err) {
	console.error(err);
}
	