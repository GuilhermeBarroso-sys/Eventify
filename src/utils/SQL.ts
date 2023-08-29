class SQL {
	static insertQuotes(string : string , singleQuotes = true) {
		return singleQuotes ? `'${string}'` : `"${string}"`;
	}
	static stringField(field : string | null) {

		return field ? this.insertQuotes(field) : null;
	}
	static insertValues(array : Array<string|null|boolean|number>) {
		let values = "";
		array.forEach((element) => {
			if(typeof element == "string") {
				values += `${this.stringField(element)},`;
			} else {
				values += `${element},`;
			}
		});		
		return values.slice(0, values.length -1);
	}
  
}

export { SQL };