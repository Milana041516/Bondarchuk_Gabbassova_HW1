(() => {

    //hamburger menu 
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.menu');

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    })
    
//FAQ 
  const faqs = document.querySelectorAll('.faq');
  faqs.forEach(faq => {
    faq.addEventListener("click", () => {
      faq.classList.toggle('openFaq');
    })
  })
})();