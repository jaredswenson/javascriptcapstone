$(document).ready(function () {
	var wordarray = ['barren', 'legion', 'dragon', 'win', 'kangaroo', 'ninja'];
	var randomNumber = 0;
	$('.btn').on('click', function () {
		$('#word').text('Guess The Word!');
		$('#word').css('color', 'white');
		$('#x1').hide();
		$('#x2').hide();
		$('#x3').hide();
		game.misses = 0;
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

	function CheckAnswer() {
		this.misses = 0;
		this.wordcheck = function () {
			if ($('.guess').val() == wordarray[randomNumber]) {
				$('#word').text("You Got It! " + wordarray[randomNumber]);
				$('#word').css('color', 'green');
			} else {
				this.misses += 1; 
				if (this.misses === 1) {
					$('#x1').show();
				} else if(this.misses === 2){
					$('#x2').show();
				} else if (this.misses === 3){
					$('#x3').show();
					$('#word').text(wordarray[randomNumber]);
					$('#word').css('color', 'red');
				}	
			} 
		} 
	};//end CheckAnswer

	var game = new CheckAnswer();

	$('.btn2').on('click', function () {
		game.wordcheck();
		$('.guess').val('');
	})

});//end ready

