(() => {

    //hamburger menu 
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.menu');

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    })
    
    //scrolling links
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


    const navLinks = document.querySelectorAll('#nav-menu ul li a');

    function scrollLink(e) {
        e.preventDefault();
        console.log(e.currentTarget.hash);
        let selectedLink = e.currentTarget.hash;
        gsap.to(window, {duration: 1, scrollTo:{y:`${selectedLink}`, offsetY: 100}});
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", scrollLink);
    });

    //card appearing

    const statisticsCards = document.querySelectorAll('.box-statistics');

    statisticsCards.forEach((card) => {
        gsap.set(card, {
            opacity: 0,
            y: 50
        });

        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 2,
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 30%",
                toggleActions: "play none none reverse",
                markers: false
            }
        });
    });

    //FAQ 
     const faqs = document.querySelectorAll('.faq');
    faqs.forEach(faq => {
    faq.addEventListener("click", () => {
      faq.classList.toggle('openFaq');
    })
    })
})();