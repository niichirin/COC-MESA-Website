const collapsibles = document.querySelectorAll('.collapsible');

collapsibles.forEach( (button) => {
    button.addEventListener('click', toggleCollapsible);
});

function toggleCollapsible(e) {
    let button = e.target;
    button.classList.toggle('active');

    let content = button.nextElementSibling;
    if (content.style.display === 'block') {
        content.style.display = 'none';
    } else {
        content.style.display = 'block';
    }
}