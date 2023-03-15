// || NAVIGATION BAR FUNCTIONS
function openNavBar() {
    let navbar = document.getElementById("primaryTopnav");
    if (navbar.className === "topnav") {
        navbar.className += " responsive";
    } else {
        navbar.className = "topnav";
    }
  }

function displaceNavBar() {
  // obtain navbar height
  let navbar = document.querySelector("#primaryTopnav");
  let navHeight = `${navbar.getBoundingClientRect().height}px`;

  // displace element after navbar
  let body = navbar.nextElementSibling;
  body.style.marginTop = navHeight;
}

displaceNavBar();

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

//collaspible menu animation
var coll = document.getElementsByClassName("collapsible");
for(var i=0; i < coll.length; i++){
    coll[i].addEventListener("click", function(){
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if(content.style.maxHeight){
            content.style.maxHeight = null;
            // document.getElementsByClassName("sign").innerHTML="+";
        } else{
            content.style.maxHeight = content.scrollHeight + "px";
            
            
            // document.getElementsByClassName("sign").innerHTML="-";

            // var s = document.createElement("p")
            // var sign = document.createTextNode("-");
            // s.appendChild(sign);
            // document.body.appendChild(s);

        }
    });
}


function createCalendar(elem, year, month) {
  let mon = month - 1; // months in JS are 0..11, not 1..12
  let d = new Date(year, mon);
  let table = '<table><tr><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></tr><tr>';
  // spaces for the first row
  // from Monday till the first day of the month
  // * * * 1  2  3  4
  for (let i = 0; i < getDay(d); i++) {
    table += '<td></td>';
  }
  // <td> with actual dates
  while (d.getMonth() == mon) {
    table += '<td>' + d.getDate() + '</td>';
    if (getDay(d) % 7 == 6) { // sunday, last day of week - newline
      table += '</tr><tr>';
    }
    d.setDate(d.getDate() + 1);
  }
  // add spaces after last days of month for the last row
  // 29 30 31 * * * *
  if (getDay(d) != 0) {
    for (let i = getDay(d); i < 7; i++) {
      table += '<td></td>';
    }
  }
  // close the table
  table += '</tr></table>';
  elem.innerHTML = table;
}
function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
  let day = date.getDay();
  if (day == 0) day = 7; // make Sunday (0) the last day
  return day - 1;
}

createCalendar(calendar, 2012, 9);
