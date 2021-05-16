
// Creative Coding Utrecht
// Gender representation of the data in color and background erase

let api = 'http://192.168.1.107:8080/questions_answers/'
let load = [ 'Gender', 'Residence', 'Tools', 'Discipline'];

let data = {};

load.forEach((l) => {
	fetch(api+l)
	.then((res) => res.json())
	.then((d) => {
		// data.push(d);
		data[l] = [];
		data[l] = d;
		console.log(`loaded ${l}:`, data);
	});
});

var synth = window.speechSynthesis;
var voices = synth.getVoices().sort(function (a, b) {
	const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
	if ( aname < bname ) return -1;
	else if ( aname == bname ) return 0;
	else return +1;
});

let w;
let h;
let pX;
let pY;

let counter = 0;
let t;

let bgTeal = [57, 204, 204];
let bgMaroon = [133, 20, 75];
let bgOlive = [61, 153, 112];
let bg = bgTeal;

function setup(){
	createCanvas(windowWidth, windowHeight);
	w = width/2;
	h = height/2;
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	w = width/2;
	h = height/2;
}

function draw(){
	background(bg.concat([3]));
	translate(w, h);

	// if (frameCount % 100 === 0){
	if (!synth.speaking){
		if (data['Gender']){
			let g = data['Gender'][counter % data['Gender'].length];
			// let g = data['Discipline'][counter % data['Discipline'].length];
			if (g != ''){
				t = g.toLowerCase();
				if (/^male/.test(t)){
					bg = bgMaroon;
				} else if (/fe.+/.test(t)){
					bg = bgTeal;
				} else {
					bg = bgOlive;
				}
				pX = random(-w/2, w/2);
				pY = random(-h/2, h/2);

				speak(t, Math.random() * 0.2 + 0.5, 1.4);
				// speak(t);
			} else {
				// bg = [0, 0, 0];
			}
		}
		counter++;
	}

	fill(255);
	textAlign(CENTER, CENTER);
	textSize(150);
	text(t, pX, pY);
}

function speak(t, p, r){
	if (synth.speaking) {
		console.error('Not done talking yet!');
		return;
	}

	if (t !== ''){
		var speech = new SpeechSynthesisUtterance(t);
		speech.onend = () => {
			// console.log('Done Talking!');
		}

		speech.onerror = () => {
			// console.log("Can't say this");
		}
		speech.pitch = p;
		speech.rate = r;

		synth.speak(speech);
		isTalking = true;
	}
}