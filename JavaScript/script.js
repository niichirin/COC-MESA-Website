const collapsibles = document.querySelectorAll('.collapsible');
collapsibles.forEach( (button) => {
    button.addEventListener('click', toggleCollapsible);
});

/*
const about = document.querySelector('#about-container');
document.addEventListener('scroll', showAbout)
function showAbout() {
    let windowPos = window.scrollY; // position of window

    let aboutPos = about.getBoundingClientRect().top;

    if (aboutPos - windowPos < 0) {
        about.style.opacity = '100%';
        about.style.transform = 'translateY(0)';
    }
}

const results = document.querySelector('#results-container')
document.addEventListener('scroll', showResults)
function showResults() {
    let windowPos = window.scrollY; // position of window

    let resultsPos = results.getBoundingClientRect().top;

    if (resultsPos - windowPos < 0) {
        results.style.opacity = '100%';
        results.style.transform = 'translateY(0)';
    }
}
*/
function toggleCollapsible(e) {
    let button = e.target;
    button.classList.toggle('collapsible-active');

    let content = button.nextElementSibling;
    if (content.style.maxHeight) { // if content shows
        content.style.maxHeight = null; // hide it (remove height)
    } else {
        content.style.maxHeight = `${content.scrollHeight}px`;
        // account for all visible and off-screen content with .scrollHeight
    }
}