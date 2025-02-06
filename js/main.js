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
                start: "top 40%",
                end: "top 40%",
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

//SWAPI API
(() => {
    const characterBox = document.querySelector('#character-box');
    const baseURL = "https://swapi.dev/api/";

    const filmTemplate = document.querySelector("#film-template");
    const filmCon = document.querySelector("#film-con");
    const loader = document.querySelector("#loader");
    const loader1 = document.querySelector("#loader1");



    function getCharacters() {
        filmCon.innerHTML = "";
        loader1.classList.remove("hidden");
        fetch(`${baseURL}people`)
        .then(response => response.json())
        .then(function(response) {
            loader1.classList.add("hidden");
            console.log(response);

            const characters = response.results;

            
            characters.forEach(character => {
                const characterDiv = document.createElement("div");
                characterDiv.classList.add("character");

                const a = document.createElement("a");

                //get an ID from url for the images for characters
                const img = document.createElement("img");
                const parts = character.url.split("/");
                const id = parts[parts.length - 2];

                img.src = `images/${id}.jpg`;

                // p tag(names of the characters)
                const p = document.createElement("p");
                p.textContent = character.name;

                //a tag
                a.dataset.films = character.films.join(",");

                a.appendChild(img);
                characterDiv.appendChild(a);
                characterDiv.appendChild(p);
                characterBox.appendChild(characterDiv);
            });
        })
        .then(function() {
            const links = document.querySelectorAll(".character a")
            console.log(links);

            links.forEach(function(link) {
                link.addEventListener("click", getMovies);
            })
        })
        .catch(error => {
            console.log(error)
            const errorMessage = document.createElement("p");
            errorMessage.classList.add("error");
            errorMessage.textContent = `Ooops, something went wrong. Please check your internet connection or try again later. Error Message ${error}`;
            characterBox.appendChild(errorMessage);
        })
    }

    function getMovies(e) {
        e.preventDefault();
        filmCon.innerHTML = "";
        loader.classList.remove("hidden");
        const films = e.currentTarget.dataset.films.split(",");

        films.forEach(filmURL => {
        fetch(filmURL)
        .then(response => response.json())
        .then(function(response){
        loader.classList.add("hidden");
            console.log(response);
            const clone = filmTemplate.content.cloneNode(true);
            const filmImg = clone.querySelector(".film-image");
            const filmTitle = clone.querySelector(".film-title");
            const filmDescription = clone.querySelector(".film-description");

            filmImg.src = `images/${response.episode_id}.png`;
            filmTitle.innerHTML = response.title;
            filmDescription.innerHTML = response.opening_crawl;

            filmCon.appendChild(clone);
            filmCon.scrollIntoView({behavior: 'smooth', block: 'start'});
        })

        
        .catch(function(error) {
            console.log(error);
            filmCon.innerHTML = "<p>No movies available for this selection.</p>";
        })

        })

    }

    getCharacters();
})();