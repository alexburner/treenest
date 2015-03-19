/**
 * Tree class
 * Create and update html/css tree
 *
 * @param {Object} args 				Initial arguments
 * @param {Array} args.nodes 			Array of nodes for tree
 * @param {HTMLElement} args.treeEl 	Element to hold tree
 */
function Tree(args) {
	// objects
	this.links = [];
	this.nodes = args.nodes;
	// elements
	this.treeEl = args.treeEl;
	// construction
	this.makeTree();
	this.updateTree();
}


/**
 * Create the html/css tree
 * Used for both main class tree
 * And any nested subtrees
 *
 * @param  {Array} nodes 			Data for nodes and any children
 * @param  {HTMLElement} treeEl 	Element to place tree nodes inside
 */
Tree.prototype.makeTree = function(nodes, treeEl) {
	// default to self, but also support subtrees
	nodes = nodes || this.nodes;
	treeEl = treeEl || this.treeEl;

	/**
	 * Root node
	 */

	// node element
	var nodeEl;
	nodeEl = document.createElement('div');
	nodeEl.className = 'node root-node';
	treeEl.appendChild(nodeEl);

	// children element
	var childrenEl;
	childrenEl = document.createElement('div');
	childrenEl.className = 'root-children vertically-center';
	nodeEl.appendChild(childrenEl);

	/**
	 * Root children
	 */

	// add each node
	nodes.forEach(function (node) {
		this.addTreeNode(
			node,
			childrenEl,
			treeEl
		);
	}, this);

	/**
	 * Okay, tree complete
	 */

	// set tree element width
	treeEl.style.minWidth = this.findTreeWidth(treeEl) + 'px';

};


/**
 * Add a node to the tree structure
 * Fill out subtree or tile content
 * Recursively add children
 *
 * @param {Object} node         		Data for node and children
 * @param {HTMLElement} containerEl  	Specific container element for node
 * @param {HTMLElement} treeEl       	Overarching tree element for node
 * @param {HTMLElement} linkSourceEl 	(optional) Element to link to node from
 */
Tree.prototype.addTreeNode = function(node, containerEl, treeEl, linkSourceEl) {

	/**
	 * Base case
	 */

	if (!node) return;

	/**
	 * Make node
	 */

	// node element
	var nodeEl;
	nodeEl = document.createElement('div');
	nodeEl.className = 'node';
	containerEl.appendChild(nodeEl);

	// content element
	var contentEl;
	contentEl = document.createElement('div');
	contentEl.className = 'node-content';
	nodeEl.appendChild(contentEl);

	// children element
	var childrenEl;
	childrenEl = document.createElement('div');
	childrenEl.className = 'node-children vertically-center';
	nodeEl.appendChild(childrenEl);

	// subtree or tile?
	if (node.subtree) {

		/**
		 * Node subtree
		 */

		// subtree element
		var subtreeEl;
		subtreeEl = document.createElement('div');
		subtreeEl.className = 'subtree';
		contentEl.appendChild(subtreeEl);

		// recursively build subtree
		this.makeTree(node.subtree, subtreeEl);

		// make link?
		if (linkSourceEl) {
			this.links.push(new Link({
				containerEl: treeEl,
				fromEl: linkSourceEl,
				toEl: subtreeEl
			}));
		}

		// make children?
		if (node.children) {
			node.children.forEach(function (child) {
				this.addTreeNode(
					child,
					childrenEl,
					treeEl,
					subtreeEl
				);
			}, this);
		}

	} else {

		/**
		 * Node tile
		 */

		// tile element
		var tileEl;
		tileEl = document.createElement('div');
		tileEl.className = 'tile vertically-center';
		contentEl.appendChild(tileEl);

		// ghost title element
		// var ghostTitleEl;
		// ghostTitleEl = document.createElement('div');
		// ghostTitleEl.className = 'title';
		// ghostTitleEl.textContent = node.title;
		// ghostTitleEl.style.visibility = 'hidden';
		// tileEl.appendChild(ghostTitleEl);

		// shape element
		var shapeEl;
		shapeEl = document.createElement('div');
		shapeEl.className = 'shape shape-square';
		tileEl.appendChild(shapeEl);

		// level element
		var levelEl;
		levelEl = document.createElement('div');
		levelEl.className = 'level';
		levelEl.textContent = Math.ceil(Math.random() * 5);
		shapeEl.appendChild(levelEl);

		// title element
		var titleEl;
		titleEl = document.createElement('div');
		titleEl.className = 'title';
		titleEl.textContent = node.title;
		shapeEl.appendChild(titleEl);

		// make link?
		if (linkSourceEl) {
			this.links.push(new Link({
				containerEl: treeEl,
				fromEl: linkSourceEl,
				toEl: shapeEl
			}));
		}

		// make children?
		if (node.children) {
			node.children.forEach(function (child) {
				this.addTreeNode(child, childrenEl, treeEl, shapeEl);
			}, this);
		}

	}

};


