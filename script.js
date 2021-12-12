let app = new Vue ({
	el: '#app',
	data: {
		content: document.querySelector('.main'),
		navbar_items: [
			{title: 'Список лиг'},
			{title: 'Список команд'}
		],
		titles: [
			{text: 'Список лиг'},
			{text: 'Список команд'},
			{text: 'Календарь лиги ' + this.leagues},
			{text: 'Календарь команды ' + this.teams},
		],
		leagues: [],
		teams: [],
	},
	methods: {
		goToNextPage: function(title) {
			$.get('/teams.html', function(data) {
				if (title == 'Список лиг') {
					this.content.innerHTML = data;
				}
			}, "text");
		}
	},
	computed: {

	}
});

$.ajax({
	headers: { 'X-Auth-Token': 'f3f3dad5142049a481c69a81fdda3d0d' },
	url: 'https://api.football-data.org/v2/competitions',
	dataType: 'json',
	type: 'GET',
}).done(function(response) {
	for (let i = 0; i < response['competitions'].length; i++) {
		let league = {
			name: response['competitions'][i]['name'],
		}
		app.leagues.push(league);
	}
});

$.ajax({
  headers: { 'X-Auth-Token': 'f3f3dad5142049a481c69a81fdda3d0d' },
  url: 'https://api.football-data.org/v2/teams',
 	dataType: 'json',
 	type: 'GET',
}).done(function(response) {
	for (let i = 0; i < response['teams'].length; i++) {
		let team = {
			name: response['teams'][i]['name'],
			icon: response['teams'][i]['crestUrl']
		}
		app.teams.push(team);
	}
});
