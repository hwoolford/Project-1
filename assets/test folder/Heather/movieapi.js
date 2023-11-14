const imagePath = "https://image.tmdb.org/t/p/w154/";
const apiKey = "9647c3387122f212c6ed1ddeb758ffb2";
const form = document.getElementById("user-form");
let formInput = document.getElementById("search-input");
const submitBtn = document.getElementById("btn");
const main = document.getElementById("main");

const movieAuth = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjQ3YzMzODcxMjJmMjEyYzZlZDFkZGViNzU4ZmZiMiIsInN1YiI6IjY1NGQwZGE0ZmQ0ZjgwMDExZWQzZDhjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HB0iJ-sayz4Ungi3ekOAARph1iwM4wQe_pzuZsOeyzQ",
  },
};

function findMovies(search) {
  let movieURL = `https://api.themoviedb.org/3/search/movie?include_adult=false&original_language=en-US&page=1&query=${search}`;
  fetch(movieURL, movieAuth)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.results);
      showMovies(data.results);
    });
}

fetch("https://api.themoviedb.org/3/configuration", movieAuth)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, overview, poster_path } = movie;
    const movieEl = document.createElement("div");
    if (poster_path == null) {
      movieEl.innerHTML = `
      <h2>${title}</h2>
      <div class = "movieInfo">
      <img id="placeholder" src="./placeholder.png" alt ="${title}" /> 
      <div class="overview">
      <h3>Overview</h3>
      ${overview}
      </div>
      </div>
          `;
    } else if (overview == "") {
      movieEl.innerHTML = `
      <h2>${title}</h2>
      <div class = "movieInfo">
      <img id="placeholder" src="./placeholder.png" alt ="${title}" /> 
      <div class="overview">
      <h3>Overview</h3>
      <p><i>Overview is not available<i></p>
      </div>
      </div>
          `;
    } else {
      movieEl.innerHTML = `
            <h2>${title}</h2>
            <div class = "movieInfo">
            <img src="${imagePath + poster_path}" alt ="${title}" />
            <div class="overview">
            <h3>Overview</h3>
            ${overview}
            </div>
            </div>
                `;
    }
    main.appendChild(movieEl);
  });
}

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const searchInput = formInput.value.trim();
  if (searchInput && searchInput !== "") {
    findMovies(searchInput);
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
  "https://api.themoviedb.org/3/search/movie?query=flash&include_adult=false&original_language=en-US&page=1",
  movieAuth
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
