const wrapper = document.querySelector(".Project-Wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".Project-Wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


//////////////////////////TypeWriter Effect////////////////////////////
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

var smallNavItems = document.querySelector(".smallNavItems")
document.querySelector(".fa-bars").addEventListener('click', () => {
    if (smallNavItems.style.display === "none") {
        smallNavItems.style.display = "flex";
    } else {
        smallNavItems.style.display = "none";
    }
})


///////////////////////////////// Project Section ///////////////////////////////
const projects = [
    {
        title: 'Portfolio Website',
        subtitle: 'A website to showcase my Skills',
        img_url: '#',
        source_code: '#',
        live: '#'
    },
    {
        title: 'Ecommerce Website',
        subtitle: 'A website to shop all your needs',
        img_url: '#',
        source_code: '#',
        live: '#'
    },
    {
        title: 'Algorithm Visualizer',
        subtitle: 'Visually showcase how an algorithm works',
        img_url: '#',
        source_code: '#',
        live: '#'
    },
    {
        title: 'Portfolio Website',
        subtitle: 'A website to showcase my Skills',
        img_url: '#',
        source_code: '#',
        live: '#'
    },
    {
        title: 'Portfolio Website',
        subtitle: 'A website to showcase my Skills',
        img_url: '#',
        source_code: '#',
        live: '#'
    },
    {
        title: 'Portfolio Website',
        subtitle: 'A website to showcase my Skills',
        img_url: '#',
        source_code: '#',
        live: '#'
    },
    {
        title: 'Portfolio Website',
        subtitle: 'A website to showcase my Skills',
        img_url: '#',
        source_code: '#',
        live: '#'
    },
    {
        title: 'Portfolio Website',
        subtitle: 'A website to showcase my Skills',
        img_url: '#',
        source_code: '#',
        live: '#'
    },
    {
        title: 'Portfolio Website',
        subtitle: 'A website to showcase my Skills',
        img_url: '#',
        source_code: '#',
        live: '#'
    }
];


projects.forEach(projects => {
    const html = `
            <li class="card">
            <div class="img"><img src="Assets/html-5.png" alt="img" draggable="false"></div>
            <h2>Portfolio website</h2>
            <button>Source Code</button>
            <button>Live</button>
            </li>
    `;
    carousel.insertAdjacentHTML('beforeend', html);
});