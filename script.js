let app = new Vue ({
	el: '#app',
	data: {
		// titleBlock: document.querySelector('.content_title_text'),
		// leaguesBlock: document.querySelector('.leagues'),
		// teamsBlock: document.querySelector('.teams'),
		// calendarBlock: document.querySelector('.calendar'),

		navbar_items: [
			{title: 'Список лиг'},
			{title: 'Список команд'}
		],
		titles: [
			{text: 'Список лиг'},
			{text: 'Список команд'},
			{text: 'Календарь лиги '},
			{text: 'Календарь команды '},
		],
		leagues: [],
		teams: [],
		matches: []
	},
	methods: {
		goToNextPage(title) {
			let titleBlock = document.querySelector('.content_title_text');
			let leaguesBlock = document.querySelector('.leagues');
			let teamsBlock = document.querySelector('.teams');
			let calendarBlock = document.querySelector('.calendar');

			if (title == this.titles[0].text) {
				titleBlock.innerHTML = this.titles[0].text;
				leaguesBlock.style.display = 'block';
				teamsBlock.style.display = 'none';
				calendarBlock.style.display = 'none';
			}
			if (title == this.titles[1].text) {
				titleBlock.innerHTML = this.titles[1].text;
				leaguesBlock.style.display = 'none';
				teamsBlock.style.display = 'block';
				calendarBlock.style.display = 'none';
			}
		},
		goToCalendar(code, name, type) {
			let titleBlock = document.querySelector('.content_title_text');
			let leaguesBlock = document.querySelector('.leagues');
			let teamsBlock = document.querySelector('.teams');
			let calendarBlock = document.querySelector('.calendar');
			let dateFromInput = document.querySelector('#date_from');
			let dateToInput = document.querySelector('#date_to');

			let today = new Date();
			let dd = String(today.getDate()).padStart(2, '0');
			let mm = String(today.getMonth() + 1).padStart(2, '0');
			let yyyy = today.getFullYear();
			let yyyyAgo = today.getFullYear() - 10;
			today = yyyy + '-' + mm + '-' + dd;
			dateAgo = yyyyAgo + '-' + mm + '-' + dd;

			leaguesBlock.style.display = 'none';
			teamsBlock.style.display = 'none';
			calendarBlock.style.display = 'block';
			dateFromInput.value = dateAgo;
			dateToInput.value = today;

			if (type == 'competition') {
				titleBlock.innerHTML = this.titles[2].text + name;
				// this.goToLeague(code, dateAgo, today);
				getMatches(code, type, dateToInput, dateFromInput);
			}
			else if (type == 'team') {
				titleBlock.innerHTML = this.titles[3].text + name;
				getMatches(code, type, dateToInput, dateFromInput);
			}
		},
		goToLeague(code, dateFromInput, dateToInput) {
			$.ajax({
				headers: { 'X-Auth-Token': '0bb8f8c8f4034a7a9666874d313bbc43' },
				url: "https://api.football-data.org/v2/competitions/" + code + "/matches",
				dataType: 'json',
				type: 'GET',
			}).done(function(response) {
				for (let i = 0; i < response['matches'].length; i++) {
					// let gameDate = new Date(response['matches'][i]['utcDate']);
					if (dateFromInput > dateToInput) {
						alert('Дата начала больше даты окончания');
					}
					// else //if (gameDate > dateToInput || gameDate < dateFromInput)
					// {
					// 	console.log("sdfsdf");
					// 	let match = {
					// 		date: gameDate.getDate() + '.' + String(gameDate.getMonth()).padStart(2, '0') + '.' + gameDate.getFullYear(),
					// 		time: gameDate.getHours() + ':' + String(gameDate.getMinutes()).padStart(2, '0'),
					// 		hometeam: response['matches'][i]['homeTeam']['name'],
					// 		awayteam: response['matches'][i]['awayTeam']['name'],
					// 		score: response['matches'][i]['status'] == 'FINISHED' ? response['matches'][i]['score']['fullTime']['homeTeam'] + ':' + response['matches'][i]['score']['fullTime']['awayTeam'] : 'Матч перенесён или продолжается'
					// 	}
					// 	this.matches.push(match);
					// 	console.log(match);
					// }
				}
				console.log(response);
				// console.log(this.matches);
			});
		}
	},
	computed: {

	}
});



