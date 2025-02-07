(()=> {
    const prevBtn = document.querySelector('#prev-btn');
    const nextBtn = document.querySelector('#next-btn');
    const slider = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.character');

    let slidesToShow = 1;
    let slideWidth = slider.clientWidth;
    let currentIndex = 0;

    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = slider.children.length - 1;
        }

        showSlide(currentIndex);
    }

    function nextSlide() {
        currentIndex++;

        if (currentIndex >= slider.children.length) {
            currentIndex = 0;
        }

        showSlide(currentIndex);
    }

    function getSlidesToShow() {
        if (window.innerWidth >= 1200) {
            return 3; 
        } else if (window.innerWidth >= 768) {
            return 2; 
        } else {
            return 1; 
        }
    }

    function updateSlideWidth() {
        slidesToShow = getSlidesToShow();
        slideWidth = slider.clientWidth / slidesToShow;
        showSlide(currentIndex);
    }

    function showSlide(index) {
        console.log(index);
        const newTransformValue = -index * slideWidth + 'px';

        slider.style.transform = `translateX(${newTransformValue})`;
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    window.addEventListener('resize', updateSlideWidth);

    updateSlideWidth();
})();