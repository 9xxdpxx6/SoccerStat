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
			{name: ''}
		]
	},
	methods: {

	},
	computed: {

	}
});

fetch("https://sportscore1.p.rapidapi.com/sports/1/teams?page=1", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "sportscore1.p.rapidapi.com",
		"x-rapidapi-key": "SIGN-UP-FOR-KEY"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});

