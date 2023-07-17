///////////////////////////////// Project Section ///////////////////////////////
const projects = [
    {
        title: 'Portfolio Website',
        subtitle: 'A website to showcase my Skills',
        img_url: 'Assets/Portfolio-Image.png',
        source_code: 'https://github.com/Mukulninjas/portfolio',
        live: 'https://mukulninjas.github.io/portfolio/#project'
    },
    {
        title: 'IT Ticketing',
        subtitle: 'Ticketing app to handle IT support workload',
        img_url: 'Assets/Ticketing-Image.png',
        source_code: 'https://bitbucket.org/WittyIT/witty-ticketing/src/master/v',
        live: 'https://mukulninjas.github.io/portfolio/#project'
    },
    {
        title: 'Sorting Visualizer',
        subtitle: 'Visualization of different sorting algorithm',
        img_url: 'Assets/Algo-Visualizer.png',
        source_code: 'https://github.com/Mukulninjas/sorting-algo',
        live: 'https://mukulninjas.github.io/sorting-algo/'
    }
];

var ulElement = document.querySelector('.Project-Carousel');
for (var j = 0; j < projects.length; j++) {
    var project = projects[j];
    var liElement = document.createElement('li');
    liElement.classList.add('Project-Card');
    liElement.classList.add('card');
    var html = `<div class="img"><img src="${project.img_url}" alt="${project.title}"/></div><div class="project-info"><h2>${project.title}</h2><p>${project.subtitle}</p><div class="project-links"><a class="Source-Code button" href="${project.source_code}">Source Code</a><a class="Live-Demo button" href="${project.live}">Live Demo</a></div></div>`;
    liElement.innerHTML = html;
    ulElement.appendChild(liElement);
}

/////////////////////////////////////////////////////////////////////////////
const projectWrapper = document.querySelector(".Project-Wrapper");
const projectCarousel = document.querySelector(".Project-Carousel");
const firstCardWidth = projectCarousel.querySelector(".Project-Card").offsetWidth;
const arrowBtns = document.querySelectorAll(".Project-Wrapper i");
const carouselChildrens = [...projectCarousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(projectCarousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    projectCarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    projectCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
projectCarousel.classList.add("no-transition");
projectCarousel.scrollLeft = projectCarousel.offsetWidth;
projectCarousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        projectCarousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    projectCarousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = projectCarousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    projectCarousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    projectCarousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (projectCarousel.scrollLeft === 0) {
        projectCarousel.classList.add("no-transition");
        projectCarousel.scrollLeft = projectCarousel.scrollWidth - (2 * projectCarousel.offsetWidth);
        projectCarousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (Math.ceil(projectCarousel.scrollLeft) === projectCarousel.scrollWidth - projectCarousel.offsetWidth) {
        projectCarousel.classList.add("no-transition");
        projectCarousel.scrollLeft = projectCarousel.offsetWidth;
        projectCarousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if (!projectWrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => projectCarousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

projectCarousel.addEventListener("mousedown", dragStart);
projectCarousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
projectCarousel.addEventListener("scroll", infiniteScroll);
projectWrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
projectWrapper.addEventListener("mouseleave", autoPlay);


/////////////TypeWriter Effect////////////////////////////
const words = ["Software Developer", "Web Developer", "Web Designer", "UI/UX Designer"];
let i = 0;
let timer;

function typeWriter() {
    const heading = document.getElementById("typewriter");
    const word = words[i];
    const speed = 250;

    if (heading.textContent.length < word.length) {
        heading.textContent += word.charAt(heading.textContent.length);
        timer = setTimeout(typeWriter, speed);
    } else {
        clearTimeout(timer);
        setTimeout(deleteText, speed * 2);
    }
}

function deleteText() {
    const heading = document.getElementById("typewriter");
    const word = words[i];
    const speed = 75;

    if (heading.textContent.length > 0) {
        heading.textContent = word.substring(0, heading.textContent.length - 1);
        timer = setTimeout(deleteText, speed);
    } else {
        i = (i + 1) % words.length;
        setTimeout(typeWriter, speed * 2);
    }
}

typeWriter();