/**
 * Find this (or any) tree's width
 * based on its .node elements
 *
 * @param {HTMLElement} treeEl 	Tree's element, default to this.treeEl
 * @return {Number}	 			Width of tree, supposedly
 */
Tree.prototype.findTreeWidth = function(treeEl) {

	// default to this tree
	treeEl = treeEl || this.treeEl;

	// looking for min left and max right
	var minLeft = Number.POSITIVE_INFINITY;
	var maxRight = Number.NEGATIVE_INFINITY;

	// check each .node element
	var nodeElList = treeEl.querySelectorAll('.node');
	Array.prototype.forEach.call(nodeElList, function (nodeEl) {

		// measure client bounds
		var bounds = nodeEl.getBoundingClientRect();
		minLeft = Math.min(minLeft, bounds.left);
		maxRight = Math.max(maxRight, bounds.right);

	});

	// width based on bounding rectangles
	return maxRight - minLeft;
};


/**
 * Adjust width and height for .node elements
 * that contain nested subtrees
 *
 * @param {HTMLElement} treeEl 	Tree's element, default to this.treeEl
 */
Tree.prototype.adjustForSubtrees = function (treeEl) {

	// default to this tree
	treeEl = treeEl || this.treeEl;

	// adjust any .subtree elements
	var subtreeElList = treeEl.querySelectorAll(
		'.node > .node-content > .subtree');
	Array.prototype.forEach.call(subtreeElList, function (subtreeEl) {

		// find node containing this subtree
		var nodeEl = subtreeEl.parentNode.parentNode;

		// adjust node size
		nodeEl.style.minWidth = subtreeEl.offsetWidth + 'px';
		nodeEl.style.minHeight = subtreeEl.offsetHeight + 'px';

		// nudge over node children
		Array.prototype.forEach.call(nodeEl.childNodes, function (childEl) {
			if (childEl.className.match(/node-children/)) {
				childEl.style.left = subtreeEl.offsetWidth + 'px';
			}
		});

	});
};


/**
 * Adjust width and height for .node elements
 * that contain tiles
 *
 * @param {HTMLElement} treeEl 	Tree's element, default to this.treeEl
 */
Tree.prototype.adjustForTiles = function (treeEl) {

	// default to this tree
	treeEl = treeEl || this.treeEl;

	// adjust any .subtree elements
	var tileElList = treeEl.querySelectorAll(
		'.node > .node-content > .tile');
	Array.prototype.forEach.call(tileElList, function (tileEl) {

		// find node containing this subtree
		var nodeEl = tileEl.parentNode.parentNode;

		// adjust node size
		nodeEl.style.minWidth = tileEl.offsetWidth + 'px';
		nodeEl.style.minHeight = tileEl.offsetHeight + 'px';

		// nudge over node children
		Array.prototype.forEach.call(nodeEl.childNodes, function (childEl) {
			if (childEl.className.match(/node-children/)) {
				childEl.style.left = tileEl.offsetWidth + 'px';
			}
		});

	});
};


/**
 * Verticall center any marked element in this (or any) tree
 * (any element with "vertically-center" class)
 *
 * @param {HTMLElement} treeEl 	Tree's element, default to this.treeEl
 */
Tree.prototype.verticallyCenterAll = function (treeEl) {

	// default to this tree
	treeEl = treeEl || this.treeEl;

	// adjust any .vertically-center elements
	var elList = treeEl.querySelectorAll('.vertically-center');
	Array.prototype.forEach.call(elList, function (el) {

		// find parent and own height
		var parentHeight = el.parentNode.offsetHeight;
		var selfHeight = el.offsetHeight;

		// center element
		el.style.top = (parentHeight / 2) - (selfHeight / 2) + 'px';

	});

};


/**
 * Update all link elements in this class
 */
Tree.prototype.updateLinks = function() {
	this.links.forEach(function (link) {
		link.updateElement();
	});
};


/**
 * Update all the things in this class
 */
Tree.prototype.updateTree = function() {
	this.adjustForSubtrees();
	//this.adjustForTiles();
	this.verticallyCenterAll();
	this.updateLinks();
};