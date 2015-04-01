var exampleSkillNode = {
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
                                            // {
                                            //     "title": "Project Plan",
                                            //     "type": "Hard Skill",
                                            //     "level": 2,
                                            //     "children": [

                                            //     ]
                                            // },
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
        }
    ]
};

var exampleRootNode = {
    children: [
        {
            "title": "Project Coordinator",
            "skillsComplete": 8,
            "skillsTotal": 8,
            "children": [
                {
                    "title": "Project Manager I",
                    "skillsComplete": 3,
                    "skillsTotal": 9,
                    "children": [
                        {
                            "createNodeContent": function (node) {

                                var containerEl;
                                containerEl = document.createElement('div');

                                var titleEl;
                                titleEl = document.createElement('h1');
                                titleEl.textContent = node.title;
                                containerEl.appendChild(titleEl);

                                setTimeout(function () {
                                    var tree = new Tree({
                                        rootNode: exampleSkillNode,
                                        containerEl: containerEl,
                                        createNodeContent: createSkillNodeContent
                                    });
                                }, 0);

                                return containerEl;

                            },
                            "title": "Project Manager II",
                            "type": "Hard Skill",
                            "skillsComplete": 0,
                            "skillsTotal": 7,
                            "children": [
                                {
                                    "title": "Project Manager II",
                                    "type": "Hard Skill",
                                    "skillsComplete": 0,
                                    "skillsTotal": 6,
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