const searchParams = new URLSearchParams(window.location.search);

const paramType = searchParams.get('type');
const paramCode = searchParams.get('code');
const paramDateFrom = searchParams.get('dateFrom');
const paramDateTo = searchParams.get('dateTo');

let app = new Vue ({
	el: '#app',
	data: {
		navbar_items: [
			{title: 'Список лиг', href: 'index.html?type=competitions'},
			{title: 'Список команд', href: 'index.html?type=teams'}
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
	// mounted() {
	// 	window.addEventListener('load', () => {
	// 		this.goToNextPage();
	//  	});
 	// },
	methods: {
		goToNextPage() {
			let titleBlock = document.querySelector('.content_title_text');
			let leaguesBlock = document.querySelector('.leagues');
			let teamsBlock = document.querySelector('.teams');
			let calendarBlock = document.querySelector('.calendar');

			if (paramType != null) {
				if (paramCode == null) {
					setTimeout(function()	{
						if (paramType == "competitions") {
							titleBlock.innerHTML = this.titles[0].text;
							leaguesBlock.style.display = 'block';
							teamsBlock.style.display = 'none';
							calendarBlock.style.display = 'none';
						}
						else if (paramType == "teams") {
							titleBlock.innerHTML = this.titles[1].text;
							leaguesBlock.style.display = 'none';
							teamsBlock.style.display = 'block';
							calendarBlock.style.display = 'none';
						}
					}, 1500);
				}
				else {
					if (paramType == "competitions") {
						goToCalendar(competitions['competitions'][idElem]['code']);
					}
					else if (paramType == "teams") {
						setTimeout(function() {
							teamGames(teams['teams'][idElem]['id']);
						}, 1500);
					}
				}
				showPreloader();
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
				getMatches(code, type, dateToInput, dateFromInput);
			}
			else if (type == 'team') {
				titleBlock.innerHTML = this.titles[3].text + name;
				getMatches(code, type, dateToInput, dateFromInput);
			}
		},
	},
	computed: {

	}
});



window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
}

function showPreloader() {
	let preloader = document.querySelector('#preloader')
	preloader.style.visibility = 'visible';
	preloader.style.opacity = 1;
}
function hidePreloader() {
	let preloader = document.querySelector('#preloader')
	preloader.style.visibility = 'hidden';
	preloader.style.opacity = 0;
}

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
					score: response['matches'][i]['status'] == 'FINISHED' ? response['matches'][i]['score']['fullTime']['homeTeam'] + ' - ' + response['matches'][i]['score']['fullTime']['awayTeam'] : 'Не окончен'
				}
				app.matches.push(match);
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
