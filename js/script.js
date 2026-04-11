API_KEY = "04f84d8e9c8afcf11aee3a3c46785e77"
BASE_URL = "https://api.themoviedb.org/3"


const buttonClickMore = document.querySelector('.btn-more');
const submitButton = document.querySelector('.submit');

buttonClickMore.addEventListener('click', () => {
    
    const input = document.querySelector('.search-input');
    if (!input) return;
    
    window.scrollTo({
        top: input.getBoundingClientRect().top + window.scrollY - 100,
        behavior: 'smooth'
    });

    setTimeout(() => {
        input.focus();
    }, 150);
})

const input = document.querySelector(".search-input");
const list = document.querySelector(".dropdown");

let timeout;

input.addEventListener("input", (e) => {

    clearTimeout(timeout);

    const query = e.target.value.trim();

    if (query.length === 0) {
        list.innerHTML = "";
        list.style.display = "none";
        return;
    }

    timeout = setTimeout(() => {

        list.innerHTML = '<li class="loader"></li>';
        list.style.display = "block";

        fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {

                list.innerHTML = "";

                if (data.results.length === 0) {
                    list.innerHTML = "<li>No results found</li>";
                    list.style.display = "block";
                    return;
                }
                console.log(data.results);
                data.results.slice(0, 7).forEach(movie => {

                    const li = document.createElement("li");

                    li.addEventListener("click", () => {
                        window.location.href = `details.html?id=${movie.id}`;
                    })

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

                list.style.display = "block";

            })
            .catch(error => {
                console.error("Error fetching movies:", error);
                list.innerHTML = "<li>Error loading results</li>";
                list.style.display = "block";
            });

    }, 300);
});