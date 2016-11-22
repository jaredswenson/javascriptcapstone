$(document).ready(function () {
	var wordarray = ['barren', 'legion', 'dragon', 'win', 'kangaroo', 'ninja'];
	var randomNumber = 0;
	$('.btn').on('click', function () {
		$('#word').hide('explode', function () {
				$('#word').text("The Definition Is:")
				});
				$('#word').show('explode');
		$('#word').css('color', 'white');
		$('#x1').hide('explode');
		$('#x2').hide('explode');
		$('#x3').hide('explode');
		game.misses = 0;
		$('.guess').val('');
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
		});//end ajaxf
	});//end on 

	function CheckAnswer() {
		this.misses = 0;
		this.wordcheck = function () {
			if ($('.guess').val() == wordarray[randomNumber]) {
				$('#word').hide('explode', function () {
				$('#word').text("You Got It! " + wordarray[randomNumber])
				$('#word').css('color', 'green')});
				$('#word').show('explode');
			}else {
				this.misses += 1; 
					if (this.misses === 1) {
					$('#x1').show('explode');
				} else if(this.misses === 2){
					$('#x2').show('explode');
				} else if (this.misses === 3){
					$('#x3').show('explode');
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

// $('#word').animate({ 
// 					top: "150px",	 function() {
// 						$('#word').css('color', 'green')
// 						$('#word').text("You Got It! " + wordarray[randomNumber])
// 					}))})
// .animate(
// 						top: "0px"{
// 						}));


	// $('#foot1').animate({
	// 	top: '175px'
	// }, 2000, function () { // send mario down tube
	// 	$('#mario').attr('src', 'flyer.jpg') // change mario image
	// })
	// .animate({
	// 	top: '0px'
	// }, 500); //send mario back up

