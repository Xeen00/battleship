document.addEventListener('DOMContentLoaded', () => {
    const draggable = document.getElementById('draggable');
    const dropzones = document.getElementsByClassName('dropzone');
    let dragImg = null



    draggable.addEventListener('dragstart', (e) => {
        dragImg = createDragImage("");
        document.body.appendChild(dragImg);
        e.dataTransfer.setDragImage(dragImg, 50, 50);
        dragImg = createDragImage("Dragging at (" + e.clientX + ", " + e.clientY + ")");
        document.body.appendChild(dragImg);
    });

    draggable.addEventListener('drag', (e) => {
        e.dataTransfer.setDragImage(dragImg, 50, 50);
        dragImg.innerHTML = "Dragging at (" + e.clientX + ", " + e.clientY + ")";
    });

    draggable.addEventListener('dragend', () => {
        if (dragImg) {
            //document.body.removeChild(dragImg);
        }
    });

    for (let dropzone of dropzones) {
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            //console.log(dragImg);
            // dropzone.classList.add('hover');
            // dropzone.style.borderColor = 'green';
        });

        dropzone.addEventListener('dragenter', (e) => {
            console.log(dragImg);
            const d = document.getElementById('dragImg');
            d.classList.add('onDragOver');
        });

        dropzone.addEventListener('dragleave', (e) => {
            dropzone.style.borderColor = 'grey';
            dropzone.classList.remove('hover');
            draggable.style.opacity = 1;
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            if (dragImg) {
                document.body.removeChild(dragImg);
            }
            dropzone.appendChild(draggable);
            dropzone.style.borderColor = 'grey';
        });
    }

    function createDragImage(text) {
        const img = document.createElement('div');
        img.id = 'dragImg';
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.backgroundColor = 'blue';
        img.innerHTML = text;
        img.style.color = 'white';
        img.style.display = 'flex';
        img.style.alignItems = 'center';
        img.style.justifyContent = 'center';
        img.style.position = 'absolute';
        img.style.top = '120px';
        return img;
    }
});