// $.ajax({
// 	headers: { 'X-Auth-Token': '0bb8f8c8f4034a7a9666874d313bbc43' },
// 	url: "https://api.football-data.org/v2/competitions/" + code + "/matches",
// 	dataType: 'json',
// 	type: 'GET',
// }).done(function(response) {
// 	for (let i = 0; i < response['matches'].length; i++) {
// 		let gameDate = new Date(response['matches'][i]['utcDate']);
// 		if (dateFromInput > dateToInput) {
// 			alert('Дата начала больше даты окончания');
// 		}
// 		else if (gameDate > dateToInput || gameDate < dateFromInput)
// 		{
// 			let match = {
// 				date: gameDate.getDate() + '.' + gameDate.getMonth() + '.' + gameDate.getFullYear(),
// 				time: gameDate.getHours() + ':' + gameDate.getMinutes(),
// 				hometeam: response['matches'][i]['homeTeam']['name'],
// 				awayteam: response['matches'][i]['awayTeam']['name'],
// 				score: response['matches'][i]['status'] == 'FINISHED' ? response['matches'][i]['score']['fullTime']['homeTeam'] + ':' + response['matches'][i]['score']['fullTime']['awayTeam'] : 'Матч перенесён или продолжается'
// 			}
// 			app.matches.push(match);
// 		}
// 	}
// });

// TODO: всунуть верхний к лигам!!! (в цикл второй ajax) либо в вуе

function getMatches(code, type, from, to) {
	$.ajax({
		headers: { 'X-Auth-Token': '0bb8f8c8f4034a7a9666874d313bbc43' },
		url: "https://api.football-data.org/v2/" + type +"s/" + code + "/matches",
		dataType: 'json',
		type: 'GET',
	}).done(function(response) {
		for (let i = 0; i < response['matches'].length; i++) {
			let gameDate = new Date(response['matches'][i]['utcDate']);
			if (from > to) {
				alert('Дата начала больше даты окончания');
			}
			else if (!(gameDate > to || gameDate < from))
			{
				let match = {
					date: String(gameDate.getDate()).padStart(2, '0') + '.' + String(gameDate.getMonth()).padStart(2, '0') + '.' + gameDate.getFullYear(),
					time: gameDate.getHours() + ':' + String(gameDate.getMinutes()).padStart(2, '0'),
					hometeam: response['matches'][i]['homeTeam']['name'],
					awayteam: response['matches'][i]['awayTeam']['name'],
					score: response['matches'][i]['status'] == 'FINISHED' ? response['matches'][i]['score']['fullTime']['homeTeam'] + ' - ' + response['matches'][i]['score']['fullTime']['awayTeam'] : 'Матч перенесён или продолжается'
				}
				app.matches.push(match);
				console.log(response);
			}
		}
	});
}

$.ajax({
	headers: { 'X-Auth-Token': '0bb8f8c8f4034a7a9666874d313bbc43' },
	url: 'https://api.football-data.org/v2/competitions',
	dataType: 'json',
	type: 'GET',
}).done(function(response) {
	for (let i = 0; i < response['competitions'].length; i++) {
		if (response['competitions'][i]['code'] != null && response['competitions'][i]['plan'] == 'TIER_ONE') {
			let league = {
				name: response['competitions'][i]['name'],
				code: response['competitions'][i]['code']
			}
			app.leagues.push(league);
		}
	}
});

$.ajax({
  headers: { 'X-Auth-Token': '0bb8f8c8f4034a7a9666874d313bbc43' },
  url: 'https://api.football-data.org/v2/teams',
 	dataType: 'json',
 	type: 'GET',
}).done(function(response) {
	for (let i = 0; i < response['teams'].length; i++) {
		if (response['teams'][i]['tla'] != null && response['filters']['permission'] == 'TIER_ONE') {
			let team = {
				name: response['teams'][i]['name'],
				icon: response['teams'][i]['crestUrl'],
				code: response['teams'][i]['id']
			}
			app.teams.push(team);
		}
	}
	console.log(response['teams']);
});
