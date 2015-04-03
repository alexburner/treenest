/**
 * Create node content for job/skill canvas
 *
 * @param  {Object} node  		Node data for content
 * @return {HTMLElement}    	Created element
 */
function createSkillsetNodeContent(node) {

	// skillset element
    var skillsetEl;
    skillsetEl = document.createElement('div');
    skillsetEl.className = 'skillset vertically-center';

    // inner element
    var innerEl;
    innerEl = document.createElement('div');
    innerEl.className = 'inner';
    skillsetEl.appendChild(innerEl);

    // title element
    var titleEl;
    titleEl = document.createElement('h2');
    titleEl.className = 'skillset-title';
    titleEl.textContent = node.title;
    innerEl.appendChild(titleEl);

    // make skill tree
    // but wait a tick
    // allows container el to be appended to parent tree
    // before constructing & measuring child tree
    setTimeout(function () {
        var tree = new Tree({
            rootNode: node.skillset,
            containerEl: innerEl,
            createNodeContent: createSkillNodeContent
        });
    }, 0);

    // return top level
    return skillsetEl;

}


/**
 * Create node content for skill canvas
 *
 * @param  {Object} node  		Node data for content
 * @return {HTMLElement}    	Created element
 */
function createSkillNodeContent(node) {

	// skill element
	var skillEl;
	skillEl = document.createElement('div');
	skillEl.className = 'skill vertically-center';

	// shape element
	var shapeEl;
	shapeEl = document.createElement('a');
	shapeEl.className = 'shape';
	switch (node.type) {
		case "Soft Skill":
			shapeEl.className += " shape-circle";
			break;
		case "Hard Skill":
			shapeEl.className += " shape-square";
			break;
	}


	// testing click events
	shapeEl.addEventListener('click', function (e) {
		e.preventDefault();
		alert(node.title + ': Level ' +node.level);
	});


	// level element
	var levelEl;
	levelEl = document.createElement('div');
	levelEl.className = 'level';
	levelEl.textContent = node.level;

	// title element
	var titleEl;
	titleEl = document.createElement('div');
	titleEl.className = 'title';
	titleEl.textContent = node.title;

	// assembly
	skillEl.appendChild(shapeEl);
	shapeEl.appendChild(levelEl);
	shapeEl.appendChild(titleEl);

	// return top level
	return skillEl;

}


/**
 * Create node content for job canvas
 *
 * @param  {Object} node  		Node data for content
 * @return {HTMLElement}    	Created element
 */
function createJobNodeContent(node) {

	// job element
	var jobEl;
	jobEl = document.createElement('div');
	jobEl.className = 'job vertically-center';

	// shape element
	var shapeEl;
	shapeEl = document.createElement('a');
	shapeEl.className = 'shape';

	// title element
	var titleEl;
	titleEl = document.createElement('div');
	titleEl.className = 'title vertically-center';
	titleEl.textContent = node.title;

	// progress element
	var progressEl;
	progressEl = document.createElement('div');
	progressEl.className = 'progress';
	progressEl.textContent = node.skillsComplete + ' / ' + node.skillsTotal;

	// assembly
	jobEl.appendChild(shapeEl);
	shapeEl.appendChild(titleEl);
	shapeEl.appendChild(progressEl);

	// return top level
	return jobEl;

}