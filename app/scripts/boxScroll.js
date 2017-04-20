function colorLuminance(hex, lum) {
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	var rgb = '#', c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ('00'+c).substr(c.length);
	}

	return rgb;
}

function makeDepthDiv($el, depth, numEls, settings) {
  settings = settings || {};
	settings.hackOffset = settings.hackOffset || 0;
  $(window).on('resize', function() {
    if($el.prev().length) $el.prev().css({ width: $el.width() + settings.hackOffset });
    if($el.next().length) $el.next().css({ width: $el.width() + settings.hackOffset });
  }).resize();
  $(window).on('scroll', function() {
    var vanishingPoint = ($(window).height() / 2) - ($el.outerHeight() / 2);
    var relY = $el.offset().top - $(window).scrollTop();

    var depthCoefficient = 0.16;
    var offset = Math.abs((vanishingPoint - relY) * depthCoefficient);
    if(offset > $el.outerHeight()) offset = $el.outerHeight();

    var darkerColor = colorLuminance($el.css('background-color'), -0.02);

    if(relY < -$el.parent().outerHeight() * 2 || relY > $(window).height() + $el.parent().outerHeight() * 2) return;

    var aboveVP = false;
  	if(relY < vanishingPoint) aboveVP = true;

    if(aboveVP) {
    	if(!$el.next().length) {
      	$el.after('<div class="depth-after"></div>');
        $el.prev().remove();
      }
      $el.next().css({
      	marginBottom: -offset - $el.parent('.box-container').css('margin-bottom'),
      	borderTop: offset * 0.8 +'px solid',
        borderLeft: (settings.noLeft ? '' : '50px solid transparent'),
        borderRight: '50px solid transparent',
        width: $el.width() + settings.hackOffset,
        marginLeft: $el.css('margin-left'),
        marginRight: $el.css('margin-right')
      });
      $el.parent('.box-container').css('z-index', depth);
    } else {
    	if(!$el.prev().length) {
      	$el.before('<div class="depth-before"></div>');
        $el.next().remove();
      }
      $el.prev().css({
        marginTop: -offset - $el.parent('.box-container').css('margin-top'),
      	borderBottom: offset +'px solid',
        borderLeft: (settings.noLeft ? '' : '50px solid transparent'),
        borderRight: '50px solid transparent',
        width: $el.width() + settings.hackOffset,
        marginLeft: $el.css('margin-left'),
        marginRight: $el.css('margin-right')
      });
      $el.parent('.box-container').css('z-index', numEls - depth);
    }
  }).scroll();
}
