function openNavBar() {
    let navbar = document.getElementById("primaryTopnav");
    if (navbar.className === "topnav") {
        navbar.className += " responsive";
    } else {
        navbar.className = "topnav";
    }
  }

const skillsLabTabs = document.querySelectorAll('.lab-overview-tab');
const skillsLabBtns = document.querySelectorAll('lab-overview-btn')

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