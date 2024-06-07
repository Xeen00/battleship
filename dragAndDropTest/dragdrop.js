document.addEventListener('DOMContentLoaded', () => {
    const draggable = document.getElementById('draggable');

    let dragImg;

    draggable.addEventListener('dragstart', (e) => {
        dragImg = createDragImage("Initial Text");
        document.body.appendChild(dragImg);
        e.dataTransfer.setDragImage(dragImg, 50, 50);
    });

    draggable.addEventListener('drag', (e) => {
        if (dragImg) {
            document.body.removeChild(dragImg);
        }
        dragImg = createDragImage("Dragging at (" + e.clientX + ", " + e.clientY + ")");
        document.body.appendChild(dragImg);
        e.dataTransfer.setDragImage(dragImg, 50, 50);
    });

    draggable.addEventListener('dragend', () => {
        if (dragImg) {
            document.body.removeChild(dragImg);
        }
    });

    function createDragImage(text) {
        const img = document.createElement('div');
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.backgroundColor = 'red';
        img.innerHTML = text;
        img.style.color = 'white';
        img.style.display = 'flex';
        img.style.alignItems = 'center';
        img.style.justifyContent = 'center';
        img.style.position = 'absolute';
        img.style.top = '-120px';
        return img;
    }
});