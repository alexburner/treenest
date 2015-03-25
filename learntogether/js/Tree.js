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
	this.subtrees = [];
	// elements
	this.containerEl = args.containerEl;
	this.treeEl = null;
	this.nodeEls = [];
	// construction
	this.makeTree(args.nodes);
	this.updateTree();
}


/**
 * STATIC (not tied to class instance)
 * Set .node minimum size based on .inner
 *
 * @param  {HTMLElement} nodeEl  The .node to update
 */
Tree.setNodeSize = function (nodeEl) {

	// find .inner and .children
	var innerEl = null;
	var childrenEl = null;
	Array.prototype.forEach.call(nodeEl.childNodes, function (childEl) {
		if (childEl.className.match(/inner/)) {
			innerEl = childEl;
		} else if (childEl.className.match(/children/)) {
			childrenEl = childEl;
		}
	});

	// something went wrong
	if (!innerEl) return;

	// find new dimensions
	// width must be based on .inner
	// but height may be .node (if it has many children)
	var newWidth = innerEl.offsetWidth;
	var newHeight = Math.max(
		nodeEl.offsetHeight,
		innerEl.offsetHeight
	);

	// adjust .node and .inner sizes
	nodeEl.style.width = newWidth + 'px';
	nodeEl.style.minHeight = newHeight + 'px';
	innerEl.style.minHeight = newHeight + 'px';

	// adjust .children shift
	if (childrenEl) {
		childrenEl.style.left = newWidth + 'px';
	}

};


/**
 * Create the html/css tree
 *
 * @param {Array} nodes 	Root node children
 */
Tree.prototype.makeTree = function (nodes) {

	/**
	 * Tree (will get whole width)
	 */

	// tree element
	var treeEl;
	treeEl = document.createElement('div');
	treeEl.className = 'tree';
	this.containerEl.appendChild(treeEl);
	this.treeEl = treeEl;


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
		this.addTreeNode(node, childrenEl);
	}, this);

};


/**
 * Add a node to the tree structure
 * Fill out subtree or tile content
 * Recursively add children
 *
 * @param {Object} node         		Data for node and children
 * @param {HTMLElement} containerEl  	Specific container element for node
 * @param {HTMLElement} linkSourceEl 	(optional) Element to link to node from
 */
Tree.prototype.addTreeNode = function(node, containerEl, linkSourceEl) {

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
	var innerEl;
	innerEl = document.createElement('div');
	innerEl.className = 'inner';
	nodeEl.appendChild(innerEl);

	// children element
	var childrenEl;
	childrenEl = document.createElement('div');
	childrenEl.className = 'children vertically-center';
	nodeEl.appendChild(childrenEl);

	// save reference
	this.nodeEls.push(nodeEl);

	// subtree or tile?
	if (node.subtree) {

		/**
		 * Node subtree
		 */

		// subtree element
		var subtreeEl;
		subtreeEl = document.createElement('div');
		subtreeEl.className = 'subtree';
		innerEl.appendChild(subtreeEl);

		// make new tree, save reference
		this.subtrees.push(new Tree({
			nodes: node.subtree,
			containerEl: subtreeEl
		}));

	} else {

		/**
		 * Node content
		 */

		// tile element
		var tileEl;
		tileEl = document.createElement('div');
		tileEl.className = 'tile vertically-center';
		innerEl.appendChild(tileEl);

		// shape element
		var shapeEl;
		shapeEl = document.createElement('div');
		shapeEl.className = 'shape shape-square vertically-center';
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

	}

	/**
	 * Make link?
	 */
	if (linkSourceEl) {
		this.links.push(new Link({
			containerEl: this.treeEl,
			fromEl: linkSourceEl,
			toEl: nodeEl
		}));
	}


	/**
	 * Make children?
	 */
	if (node.children) {
		node.children.forEach(function (child) {
			this.addTreeNode(child, childrenEl, nodeEl);
		}, this);
	}

};


/**
 * Update this tree's links
 */
Tree.prototype.updateLinks = function() {
	this.links.forEach(function (link) {
		link.updateElement();
	});
};


/**
 * Update this tree's width
 */
Tree.prototype.updateWidth = function() {
	var nodeElsSize = util.findElementsSize(this.nodeEls);
	this.treeEl.style.minWidth = nodeElsSize.width + 'px';
};


/**
 * Update this tree's .node element sizes
 */
Tree.prototype.updateNodes = function() {
	// order must be reversed!
	// last (deepest) nodes sized first
	this.nodeEls.reverse().forEach(function (nodeEl) {
		Tree.setNodeSize(nodeEl);
	});
};


/**
 * Update this tree's subtrees
 */
Tree.prototype.updateSubtrees = function() {
	this.subtrees.forEach(function (subtree) {
		subtree.updateTree();
	});
};


/**
 * Update all the things in this tree
 */
Tree.prototype.updateTree = function() {
	this.updateSubtrees();
	this.updateNodes();
	this.updateWidth();
	util.verticallyCenterElements(this.containerEl);
	this.updateLinks();
};