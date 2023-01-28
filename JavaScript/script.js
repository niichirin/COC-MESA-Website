const collapsibleBtns = document.querySelectorAll('.collapsible-btn');
collapsibleBtns.forEach( (button) => {
    button.addEventListener('click', toggleCollapsible);
});

function toggleCollapsible(e) {
    let button = e.target;
    button.classList.toggle('collapsible-btn-active');

    let content = button.nextElementSibling;
    if (content.style.maxHeight) { // if content shows
        content.style.maxHeight = null; // hide it (remove height)
    } else {
        content.style.maxHeight = `${content.scrollHeight}px`;
        // account for all visible and off-screen content with .scrollHeight
    }
}