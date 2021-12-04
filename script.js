let app = new Vue ({
	el: '#app',
	data: {
		navbar_items: [
			{title: 'Список лиг', href: ''},
			{title: 'Список команд', href: ''},
			{title: '', href: ''}
		],
		leagues: [],
		teams: [],
	},
	methods: {

	},
	computed: {

	}	
});

let teamNames = [];
let teamIcons = [];

$.ajax({
  	headers: { 'X-Auth-Token': 'f3f3dad5142049a481c69a81fdda3d0d' },
  	url: 'https://api.football-data.org/v2/teams',
 	 dataType: 'json',
 	type: 'GET',
}).done(function(response) {
	for (let i = 0; i < response['teams'].length; i++) {
		tName = teamNames.push(response['teams'][i]['name']),
		tIcon = teamIcons.push(response['teams'][i]['crestUrl'])
		let team = {
			name: tName,
			icon: tIcon
		}
		// app.teams.push(team);
		console.log(tName);
		// app.teams.push(response['teams'][i]['name'], response['teams'][i]['crestUrl']);
	}
	// console.log(teams);
});



$.ajax({
  	headers: { 'X-Auth-Token': 'f3f3dad5142049a481c69a81fdda3d0d' },
  	url: 'https://api.football-data.org/v2/competitions',
 	 dataType: 'json',
 	type: 'GET',
}).done(function(response) {
	for (let i = 0; i < response['competitions'].length; i++)
		app.leagues += response['competitions'][i]['name'];
});
