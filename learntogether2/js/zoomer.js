/**
 * Activate zooming on a target element
 * using a set of zoom controls to get started
 *
 * @param  {HTMLElement} controlsEl 	Zoom controls container
 * @requires jQuery as $
 */
function clickToZoom(args) {

	/**
	 * Variables
	 */

	var factor = 1;
	var incFactor = 0.1;
	var minFactor = 0.3;
	var maxFactor = 1;

	var $increaseBtn = args.$controls.find('.zoom-in');
	var $decreaseBtn = args.$controls.find('.zoom-out');
	var $target = args.$target;
	var $parent = args.$parent;
	var $frame = args.$frame;

	/**
	 * Functions
	 */

	// zoom target in
	function zoomIn() {

		// halt at limit, or lift opposite limit
		if ($increaseBtn.prop('disabled')) {
			return;
		} else {
			$decreaseBtn.prop('disabled', false);
		}

		// update origin
		setOrigin();

		// update factor
		factor += incFactor;
		factor = factor.toFixed(2);
		factor = Number(factor);
		if (factor >= maxFactor) {
			$increaseBtn.prop('disabled', true);
			factor = maxFactor;
		}

		// update scale
		setScale();

	}

	// zoom target out
	function zoomOut() {

		// halt at limit, or lift opposite limit
		if ($decreaseBtn.prop('disabled')) {
			return;
		} else {
			$increaseBtn.prop('disabled', false);
		}

		// update origin
		setOrigin();

		// update factor
		factor -= incFactor;
		factor = factor.toFixed(2);
		factor = Number(factor);
		if (factor <= minFactor) {
			$decreaseBtn.prop('disabled', true);
			factor = minFactor;
		}

		// update scale
		setScale();

	}

	// set target transform scale
	function setScale() {
		$target.css({
			'transform': 'scale(' + factor + ')'
		});
	}

	// set target transform origin
	// (frame center relative to target position)
	function setOrigin() {
		// measure elements
		var targetOffset = $target.offset();
		var frameOffset = $frame.offset();
		var targetX = Number(targetOffset.left.toFixed(0));
		var targetY = Number(targetOffset.top.toFixed(0));
		var frameX = Number(frameOffset.left.toFixed(0));
		var frameY = Number(frameOffset.top.toFixed(0));
		var frameWidth = $frame.width();
		var frameHeight = $frame.height();
		// calculate origin x
		var x = frameX;
		x -= targetX;
		x += (frameWidth / 2);
		// calculate origin y
		var y = frameY;
		y -= targetY;
		y += (frameHeight / 2);
		// set css values
		$target.css({
			'transform-origin': x + 'px ' + y + 'px'
		});
	}

	/**
	 * Event listeners
	 */

	 // increase zoom factor
	$frame.on('dblclick', zoomIn);
	$increaseBtn.on('click', function (e) {
		e.preventDefault();
		$increaseBtn.blur();
		zoomIn();
	});

	// decrease zoom factor
	$decreaseBtn.on('click', function (e) {
		e.preventDefault();
		$decreaseBtn.blur();
		zoomOut();
	});

	/**
	 * Actions
	 */

	// start off with zoom-in disabled
	$increaseBtn.prop('disabled', true);

	// lock parent size to target size
	$parent.css({
		'min-width': $target.outerWidth(),
		'min-height': $target.outerHeight()
	});

}