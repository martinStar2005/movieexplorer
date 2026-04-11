API_KEY = "04f84d8e9c8afcf11aee3a3c46785e77"
BASE_URL = "https://api.themoviedb.org/3"

function loadComponent(id, file) {
    fetch(file)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        });
}


document.addEventListener("DOMContentLoaded", () => {

    loadComponent("navbar", "navbar.html");

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
                    ${movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">` : '<img src="./image/no_image.png" alt="No image available">'}
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
        
    })
})