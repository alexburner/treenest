/**
 * Activate scroll-to-drag on a .scroller/.scrolled pair
 *
 * @param  {HTMLElement} containerEl 	Element to find pair in
 * @requires jQuery as $
 */
function dragToScroll(containerEl) {

	// find target elements
	var $container = $(containerEl);
	var $scroller = $container.find('.scroller');
	var $scrolled = $container.find('.scrolled');

	// scroll to center left
	$scroller.scrollLeft(0);
	$scroller.scrollTop(
		$scrolled.height() / 2 -
		$scroller.height() / 2
	);

	// start drag
	$scrolled.on('mousedown', function (e) {
		e.preventDefault();
		// attach current position as data
		$scrolled.data('pan', {
			'pageX': e.pageX,
			'pageY': e.pageY,
			'scrollX': $scroller.scrollLeft(),
			'scrollY': $scroller.scrollTop()
		});
		// handle drag on any movement
		$scrolled.on('mousemove', dragHandler);
		// release drag handler on next mouseup
		$(document).one('mouseup', function (e) {
			$scrolled.unbind('mousemove', dragHandler);
		});
	});

	// during drag
	function dragHandler(e) {
		// grab previous position
		var prev = $scrolled.data('pan');
		// calculate position change
		var deltaX = e.pageX - prev.pageX;
		var deltaY = e.pageY - prev.pageY;
		// update scroll position
		var scrollX = prev.scrollX - deltaX;
		var scrollY = prev.scrollY - deltaY;
		$scroller.scrollLeft(scrollX);
		$scroller.scrollTop(scrollY);
	}

}