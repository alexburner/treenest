/**
 * Link class
 * Draws a link between center of two elements, update when requested
 *
 * @param {Object} args 					Initial arguments
 * @param {HTMLElement} args.containerEl	Containing element
 * @param {HTMLElement} args.fromEl			Source element for link
 * @param {HTMLElement} args.toEl			Destination element for link
 */

function Link(args) {
	// elements
	this.linkEl = null;
	this.containerEl = args.containerEl;
	this.fromEl = args.fromEl;
	this.toEl = args.toEl;
	// construction
	this.buildElement();
	this.updateElement();
}

Link.prototype.buildElement = function () {
	// create link element
	this.linkEl = document.createElement('div');
	this.linkEl.className = 'link';
	// append to container element
	this.containerEl.appendChild(this.linkEl);
};

Link.prototype.updateElement = function () {
	// get bounding rectangles
	var containerRect = this.containerEl.getBoundingClientRect();
	var fromRect = this.fromEl.getBoundingClientRect();
	var toRect = this.toEl.getBoundingClientRect();
	// calculate relative top & left
	var containerTop = containerRect.top;
	var containerLeft = containerRect.left;
	var fromTop = fromRect.top - containerTop;
	var fromLeft = fromRect.left - containerLeft;
	var toTop = toRect.top - containerTop;
	var toLeft = toRect.left - containerLeft;
	// calculate center x & y
	var fromX = fromLeft + (this.fromEl.offsetWidth / 2);
	var fromY = fromTop + (this.fromEl.offsetHeight / 2);
	var toX = toLeft + (this.toEl.offsetWidth / 2);
	var toY = toTop + (this.toEl.offsetHeight / 2);
	// update link position
	this.setPosition(fromX, toX, fromY, toY);
};

Link.prototype.setPosition = function (x1, x2, y1, y2) {
	// calculate new length & angle
	var xDiff = x2 - x1;
	var yDiff = y2 - y1;
	var length = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
	var angle = 180 / Math.PI * Math.acos(yDiff / length);
	if (x2 > x1) angle *= -1;
	// set new position
	this.linkEl.style['height'] = length + 'px';
	this.linkEl.style['top'] = y1 + 'px';
	this.linkEl.style['left'] = x1 + 'px';
	this.linkEl.style['-webkit-transform'] = 'rotate(' + angle + 'deg)';
	this.linkEl.style['-moz-transform'] = 'rotate(' + angle + 'deg)';
	this.linkEl.style['-ms-transform'] = 'rotate(' + angle + 'deg)';
	this.linkEl.style['-o-transform'] = 'rotate(' + angle + 'deg)';
	this.linkEl.style['transform'] = 'rotate(' + angle + 'deg)';
};