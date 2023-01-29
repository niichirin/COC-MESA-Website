const collapsibleBtns = document.querySelectorAll('.collapsible-btn');
collapsibleBtns.forEach( (button) => {
    button.addEventListener('click', toggleCollapsible);
});

/*
function toggleCollapsible(e) {
    let button = e.target;
    button.classList.toggle('collapsible-btn-active');

    let content = button.nextElementSibling;
    if (content.style.maxHeight) { // if content shows
        content.style.maxHeight = null; // hide it (remove height)
    } else {
        content.style.maxHeight = `${content.style.height}px`;

        // account for all visible and off-screen content with .scrollHeight
    }
}
*/

const skillsLabTabs = document.querySelectorAll('.skills-lab-tab');
const skillsLabBtns = document.querySelectorAll('skills-lab-btn')

/* GUIDE for changing lab displays: https://www.w3schools.com/howto/howto_js_expanding_grid.asp */
function openLab(newTab) {
    skillsLabTabs.forEach( tab => {
        if (tab.id != newTab) {
            tab.style.display = 'none';
        } else {
            tab.style.display = 'block';
        }
    })
}

function closeLab(currentTab) {
    skillsLabTabs.forEach( tab => {
        if (tab.id == currentTab) tab.style.display = 'none';
    });
}