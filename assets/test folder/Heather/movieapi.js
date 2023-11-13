const imagePath = "https://image.tmdb.org/t/p/w500/";
const apiKey = "9647c3387122f212c6ed1ddeb758ffb2"
const form = document.getElementById("user-form");
let formInput = document.getElementById("search-input");
const submitBtn = document.getElementById("btn");
const main = document.getElementById("main");
const searchInput = formInput.value.trim();
let movieAuth = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjQ3YzMzODcxMjJmMjEyYzZlZDFkZGViNzU4ZmZiMiIsInN1YiI6IjY1NGQwZGE0ZmQ0ZjgwMDExZWQzZDhjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HB0iJ-sayz4Ungi3ekOAARph1iwM4wQe_pzuZsOeyzQ",
    },
  };

let movieURL = `https://api.themoviedb.org/3/search/movie?include_adult=false&original_language=en-US&page=1&query=${searchInput}`

function findMovies() {
      fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&original_language=en-US&page=1&query=${searchInput}`, movieAuth)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
            console.log(data.results)
            showMovies(data.results)
        
    });
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, overview, poster_path } = movie;
    const movieEl = document.createElement("div");
    movieEl.innerHTML = `
    <img src="${imagePath+poster_path}" alt ="${title}/>
    <div class = "movieInfo">
    <h3>${title}</h3>
    <div class="overview">
    <h3>Overview</h3>
    ${overview}
    </div>
    </div>
        `;
        main.appendChild(movieEl)
  });
}

submitBtn.addEventListener("click", function(event) {
  event.preventDefault();
  if (formInput && formInput !== "") {
    findMovies(movieURL, movieAuth);
    formInput = "";
  } else {
    alert("Please enter a search term"); //change to modal or something
  }
});

// fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", movieAuth)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

fetch(
  "https://api.themoviedb.org/3/search/movie?query=clash&include_adult=false&original_language=en-US&page=1",
  movieAuth
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

// fetch("https://api.themoviedb.org/3/configuration", movieAuth)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));
