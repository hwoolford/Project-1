const imagePath = "https://image.tmdb.org/t/p/w154/";
const form = document.getElementById("user-form");
let formInput = document.getElementById("search-input");
const main = document.getElementById("main");
const tableBody = document.getElementById("table");
const outputList = document.getElementById("list-output")
const row = document.getElementsByClassName("row")
const bookList = document.getElementsByClassName("book-list")

const placeHldr = "";
let searchData;

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
      showMovies(data.results);
    });
}

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

function findBooks(search) {
  const bookURL = `https://openlibrary.org/subjects/${search}.json`;
    fetch(bookURL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.works);
        if (data.works === 0) {
          alert("no results.. try again");
        } else {
          outputList.innerHTML = "";
          data.works.forEach((book) => {
            const bookEl = document.createElement("div");
            bookEl.innerHTML = `
              <h2>${book.title}</h2>
              <div class="bookInfo">
                <img src="https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg" />
              </div>
            `;
            outputList.append(bookEl);
          
          });
          console.log(data);
        }
      })
      .catch((error) => {
        alert("Something went wrong..."); //change to modal or something
        console.log(error)
      });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const searchInput = formInput.value;
  localStorage.setItem("searchTerm", JSON.stringify(searchInput));
  if (searchInput && searchInput !== "") {
    findMovies(searchInput);
    findBooks(searchInput);
    showHistory();
  } else {
    alert("Please enter a search term"); //change to modal or something
  }
});

let showHistory = function () {
  let storedHistory = JSON.parse(localStorage.getItem("searchTerm"));
  const searchInput = formInput.value;
  let createTableRow = document.createElement("tr");
  createTableRow.setAttribute("id", "tableRow");
  let tableData = document.createElement("td");
  let searchHistory = document.createElement("a");
  searchHistory.setAttribute("id", "input");
  $("#search-input").val("");
  searchHistory.textContent = storedHistory;
  tableData.appendChild(searchHistory);
  createTableRow.appendChild(tableData);
  tableBody.appendChild(createTableRow);

  searchHistory.addEventListener("click", function () {
    findMovies(searchInput);
    findBooks(searchInput);
  });
};


