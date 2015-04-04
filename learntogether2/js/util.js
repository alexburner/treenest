/**
 * Global helpers
 */
var util = {};


/**
 * Find size of a collection of elements
 *
 * @param  {NodeList} elements  	List of elements to measure
 * @return {Object}      			Calculated sizes of elements
 */
util.findElementsSize = function (elements) {

	// prepare to find bound extremes
	var minTop = Number.POSITIVE_INFINITY;
	var minLeft = Number.POSITIVE_INFINITY;
	var maxRight = Number.NEGATIVE_INFINITY;
	var maxBottom = Number.NEGATIVE_INFINITY;

	// for each element
	Array.prototype.forEach.call(elements, function (element) {

		// check element bounds against extremes
		var bounds = element.getBoundingClientRect();
		minTop = Math.min(minTop, bounds.top);
		minLeft = Math.min(minLeft, bounds.left);
		maxRight = Math.max(maxRight, bounds.right);
		maxBottom = Math.max(maxBottom, bounds.bottom);

	});

	// calculate sizes
	return {
		width: maxRight - minLeft,
		height: maxBottom - minTop
	};

};


/**
 * Vertically center any target elements in container
 * (elements marked with "vertically-center" class)
 * (assumes element is positioned absolutely, fixed, or relative)
 *
 * @param  {HTMLElement} containerEl  	(optional) Element to search within
 */
util.verticallyCenterElements = function (containerEl) {

	// default to entire DOM
	containerEl = containerEl || document;

	// for every .vertically-center element
	var elList = containerEl.querySelectorAll('.vertically-center');
	Array.prototype.forEach.call(elList, function (el) {
		util.verticallyCenterElement(el);
	});

	// for every .vertically-center-relative element
	var elRelativeList = containerEl.querySelectorAll('.vertically-center-relative');
	Array.prototype.forEach.call(elRelativeList, function (el) {
		util.verticallyCenterRelativeElement(el);
	});

};


/**
 * Vertically center a specific element
 * (assumes element is positioned absolutely or fixed)
 *
 * @param  {HTMLElement} el  	Element to vertically center
 */
util.verticallyCenterElement = function (el) {

	// find height of self and positioning parent
	var parentHeight = el.offsetParent.clientHeight;
	var selfHeight = el.clientHeight;

	// center element
	el.style.top = (parentHeight / 2) - (selfHeight / 2) + 'px';

};

/**
 * Vertically center a specific element
 * (assumes element is relative and checks for parent padding)
 *
 * @param  {HTMLElement} el  	Element to vertically center
 */
util.verticallyCenterRelativeElement = function (el) {

	// find height of self and positioning parent
	var parentHeight = el.offsetParent.clientHeight;
	var selfHeight = el.clientHeight;

	// find parent's top padding
	var parentStyle = window.getComputedStyle(el.offsetParent);
	var parentTopPad = parentStyle
		.getPropertyValue('padding-top')
			.replace(/px$/, '');

	// center element
	var newTop = (parentHeight / 2) - (selfHeight / 2) - parentTopPad;
	el.style.top = newTop + 'px';

};

/**
 * Measure scrollbar width
 * http://davidwalsh.name/detect-scrollbar-width
 *
 * @return {Number}      Calculated width
 */
util.getScrollbarWidth = function () {

	// Create the measurement node
	var el = document.createElement('div');
	el.style.width = '100px';
	el.style.height = '100px';
	el.style.overflow = 'scroll';
	el.style.position = 'absolute';
	el.style.top = '-9999px';
	document.body.appendChild(el);

	// Get the scrollbar width
	var scrollbarWidth = el.offsetWidth - el.clientWidth;

	// Delete the DIV
	document.body.removeChild(el);

	// hooray
	return scrollbarWidth;

};