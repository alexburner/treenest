var exampleSkillNode1 = {
    children: [
        {
            "title": "Project Management",
            "type": "Soft Skill",
            "level": 1,
            "children": [
                {
                    "title": "Managing Stakeholders",
                    "type": "Soft Skill",
                    "level": 1,
                    "children": [
                        {
                            "title": "Project Plan",
                            "type": "Hard Skill",
                            "level": 1,
                            "children": [
                                {
                                    "title": "Running Meetings",
                                    "type": "Soft Skill",
                                    "level": 2,
                                    "children": [
                                        {
                                            "title": "Project Charter",
                                            "type": "Hard Skill",
                                            "level": 2,
                                            "children": [

                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

var exampleSkillNode2 = {
    children: [
        {
            "title": "Project Management",
            "type": "Soft Skill",
            "level": 1,
            "children": [
                {
                    "title": "Managing Stakeholders",
                    "type": "Soft Skill",
                    "level": 2,
                    "children": [
                        {
                            "subtree": {
                                "children": [
                                    {
                                        "title": "Managing Stakeholders",
                                        "type": "Soft Skill",
                                        "level": 2,
                                        "children": [

                                        ]
                                    },
                                    {
                                        "title": "Project Charter",
                                        "type": "Hard Skill",
                                        "level": 1,
                                        "children": [

                                        ]
                                    },
                                    {
                                        "title": "Running Meetings",
                                        "type": "Soft Skill",
                                        "level": 1,
                                        "children": [

                                        ]
                                    }
                                ]
                            },
                            "children": [
                                {
                                    "title": "Project Plan",
                                    "type": "Hard Skill",
                                    "level": 1,
                                    "children": [
                                        {
                                            "title": "Running Meetings",
                                            "type": "Soft Skill",
                                            "level": 2,
                                            "children": [

                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

var exampleSkillNode3 = {
    children: [
        {
            "title": "Project Management",
            "type": "Soft Skill",
            "level": 1,
            "children": [
                {
                    "title": "Managing Stakeholders",
                    "type": "Soft Skill",
                    "level": 2,
                    "children": [
                        {
                            "subtree": {
                                "children": [
                                    {
                                        "title": "Running Meetings",
                                        "type": "Soft Skill",
                                        "level": 1,
                                        "children": [
                                            {
                                                "title": "Managing Stakeholders",
                                                "type": "Soft Skill",
                                                "level": 2,
                                                "children": [
                                                    {
                                                        "title": "Project Charter",
                                                        "type": "Hard Skill",
                                                        "level": 1,
                                                        "children": [

                                                        ]
                                                    },
                                                    {
                                                        "title": "Project Charter",
                                                        "type": "Hard Skill",
                                                        "level": 1,
                                                        "children": [

                                                        ]
                                                    },
                                                ]
                                            },
                                            {
                                                "title": "Managing Stakeholders",
                                                "type": "Soft Skill",
                                                "level": 2,
                                                "children": [

                                                ]
                                            },
                                        ]
                                    }
                                ]
                            },
                            "children": [
                                {
                                    "title": "Project Plan",
                                    "type": "Hard Skill",
                                    "level": 1,
                                    "children": [

                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

var exampleSkillNode4 = {
    children: [
        {
            "title": "Project Management",
            "type": "Soft Skill",
            "level": 1,
            "children": [
                {
                    "title": "Managing Stakeholders",
                    "type": "Soft Skill",
                    "level": 2,
                    "children": [
                        {
                            "subtree": {
                                "children": [
                                    {
                                        "title": "Managing Stakeholders",
                                        "type": "Soft Skill",
                                        "level": 2,
                                        "children": [

                                        ]
                                    },
                                    {
                                        "title": "Project Charter",
                                        "type": "Hard Skill",
                                        "level": 1,
                                        "children": [

                                        ]
                                    }
                                ]
                            },
                            "children": [
                                {
                                    "title": "Running Meetings",
                                    "type": "Soft Skill",
                                    "level": 2,
                                    "children": [

                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

var exampleRootNode = {
    children: [
        {
            "title": "Project Coordinator",
            "skillsComplete": 8,
            "skillsTotal": 8,
            "createNodeContent": function (node) {

                var containerEl;
                containerEl = document.createElement('div');
                containerEl.className = 'skillset vertically-center';

                var innerEl;
                innerEl = document.createElement('div');
                innerEl.className = 'inner';
                containerEl.appendChild(innerEl);

                // wait a tick
                // allows container el to be appended to parent tree
                // before constructing & measuring child tree
                setTimeout(function () {

                    // make tree
                    var tree = new Tree({
                        rootNode: exampleSkillNode1,
                        containerEl: innerEl,
                        createNodeContent: createSkillNodeContent
                    });

                    // sneaky title append
                    var titleEl;
                    titleEl = document.createElement('h2');
                    titleEl.className = 'skillset-title';
                    titleEl.textContent = node.title;
                    innerEl.appendChild(titleEl);

                }, 0);

                return containerEl;

            },
            "children": [
                {
                    "title": "Project Manager I",
                    "skillsComplete": 3,
                    "skillsTotal": 9,
                    "createNodeContent": function (node) {

                        var containerEl;
                        containerEl = document.createElement('div');
                        containerEl.className = 'skillset vertically-center';

                        var innerEl;
                        innerEl = document.createElement('div');
                        innerEl.className = 'inner';
                        containerEl.appendChild(innerEl);

                        // wait a tick
                        // allows container el to be appended to parent tree
                        // before constructing & measuring child tree
                        setTimeout(function () {

                            // make tree
                            var tree = new Tree({
                                rootNode: exampleSkillNode2,
                                containerEl: innerEl,
                                createNodeContent: createSkillNodeContent
                            });

                            // sneaky title append
                            var titleEl;
                            titleEl = document.createElement('h2');
                            titleEl.className = 'skillset-title';
                            titleEl.textContent = node.title;
                            innerEl.appendChild(titleEl);

                        }, 0);

                        return containerEl;

                    },
                    "children": [
                        {
                            "title": "Project Manager II",
                            "type": "Hard Skill",
                            "skillsComplete": 0,
                            "skillsTotal": 7,
                            "createNodeContent": function (node) {

                                var containerEl;
                                containerEl = document.createElement('div');
                                containerEl.className = 'skillset vertically-center';

                                var innerEl;
                                innerEl = document.createElement('div');
                                innerEl.className = 'inner';
                                containerEl.appendChild(innerEl);

                                // wait a tick
                                // allows container el to be appended to parent tree
                                // before constructing & measuring child tree
                                setTimeout(function () {

                                    // make tree
                                    var tree = new Tree({
                                        rootNode: exampleSkillNode3,
                                        containerEl: innerEl,
                                        createNodeContent: createSkillNodeContent
                                    });

                                    // sneaky title append
                                    var titleEl;
                                    titleEl = document.createElement('h2');
                                    titleEl.className = 'skillset-title';
                                    titleEl.textContent = node.title;
                                    innerEl.appendChild(titleEl);

                                }, 0);

                                return containerEl;

                            },
                            "children": [
                                {
                                    "title": "Project Manager III",
                                    "type": "Hard Skill",
                                    "skillsComplete": 0,
                                    "skillsTotal": 6,
                                    "createNodeContent": function (node) {

                                        var containerEl;
                                        containerEl = document.createElement('div');
                                        containerEl.className = 'skillset vertically-center';

                                        var innerEl;
                                        innerEl = document.createElement('div');
                                        innerEl.className = 'inner';
                                        containerEl.appendChild(innerEl);

                                        // wait a tick
                                        // allows container el to be appended to parent tree
                                        // before constructing & measuring child tree
                                        setTimeout(function () {

                                            // make tree
                                            var tree = new Tree({
                                                rootNode: exampleSkillNode4,
                                                containerEl: innerEl,
                                                createNodeContent: createSkillNodeContent
                                            });

                                            // sneaky title append
                                            var titleEl;
                                            titleEl = document.createElement('h2');
                                            titleEl.className = 'skillset-title';
                                            titleEl.textContent = node.title;
                                            innerEl.appendChild(titleEl);

                                        }, 0);

                                        return containerEl;

                                    },
                                    "children": [

                                    ]
                                }
                            ]
                        },
                        {
                            "title": "Project Supervisor I",
                            "type": "Hard Skill",
                            "skillsComplete": 0,
                            "skillsTotal": 7,
                            "createNodeContent": function (node) {

                                var containerEl;
                                containerEl = document.createElement('div');
                                containerEl.className = 'skillset vertically-center';

                                var innerEl;
                                innerEl = document.createElement('div');
                                innerEl.className = 'inner';
                                containerEl.appendChild(innerEl);

                                // wait a tick
                                // allows container el to be appended to parent tree
                                // before constructing & measuring child tree
                                setTimeout(function () {

                                    // make tree
                                    var tree = new Tree({
                                        rootNode: exampleSkillNode2,
                                        containerEl: innerEl,
                                        createNodeContent: createSkillNodeContent
                                    });

                                    // sneaky title append
                                    var titleEl;
                                    titleEl = document.createElement('h2');
                                    titleEl.className = 'skillset-title';
                                    titleEl.textContent = node.title;
                                    innerEl.appendChild(titleEl);

                                }, 0);

                                return containerEl;

                            },
                            "children": [
                                {
                                    "title": "Project Supervisor II",
                                    "type": "Hard Skill",
                                    "skillsComplete": 0,
                                    "skillsTotal": 6,
                                    "createNodeContent": function (node) {

                                        var containerEl;
                                        containerEl = document.createElement('div');
                                        containerEl.className = 'skillset vertically-center';

                                        var innerEl;
                                        innerEl = document.createElement('div');
                                        innerEl.className = 'inner';
                                        containerEl.appendChild(innerEl);

                                        // wait a tick
                                        // allows container el to be appended to parent tree
                                        // before constructing & measuring child tree
                                        setTimeout(function () {

                                            // make tree
                                            var tree = new Tree({
                                                rootNode: exampleSkillNode4,
                                                containerEl: innerEl,
                                                createNodeContent: createSkillNodeContent
                                            });

                                            // sneaky title append
                                            var titleEl;
                                            titleEl = document.createElement('h2');
                                            titleEl.className = 'skillset-title';
                                            titleEl.textContent = node.title;
                                            innerEl.appendChild(titleEl);

                                        }, 0);

                                        return containerEl;

                                    },
                                    "children": [

                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};