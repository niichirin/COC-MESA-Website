function openNavBar() {
    let navbar = document.getElementById("primaryTopnav");
    if (navbar.className === "topnav") {
        navbar.className += " responsive";
    } else {
        navbar.className = "topnav";
    }
  }

const skillsLabBtns = document.querySelectorAll('.lab-overview-btn')
skillsLabBtns.forEach( button => {
    button.addEventListener("click", openLab);
})

function openLab(event) {
    skillsLabBtns.forEach ( button => button.classList.remove('active')); // Deactivate all buttons
    const pressedBtn = event.target; // Obtain button element
    pressedBtn.classList.add('active') // Add active styles to pressedBtn

    // Assign button text to corresponding tab id
    const tabChoice = pressedBtn.textContent;
    let newTab = '';
    switch (tabChoice) {
        case 'Biology/Chemistry': 
            newTab = 'biology-tab';
            break;
        case 'Engineering': 
            newTab = 'engineering-tab';
            break;
        case 'Physics': 
            newTab = 'physics-tab';
            break;
        case 'Coding': 
            newTab = 'coding-tab';
            break;
    }

    // Get all tabs
    const allTabs = document.querySelectorAll('.lab-overview-tab');
    // Loop through tabs
    allTabs.forEach( tab => {
        if (tab.id == newTab) {
            tab.style.display = 'flex';
        } else {
            tab.style.display = 'none';
        }
    })
}