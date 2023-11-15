// const { title } = book;
const coverPath = "https://covers.openlibrary.org/b/olid/";
const outputlist = $("#list-output");

const placeHldr = "";
let searchData;

$("#search").on("click", function () {
  outputlist.innerHTML = "";
  searchData = $("#search-box").val();
  const bookUrl = `https://openlibrary.org/subjects/${searchData}`;
  if (searchData) {
    $.ajax({
      url: bookUrl,
      dataType: "json",
      success: function (res) {
        console.log(res);
        if (res.work_count === 0) {
          alert("no results.. try again");
        } else {
          for (let index = 0; index < res.works.length; index++) {
            const book = res.works[index];
            const bookEl = document.createElement("div");

            bookEl.innerHTML = `
            <h2>${book.title}</h2>
            <div class = "bookInfo">
            <img src="https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg" />
           
            </div>
                `;

            outputlist.append(bookEl);
          }

          console.log(res);
        }
      },
      error: function () {
        alert("Something went wrong...");
      },
    });
  }
  // clears search box
  $("#search-box").val("");
});

// const img = $("<img>");
// const bookTitle = book.title
// console.log(bookTitle)
// img.attr("src", "https://covers.openlibrary.org/b/olid/" + book.cover_edition_key + "-M.jpg");
// outputlist.append(img);
// outputlist.innerHTML = bookTitle
