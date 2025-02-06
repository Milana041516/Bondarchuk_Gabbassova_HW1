(()=> {
    const prevBtn = document.querySelector('#prev-btn');
    const nextBtn = document.querySelector('#next-btn');
    const slider = document.querySelector('.slider-container');

    let slideWidth = slider.clientWidth;
    let currentIndex = 0;

    function prevSlide() {
        currentIndex--;
        // the same as the above one but with less words currentIndex = currentIndex -1;

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

    function updateSlideWidth() {
        slideWidth = slider.clientWidth;
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

})();