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

	// prepare to find bounds
	var minTop = Number.POSITIVE_INFINITY;
	var minLeft = Number.POSITIVE_INFINITY;
	var maxRight = Number.NEGATIVE_INFINITY;
	var maxBottom = Number.NEGATIVE_INFINITY;

	// for each element
	Array.prototype.forEach.call(elements, function (element) {

		// check element bounds
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

};


/**
 * Vertically center a specific element
 * (assumes element is positioned absolutely, fixed, or relative)
 *
 * @param  {HTMLElement} el  	Element to vertically center
 */
util.verticallyCenterElement = function (el) {

	// find height of self and positioning parent
	var parentHeight = el.offsetParent.offsetHeight;
	var selfHeight = el.offsetHeight;

	// center element
	el.style.top = (parentHeight / 2) - (selfHeight / 2) + 'px';

};

