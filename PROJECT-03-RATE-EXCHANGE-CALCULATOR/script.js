
const getRate = async (source,target)=>{
const url = `https://currency-converter241.p.rapidapi.com/convert?amount=1&from=${source}&to=${target}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e85abf64e8mshef1bb1ed6d521cfp12e1fejsnf19b0ab80d0a',
		'X-RapidAPI-Host': 'currency-converter241.p.rapidapi.com'
	}
};

try {
	const response = await fetch (url, options);
	const result = await  response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
}

getRate('USD','PKR');