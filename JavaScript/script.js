let previousScrollPosition = 0;

function isScrollingDown() {
  let goingDown = false;
  let scrollPosition = window.pageYOffset;
  if (scrollPosition > previousScrollPosition) {
    goingDown = true;
  }
  previousScrollPosition = scrollPosition;
  return goingDown;
}

// || NAVIGATION BAR FUNCTIONS
const navbar = document.getElementById("primaryTopnav");
const navHeight = navbar.getBoundingClientRect().height; // using getBoundingClientRect().height makes navbar more modular in CSS (ex. easier to change padding and font size)

function openNavBar() {
  if (navbar.className === "topnav") {
    navbar.className += " responsive";
  } else {
    navbar.className = "topnav";
  }
}

function displaceNavBar() {
  // displace element after navbar
  let body = navbar.nextElementSibling;
  body.style.marginTop = `${navHeight}px`;
  body.style.transition = `all 0.25s ease-out`;
}
displaceNavBar();

function moveNavOnScroll() {
  let body = navbar.nextElementSibling;
  if (isScrollingDown()) {
    // scrolling down should move navbar up
    navbar.className = "topnav"; // close responsive mobile menu if it is open

    navbar.style.transform = `translateY(-${navHeight}px)`;
    body.style.marginTop = 0;
  } else {
    // scrolling up should move navbar down
    navbar.style.transform = `translateY(0)`;
    body.style.marginTop = `${navHeight}px`;
  }
}
window.addEventListener('scroll', moveNavOnScroll);

// || SKILLS LAB (index.html)
const skillsLabBtns = document.querySelectorAll('.lab-overview-btn')
skillsLabBtns.forEach(button => {
  button.addEventListener("click", openLab);
})

function openLab(event) {
  skillsLabBtns.forEach(button => button.classList.remove('active')); // Deactivate all buttons
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
  allTabs.forEach(tab => {
    if (tab.id == newTab) {
      tab.style.display = 'flex';
    } else {
      tab.style.display = 'none';
    }
  })
}

// collaspible menu animation
var coll = document.getElementsByClassName("collapsible");
for (var i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      // document.getElementsByClassName("sign").innerHTML="+";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";


      // document.getElementsByClassName("sign").innerHTML="-";

      // var s = document.createElement("p")
      // var sign = document.createTextNode("-");
      // s.appendChild(sign);
      // document.body.appendChild(s);

    }
  });
}

// function createCalendar(elem, year, month) {
//   let mon = month - 1; // months in JS are 0..11, not 1..12
//   let d = new Date(year, mon);
//   let table = '<table><tr><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></tr><tr>';
//   // spaces for the first row
//   // from Monday till the first day of the month
//   // * * * 1  2  3  4
//   for (let i = 0; i < getDay(d); i++) {
//     table += '<td></td>';
//   }
//   // <td> with actual dates
//   while (d.getMonth() == mon) {
//     table += '<td>' + d.getDate() + '</td>';
//     if (getDay(d) % 7 == 6) { // sunday, last day of week - newline
//       table += '</tr><tr>';
//     }
//     d.setDate(d.getDate() + 1);
//   }
//   // add spaces after last days of month for the last row
//   // 29 30 31 * * * *
//   if (getDay(d) != 0) {
//     for (let i = getDay(d); i < 7; i++) {
//       table += '<td></td>';
//     }
//   }
//   // close the table
//   table += '</tr></table>';
//   elem.innerHTML = table;
// }

// function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
//   let day = date.getDay();
//   if (day == 0) day = 7; // make Sunday (0) the last day
//   return day - 1;
// }

// createCalendar(calendar, 2012, 9);

// SKILLS LAB (skills-lab.html)
let labSlidesContainers = document.getElementsByClassName("lab-slides-container");

for (let i = 0; i < labSlidesContainers.length; i++) {
  let slides = labSlidesContainers[i].getElementsByClassName("labSlides");
  let slideIndex = 0;
  showLabSlides(slides, slideIndex);
}

function showLabSlides(slides, slideIndex) {
  
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";
}

function changeLabSlide(element, n) {

  let slideContainer = element.parentNode; // grab specific slideshow element
  let slides = slideContainer.getElementsByClassName("labSlides");

  // loop through slides to find active slide index
  var slideIndex = Array.from(slides).findIndex(function (slide) {
    return slide.style.display === "block";
  });

  slideIndex += n;
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  } else if (slideIndex >= slides.length) {
    slideIndex = 0;
  }

  showLabSlides(slides, slideIndex);
}