$(document).ready(function () {
	var wordarray = ['fossil', 'gritty', 'dragon', 'alliance', 'kangaroo', 'evidence'];
	var randomNumber = 0;
	$('.btn').on('click', function () {
		$('#word').text('Guess The Word!')
		randomNumber = Math.floor((Math.random() * wordarray.length));
		$.ajax({   
			url: "https://wordsapiv1.p.mashape.com/words/"+wordarray[randomNumber]+"/definitions",
			crossDomain: true,
			dataType: 'JSON',
			type: 'GET',
			headers: {'X-Mashape-Key': '9alL8xYWlhmshnpsNIXnIduftSO7p1hvpkRjsn1y35t07WJ563'},
			success: function (data) {
				for (var i = 0; i < data.definitions.length; i++) {
					if (i < 4){
						$('h3').eq(i).text(data.definitions[i].definition);
					}
				}
			},
			error: function (error) {
				console.log(error);
			}
		});//end ajax
	});//end on 

	function Game() {
		this.wordcheck = function () {
			if ($('.guess').val() == wordarray[randomNumber]) {
				$('#word').text("You Got It!");
			} else {
				$('#x1').show()
			} 
		} 
	};//end game

	var game = new Game();

	$('.btn2').on('click', function () {
		game.wordcheck();
		$('.guess').val('');
	})

});//end ready

