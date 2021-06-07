// Creative Coding Utrecht Websites Gallery of artsts
//
// by Timo Hoogland
//
// Very naively loading all the pages from the urls 
// grabbed from the API
// THIS IS VERY HEAVY ON THE CPU/RAM/GPU
//

let sites = [];

window.onload = () => {
	// fetch('http://192.168.1.107:8080/questions_answers/Website')
	fetch('http://localhost:8080/questions_answers/Website')
	.then(response => response.json())
	.then(data => {
		sites = data;
		console.log(data);
		collage();
	});

	// html2canvas('http://www.timohoogland.com', {
	// 	onrendered: (canvas) => {
	// 		var img = canvas.toDataURL();
	// 		var cnv = document.createElement();
	// 		document.appendChild()
	// 		// $("#result-image").attr('src', img).show();
	// 	}
	// });
}

function collage(){	
	sites.forEach((s) => {
		// getSite(s);
		// console.log(s.match(/http(s)?:\/\/[^\s]+/g));
		// s = s.replaceAll(/\,/, ' ');
		s = s.split(',').join(' ');
		// console.log(s);
		// get http(s) sites
		let https = s.match(/http(s)?:\/\/[^\s]+/g);
		s = s.replace(/http(s)?:\/\/[^\s]+/g, ' ');
		// console.log('http(s) found:', https);
	
		// get remaining www sites:
		let www = s.match(/www.[^\s]+/g);
		s = s.replace(/www.[^\s]+/g, ' ');
		// console.log('www found:', www);
	
		let other = s.match(/[^.\s]+\.[^.\s]+/g);
		s = s.replace(/[^.\s]+\.[^.\s]+/, ' ');
		// console.log('found other:', other);
	
		let sites = [];
		sites = sites.concat(https)
				.concat(www)
				.concat(other);
		// console.log('found sites:', sites);
		// console.log(sites);
		
		sites.forEach((url) => {
			if (url){
				console.log(url);
				try {
					if (!/^https?:\/\//i.test(url)) {
						url = 'https://' + url;
					}
					getSite(url);
				} catch {
					console.log('error loading site:', url);
				}
			}
		});
	});
}

function getSite(url){
	let frame = document.createElement('iframe');
	frame.src = url;

	let div = document.createElement('div');
	div.class = 'grid-item';
	div.appendChild(frame);
	
	let main = document.getElementById('frames');
	main.appendChild(div);
}
