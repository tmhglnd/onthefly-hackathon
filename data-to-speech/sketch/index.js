
const fs = require('fs-extra');
const max = require('max-api-or-not');

let responses = fs.readJSONSync('onthefly_resp--clean.json');
let questions = fs.readJSONSync('questions_practitioners.json');
let categories = fs.readJSONSync('questions_short.json');

console.log(categories);

function getQuestionNum(ask){
	let found;
	Object.keys(categories).forEach((q) => {
		if (ask == categories[q]){
			console.log(ask, categories[q]);
			found = q;
		}
	});
	if (found){
		return found;
	}
}

function getAnswer(question){
	let num = getQuestionNum(question);
	let answers = [];
	Object.keys(responses).forEach((r) => {
		let res = responses[r];
		if (res.branch === 'Practitioners and Artists'){
			if (res.responses[num]){
				answers.push(res.responses[num].toLowerCase());
				// console.log(res.responses[num].toLowerCase());
			}
		}
	});
	return answers;
	// max.outlet(answers);
}
// getAnswer('Country');

const fetch = require('fetch').fetchUrl;

max.addHandler('getAnswer', (q) => {
	// max.outlet(getAnswer(q));
	const url = `http://192.168.1.107:8080/questions_answers/${q}`
	fetch(url, (err, meta, body) => {
		// console.log(body);
		max.outlet(JSON.parse(body.toString()));
	})
});
