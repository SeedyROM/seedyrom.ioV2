console.clear();

var debug = false;

var $loadingScreen = $('.loading-screen');
var $cdSpinner = $('.cd-spinner');
var $progressBar = $('.progress-bar');
var $content = $('.content');
var $locationLink = $('.bio .location');

if(debug) $loadingScreen.addClass('loaded');

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
  var direction = $(e.target).attr('direction') || "down";
  if($(e.target).attr('target') == '_blank') return;
  e.preventDefault();
  $('body').velocity({
    opacity: 0,
    top: -$(document).height() / 8 + "px"
  }, {
    duration: 300,
    easeing: 'easeOutSine',
    complete: function() {
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
        easing: 'easeOutSine'
      });
    }, 300 * i);
  });
});

$(document).on('ready', function() {
  $(window).on('scroll', function() {
    var $infoContainer = $('#info-container');
    if(!$infoContainer.length) return;
    var offset = $(window).scrollTop() / 2;
    console.log(offset);
    $infoContainer.css({
      backgroundPosition: '0px '+ offset +'px'
    });
  });
});
