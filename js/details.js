const API_KEY = "04f84d8e9c8afcf11aee3a3c46785e77";
const BASE_URL = "https://api.themoviedb.org/3";

document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const movieId = params.get("id");
    const main = document.querySelector("#main");

    fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(movie => {
            console.log(movie);
            const div = document.createElement("div");
            div.innerHTML = `
                <h1> Movie title : <span>${movie.title}</span></h1>
                <div class="description">
                    ${movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" srcset="https://image.tmdb.org/t/p/w200${movie.poster_path} 1x, https://image.tmdb.org/t/p/w400${movie.poster_path} 2x" alt="${movie.title} poster">` : "<p>No poster available</p>"}
                    <p>${movie.overview}</p>

                    <div class="overview">
                        
                        <p><strong><i class="fa-solid fa-calendar"></i></strong> 
                        ${movie.release_date || "N/A"}</p>

                        <p><strong><i class="fa-solid fa-star"></i></strong> 
                        ${movie.vote_average ? movie.vote_average + " / 10" : "No rating"}</p>

                        <p><strong><i class="fa-solid fa-tags"></i></strong> 
                        ${movie.genres?.length ? movie.genres.map(g => g.name).join(", ") : "No genres"}</p>

                        <p><strong><i class="fa-solid fa-language"></i></strong> 
                        ${movie.original_language ? movie.original_language.toUpperCase() : "N/A"}</p>

                        <p><strong><i class="fa-solid fa-clock"></i></strong> 
                        ${movie.runtime ? movie.runtime + " min" : "Unknown"}</p>
                    </div>
                    
                </div>
            `;

            main.appendChild(div);

        })
        .catch(err => {
            
            main.innerHTML = "<p>Failed to load movie details. Please try again later.</p>";});

});

