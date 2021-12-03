new Vue ({
	el: '#app',
	data: {
		navbar_items: [
			{title: 'Список лиг', href: ''},
			{title: 'Список команд', href: ''},
			{title: 'Календарь лиги', href: ''},
			{title: 'Календарь одной команды', href: ''},
			{title: '', href: ''}
		],
		leagues: [
	
		]
	},
	methods: {

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
  
  console.log(response);
});