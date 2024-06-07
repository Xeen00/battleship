document.addEventListener('DOMContentLoaded', () => {
    const draggable = document.getElementById('draggable');
    const dropzones = document.querySelectorAll('.dropzone');

    draggable.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
        draggable.classList.add('onDrag');
    });

    draggable.addEventListener('dragend', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
        draggable.classList.remove('onDrag');
    });

    dropzones.forEach(dropzone => {
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('hover');
        });

        dropzone.addEventListener('dragleave', (e) => {
            dropzone.classList.remove('hover');
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData('text/plain');
            const draggable = document.getElementById(data);
            dropzone.appendChild(draggable);
            dropzone.classList.remove('hover');
        });
    });
});