function openNavBar() {
    let navbar = document.getElementById("primaryTopnav");
    if (navbar.className === "topnav") {
        navbar.className += " responsive";
    } else {
        navbar.className = "topnav";
    }
  }

const skillsLabTabs = document.querySelectorAll('.lab-overview-tab');
/* GUIDE for changing lab displays: https://www.w3schools.com/howto/howto_js_expanding_grid.asp */
function openLab(newTab) {
    skillsLabTabs.forEach( tab => {
        if (tab.id != newTab) {
            tab.style.display = 'none';
        } else {
            tab.style.display = 'flex';
        }
    })
}

function closeLab(currentTab) {
    skillsLabTabs.forEach( tab => {
        if (tab.id == currentTab) tab.style.display = 'none';
    });
}