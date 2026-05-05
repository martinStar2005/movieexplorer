const API_KEY = "04f84d8e9c8afcf11aee3a3c46785e77";
const BASE_URL = "https://api.themoviedb.org/3";

document.addEventListener("DOMContentLoaded", () => {

    const input = document.querySelector(".search-input");
    const buttonClickMore = document.querySelector('.btn-more');
    const list = document.querySelector(".dropdown");
    
    
    if (buttonClickMore) {
        buttonClickMore.addEventListener("click", () => {

            window.scrollTo({
                top: input.getBoundingClientRect().top + window.scrollY - 100,
                behavior: "smooth"
            });

            setTimeout(() => input.focus(), 150);
        });
    }
    
    
    input.addEventListener("input", (e) => {
        let timeout;
        clearTimeout(timeout);
        const query = e.target.value.trim();

        if (!query) {
            list.innerHTML = "";
            list.style.display = "none";
        } else {
        
        timeout = setTimeout(() => {

            list.innerHTML = '<li class="loader"></li>';
            list.style.display = "block";

            fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
                .then(res => res.json())
                .then(data => {

                    list.innerHTML = "";

                    if (!data.results.length) {
                        list.innerHTML = "<li>No results found</li>";
                        return;
                    }

                    data.results.slice(0, 7).forEach(movie => {

                        const li = document.createElement("li");

                        li.addEventListener("click", () => {
                            window.location.href = `details.html?id=${movie.id}`;
                        });

                        const img = document.createElement("img");
                        img.src = movie.poster_path
                            ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                            : "./image/no_image.png";

                        const span = document.createElement("span");
                        span.textContent = movie.title;

                        li.appendChild(img);
                        li.appendChild(span);

                        list.appendChild(li);
                    });

                })
                .catch(err => {
                    console.error(err);
                    list.innerHTML = "<li>Error loading results</li>";
                });

            }, 300);
        }

        });
    }
);