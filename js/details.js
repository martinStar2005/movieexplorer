API_KEY = "04f84d8e9c8afcf11aee3a3c46785e77"
BASE_URL = "https://api.themoviedb.org/3"

document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const movieId = params.get("id");

    fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(movie => {
            console.log(movie);
        })
        .catch(err => console.log(err));

});