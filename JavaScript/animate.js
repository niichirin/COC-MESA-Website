// IntersectionObserver API
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
console.log("Loaded animate.js");

const callback = entries => {
    // Runs when visibility of observed elements changes
    entries.forEach( entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('show')) {
            entry.target.classList.add('show');
        } // show and dont hide it anymore
    })
}
const options = {
    // root:
    // rootMargin:
    threshold: 0.40 // 50% of the element must be viewed to animate
}

const observer = new IntersectionObserver(callback, options);

const hiddenElements = document.querySelectorAll('.hidden'); // Obtain hidden elements
hiddenElements.forEach((element) =>  observer.observe(element)); // Observe visibility of hidden elements