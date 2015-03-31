/**
 * Activate zooming on a target element
 * using a set of zoom controls to get started
 *
 * @param  {HTMLElement} controlsEl 	Zoom controls container
 * @requires jQuery as $
 */
function clickToZoom(controlsEl) {

	var zoom = 1;

	var $controls = $(controlsEl);
	var $zoomInBtn = $controls.find('.zoom-in');
	var $zoomOutBtn = $controls.find('.zoom-out');
	var $zoomTarget = $($controls.attr('data-zoom-target'));

	$zoomInBtn.on('click', function (e) {
		e.preventDefault();
		zoom += 0.1;
		$zoomTarget.css({
			'transform': 'scale(' + zoom + ')'
		});
	});

	$zoomOutBtn.on('click', function (e) {
		e.preventDefault();
		zoom -= 0.1;
		if (zoom <= 0) zoom = 0.01;
		$zoomTarget.css({
			'transform': 'scale(' + zoom + ')'
		});
	});

}