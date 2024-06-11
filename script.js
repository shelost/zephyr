document.addEventListener('DOMContentLoaded', function() {
    // Initialize Gridstack
    var grid = GridStack.init({
        //cellHeight: 50, // Adjust the height to fit your aspect ratio needs
        margin: 5,
        column: 8,
        row: 12, // Number of columns in the grid
        float: true, // Allow items to float when resized
        placeholder_class: 'grid-stack-placeholder',
    });

    const page =  document.getElementById('grid')
    page.addEventListener('mouseenter', e => {
        page.classList.add('hover')
    })
    page.addEventListener('mouseleave', e => {
        page.classList.remove('hover')
    })

    /*
    const serializedData = [
        {x: 0, y: 0, w: 6, h: 3, content: `https://placeholder.co/400`, type: 'img'},
        {x: 0, y: 3, w: 6, h: 3, content: `A New Kind of Page Builder`, type: 'text'},
        {x: 0, y: 6, w: 6, h: 3, content: 'https://placeholder.co/400', type: 'img'}
    ];
    */


    const serializedData = [
        {x: 3, y: 1, w: 5, h: 8, content: `https://placeholder.co/400`, type: 'img'},
        { x: 0, y: 0, w: 8, h: 2, content: `INTRODUCING`, type: 'title' },
        { x: 0, y: 2, w: 3, h: 2, content: `A NEW WAY`, type: 'title' },
        {x: 0, y: 5, w: 3, h: 2, content: `A NEW WAY`, type: 'title'},
        {x: 0, y: 10, w: 8, h: 2, content: 'https://placeholder.co/400', type: 'img'}
    ];

    // Function to set up event listeners for textarea
    function setupTextareaEvents(widget) {
        const textarea = widget.querySelector('textarea');
        let clickCount = 0;

        // Function to handle clicks
        const handleClick = function (e) {

            console.log(clickCount)

            e.preventDefault();
            e.stopPropagation();

            clickCount++;

            if (clickCount > 1) {
                console.log('yo')
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

    // Load the serialized data with content
    serializedData.forEach(function (node) {
        let c = null;

        switch (node.type) {
            case 'text':
                c = `<textarea class="item item-input" readonly>${node.content || 'New Widget'}</textarea>`;
                break;
            case 'title':
                c = `<textarea class="item item-input item-title" readonly>${node.content || 'New Widget'}</textarea>`;
                break;
            case 'img':
                c = `<div class="item item-img" style="background-image:url(${node.content})"></div>`;
                break;
            default:
                c = `<div class="item">${node.content || 'New Widget'}</div>`;
                break;
        }

        const widget = grid.addWidget(`<div><div class="grid-stack-item-content">${c}</div></div>`, node);

        if (node.type === 'text' || node.type == 'title') {

            setupTextareaEvents(widget);
        }
    });







    console.log('Gridstack initialized and data loaded');
});



/*

<!--
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href = 'styles.css' rel = 'stylesheet'>
    <link href="node_modules/gridstack/dist/gridstack.min.css" rel="stylesheet"/>
    <link href="node_modules/gridstack/dist/gridstack-extra.min.css" rel="stylesheet"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Onest:wght@100;200;300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Manrope:wght@200;300;400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

</head>
<body>

    <div id = 'main'>

        <div id = 'grid' class="grid-stack"></div>
        <div id = 'bro'></div>
    </div>


</body>
<script src="node_modules/gridstack/dist/gridstack-all.js"></script>
<script src = 'script.js'></script>
</html>
-->

*/