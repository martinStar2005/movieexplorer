const API_KEY = "04f84d8e9c8afcf11aee3a3c46785e77";
const BASE_URL = "https://api.themoviedb.org/3";

function loadComponent(id, file, callback) {
    fetch(file)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback(); 
        });
}

document.addEventListener("DOMContentLoaded", () => {

    loadComponent("navbar", "navbar.html", initApp);
    loadComponent("footer", "footer.html");

    function initApp() {
        initHamburger();
    }

    
    function initHamburger() {

        const hamburger = document.getElementById("hamburger");
        const overlay = document.querySelector(".overlay");
        const closeBtn = document.querySelector(".close");

        if (!hamburger || !overlay || !closeBtn) return;

        hamburger.addEventListener("click", () => {
            overlay.style.display = "flex";
            document.body.style.overflow = "hidden";
        });

        closeBtn.addEventListener("click", () => {
            overlay.style.display = "none";
            document.body.style.overflow = "auto";
        });

        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                overlay.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    }

    fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        if (!data.results || data.results.length === 0) {
            const main = document.querySelector("#main-upcoming");
            main.innerHTML = "<p>No upcoming movies found.</p>";
            return;
        } else {
            const main = document.querySelector("#main-upcoming");
            const grid = document.createElement("div");
            grid.className = "movie-grid";

            data.results.forEach(movie => {
                const card = document.createElement("div");
                card.className = "movie-card";
                card.innerHTML = `
                    ${movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" srcset="https://image.tmdb.org/t/p/w200${movie.poster_path} 1x, https://image.tmdb.org/t/p/w400${movie.poster_path} 2x" alt="${movie.title} poster">` : '<img src="./image/no_image.png" alt="No image available">'}
                    <h3>${movie.title}</h3>
                    <p><strong><i class="fa-solid fa-calendar"></i></strong> ${movie.release_date || "N/A"}</p>
                    <p><strong><i class="fa-solid fa-star"></i></strong> ${movie.vote_average ? movie.vote_average + " / 10" : "No rating"}</p>
                `;
                grid.appendChild(card);
                card.addEventListener("click", () => {
                        window.location.href = `details.html?id=${movie.id}`;
                    })
            });

            main.appendChild(grid);
        }
        
    }).catch(error => {
        
        const main = document.querySelector("#main-upcoming");
        main.innerHTML = "<p>Something went wrong.</p>";

})})