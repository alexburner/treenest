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
	this.treeEl = null;
	this.nodeEls = [];
	// construction
	this.createNodeContent = args.createNodeContent;
	this.makeTree(args.nodes, args.containerEl);
	this.updateTree();
}


/**
 * STATIC
 *
 * Set .node minimum size based on .inner
 *
 * @param {HTMLElement} nodeEl  The .node to update
 */
Tree.setNodeSize = function (nodeEl) {

	// find .inner
	var innerEl = null;
	Array.prototype.forEach.call(
		nodeEl.childNodes,
		function (childEl) {
			if (childEl.className.match(/inner/)) {
				innerEl = childEl;
			}
		}
	);

	// something went wrong
	if (!innerEl) return;

	// find new dimensions
	// width must be based on .inner
	// but height may be set by .node
	// (if it has many children)
	var newWidth = innerEl.offsetWidth;
	var newHeight = Math.max(
		nodeEl.offsetHeight,
		innerEl.offsetHeight
	);

	// adjust .node and .inner sizes
	nodeEl.style.width = newWidth + 'px';
	nodeEl.style.minHeight = newHeight + 'px';
	innerEl.style.minHeight = newHeight + 'px';

};


/**
 * Create the html/css tree
 *
 * @param {Array} nodes 				Root node children
 * @param {HTMLElement} containerEl 	Element to append tree to
 */
Tree.prototype.makeTree = function (nodes, containerEl) {

	/**
	 * Tree
	 */

	// tree element
	var treeEl;
	treeEl = document.createElement('div');
	treeEl.className = 'tree';
	containerEl.appendChild(treeEl);

	// save reference
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

	// inner element
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

	// subtree or content?
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
			containerEl: subtreeEl,
			createNodeContent: this.createNodeContent
		}));


	} else {

		/**
		 * Node content
		 */

		// delegate element creation to passed function
		var contentEl = this.createNodeContent(node);
		innerEl.appendChild(contentEl);


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
	this.treeEl.style.width = nodeElsSize.width + 'px';
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
	util.verticallyCenterElements(this.treeEl);
	this.updateLinks();
};