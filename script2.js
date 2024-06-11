document.addEventListener('DOMContentLoaded', function() {
    let gridstackCounter = 4;
    const gridstackContainer = document.getElementById('main');
    const gridstackConfigurations = {
        gridstack0: [
            { x: 0, y: 0, w: 2, h: 1, content: `assets/stan-mini.svg`, type: 'img' },
            {x: 3, y: 1, w: 5, h: 8, content: `assets/shoe3.png`, type: 'img'},
            { x: 0, y: 1, w: 8, h: 1, content: `INTRODUCING`, type: 'title' },
            { x: 0, y: 3, w: 3, h: 2, content: `A NEW WAY`, type: 'title' },
            {x: 0, y: 6, w: 3, h: 3, content: `TO BUILD PAGES`, type: 'title'},
            { x: 0, y: 10, w: 8, h: 2, content: 'assets/stan-button.svg', type: 'img' }
        ],
        gridstack1: [
            {x: 0, y: 0, w: 8, h: 8, content: 'https://images.unsplash.com/photo-1490604001847-b712b0c2f967?q=80&w=2753&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'img'},
            { x: 0, y: 8, w: 8, h: 1, content: 'CALIFORNIA', type: 'title' },
            {x: 0, y: 9, w: 8, h: 3, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.', type: 'text'}
        ],
        grid: [
            {x: 0, y: 0, w: 4, h: 4, content: 'https://images.unsplash.com/photo-1490604001847-b712b0c2f967?q=80&w=2753&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'img'},
            {x: 4, y: 0, w: 4, h: 4, content: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'img'},

            {x: 0, y: 4, w: 4, h: 4, content: 'https://images.unsplash.com/photo-1536152470836-b943b246224c?q=80&w=2838&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'img'},
            {x: 4, y: 4, w: 4, h: 4, content: 'https://images.unsplash.com/photo-1513875528452-39400945934d?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'img'},
            {x: 0, y: 8, w: 4, h: 4, content: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=3003&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'img'},
            {x: 4, y: 8, w: 4, h: 4, content: 'https://images.unsplash.com/photo-1559666126-84f389727b9a?q=80&w=2954&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'img'},

        ],
        gridstack2: [
            {x: 0, y: 0, w: 6, h: 3, content: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'img'},
            {x: 0, y: 3, w: 6, h: 3, content: 'Another Page Builder', type: 'text'}
        ]
    };



    // Function to initialize a Gridstack instance
    function initializeGridstack(id, serializedData) {
        const grid = GridStack.init({
            cellHeight: 50,
            margin: 4,
            column: 8,
            row: 12,
            float: true,
            placeholder_class: 'grid-stack-placeholder',
            acceptWidgets: true
        }, `#${id}`); // Bind GridStack to the specific container

        serializedData.forEach(function (node) {
            let content = null;
            switch (node.type) {
                case 'text':
                    content = `<textarea class="item item-input" readonly>${node.content || 'New Widget'}</textarea>`;
                    break;
                case 'title':
                    content = `<textarea class="item item-input item-title" readonly>${node.content || 'New Widget'}</textarea>`;
                    break;
                case 'img':
                    content = `<div class="item item-img" style="background-image:url(${node.content})"></div>`;
                    break;
                default:
                    content = `<div class="item">${node.content || 'New Widget'}</div>`;
                    break;
            }

            const widget = grid.addWidget(`<div><div class="grid-stack-item-content">${content}</div></div>`, node);

            if (node.type == 'text' || node.type == 'title') {
                setupTextareaEvents(widget, grid);
            }
        });
    }

    // Function to set up event listeners for textarea
    function setupTextareaEvents(widget, grid) {
        const textarea = widget.querySelector('.item-input');
        let clickCount = 0;

        // Function to handle clicks
        const handleClick = function (e) {
            e.preventDefault();
            e.stopPropagation();

            clickCount++;
            if (clickCount > 1) {
                textarea.style.pointerEvents = 'auto';
                textarea.removeAttribute('readonly');
                textarea.focus();
            }
        };

        // Click event to control pointer-events and readonly
        widget.addEventListener('click', handleClick);

        // Blur event to reset clickCount and disable editing
        textarea.addEventListener('blur', function() {
            textarea.style.pointerEvents = 'none';
            textarea.setAttribute('readonly', true);
            clickCount = 0; // Reset click count on blur
        });

        // Drag and resize events to reset clickCount
        grid.on('dragstop', function(event, el) {
            if (el === textarea.closest('.grid-stack-item')) {
                textarea.style.pointerEvents = 'none';
                textarea.setAttribute('readonly', true);
                clickCount = 0;
            }
        });

        grid.on('resizestop', function(event, el) {
            if (el === textarea.closest('.grid-stack-item')) {
                textarea.style.pointerEvents = 'none';
                textarea.setAttribute('readonly', true);
                clickCount = 0;
            }
        });
    }

    // Function to render all Gridstacks
    function renderGridstacks() {
        Object.keys(gridstackConfigurations).forEach(id => {
            if (!document.getElementById(id)) {
                const gridElement = document.createElement('div');
                gridElement.id = id;
                gridElement.className = 'grid-stack';
                const container = document.createElement('div');
                container.id = 'container' + id;
                container.className = 'container';
                container.appendChild(gridElement);
                gridstackContainer.appendChild(container);
                initializeGridstack(id, gridstackConfigurations[id]);
            }
        });
    }

    // Initial render
    renderGridstacks();

    // Add new Gridstack on button click

    for (let i = 0; i < document.getElementsByClassName('add-page').length; i++){
        let button = document.getElementsByClassName('add-page')[i]

        button.addEventListener('click', function() {
            gridstackCounter++;
            const newGridstackId = `gridstack${gridstackCounter}`;

            let config = []



            switch (button.id) {
                case 'add-1':
                    config = [
                        {x: 0, y: 0, w: 4, h: 4, content: 'https://images.unsplash.com/photo-1490604001847-b712b0c2f967?q=80&w=2753&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'img'},
                        {x: 4, y: 0, w: 4, h: 4, content: 'https://images.unsplash.com/photo-1490604001847-b712b0c2f967?q=80&w=2753&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'img'},

                        {x: 0, y: 4, w: 4, h: 4, content: 'https://images.unsplash.com/photo-1490604001847-b712b0c2f967?q=80&w=2753&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'img'},
                        {x: 4, y: 4, w: 4, h: 4, content: 'https://images.unsplash.com/photo-1490604001847-b712b0c2f967?q=80&w=2753&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'img'},
                        {x: 0, y: 8, w: 4, h: 4, content: 'https://images.unsplash.com/photo-1490604001847-b712b0c2f967?q=80&w=2753&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'img'},
                        {x: 4, y: 8, w: 4, h: 4, content: 'https://images.unsplash.com/photo-1490604001847-b712b0c2f967?q=80&w=2753&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'img'},
                    ]
                    break
                default:
                    break
            }

            gridstackConfigurations[newGridstackId] = config
            let main =  document.getElementById('main')

            renderGridstacks();
            main.scrollTo({top: main.scrollHeight, left: 0, behavior: 'smooth'})
        });
    }


    for (let i = 0; i < document.getElementsByClassName('grid-stack').length; i++){
        let page = document.getElementsByClassName('grid-stack')[i]


            page.addEventListener('mouseenter', e => {
                page.classList.add('hover')
            })
            page.addEventListener('mouseleave', e => {
                page.classList.remove('hover')
            })

    }

    console.log('Gridstack initialized and data loaded');
});










