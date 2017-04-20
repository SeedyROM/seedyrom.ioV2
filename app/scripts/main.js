console.clear();

var debug = false;

var $loadingScreen = $('.loading-screen');
var $cdSpinner = $('.cd-spinner');
var $progressBar = $('.progress-bar');
var $content = $('.content');
var $locationLink = $('.bio .location');

//console.log(document.referrer.match(/:\/\/(.[^/]+)/)[1].split(':')[0]);
if(debug) {
	$loadingScreen.addClass('loaded');
}

$cdSpinner.css({
	marginLeft: $cdSpinner.width()/-2+'px',
		marginTop: $cdSpinner.height()/-2+'px'
});
$cdSpinner.velocity({
	rotateZ: '+=360',
}, {
		duration: 600,
		easing: 'linear',
		loop: true
});
$progressBar.velocity({
	width: '100%',
		backgroundColor: '#F5F5F5'
}, {
	duration: 1000,
		easing: 'ease',
		complete: function() {
			$loadingScreen.velocity({
					opacity: '0',
				}, {
					duration: 300,
						easing: 'ease',
						complete: function() {
							$loadingScreen.addClass('loaded');
								$content.velocity({
									opacity: 1,
								}, {
									duration: 400,
									easeing: 'ease',
									complete: function() {
										$cdSpinner.remove();
									}
								});
						},
				});
		},
});

$locationLink.on('click', function() {
	var currentLocation = 'https://www.google.com/search?q='+ escape($.trim($(this).text()));
    location.href = currentLocation;
});

$('.whoami .links > a').attr('target','_blank');

$('a').on('click', function(e) {
  var direction = $(e.target).attr('direction') || 'down';
  if($(e.target).attr('target') == '_blank') return;
  e.preventDefault();
  $('body').velocity({
    opacity: 0,
    top: -$(document).height() / 8 + 'px'
  }, {
    duration: 300,
    easeing: 'easeOutSine',
    complete: function() {
			$(window).scrollTop(0);
      window.location.href = $(e.target).attr('href');
    }
  })
});

$(document).on('ready', function() {
  $(window).resize();
  $('.heading-container').children().each(function(i, v) {
  	makeDepthDiv($(v), i, $('.heading-container').length, {noLeft: true, hackOffset: 82});
  });
});

$(document).on('ready', function() {
	$('#info-container').velocity({
		opacity: 1
	}, {
		duration: 300,
		easeing: 'ease-out'
	})
  $('.heading-container').each(function(i, v) {
    $(v).css({
      opacity: 1,
      left: -$(v).outerWidth()
    });
  	setTimeout(function() {
      $(v).velocity({
        left: 0
      }, {
        duration: 650,
        easing: 'ease-out'
      });
    }, 300 * i);
  });
});

$(window).on('scroll', function() {
  var $infoContainer = $('#info-container');
  if(!$infoContainer.length) return;
  var offset = $(window).scrollTop() / 4;
  $infoContainer.css({
    backgroundPosition: '0px '+ offset +'px'
  });
});

$(document).on('ready', function() {
	function changeIcons() {
		var $backButton = $('#back');
		var $icon = $('#back i').first();
		if($(window).scrollTop() > 150) {
			if($icon.length || $icon.hasClass('ion-android-home')) {
				$icon.remove();
				$backButton.append('<i class="ion-android-arrow-up"></i>');
			} else {
				$backButton.append('<i class="ion-android-arrow-up"></i>');
			}
		} else {
			if($icon.length || $icon.hasClass('ion-android-arrow-up')) {
				$icon.remove();
				$backButton.append('<i class="ion-android-home"></i>');
			} else {
				$backButton.append('<i class="ion-android-home"></i>');
			}
		}
	}
	setTimeout(function() {
		$('#back').velocity({
			opacity: 1
		}, {
			duration: 500
		});
		changeIcons();
		$(window).on('scroll', function() {
			changeIcons();
		});
	}, 400);

	$('#back').on('click', function(e) {
		if($(e.target).first().hasClass('ion-android-home')) {
			location.href = '/';
		} else {
			$('html, body').velocity('scroll', {
				duration: $(window).scrollTop(),
				easeing: 'ease-in-out'
			});
			e.preventDefault();
		}
	});
});
