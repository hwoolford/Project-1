
// const typeArray = [item, title, author, publisher, booklink, bookImg]
const outputlist = $("#list-output");

const placeHldr = ""
let searchData;

$("#search").on("click", function () {
    outputlist.innerHTML = ""
    searchData = $("#search-box").val();
    const bookUrl = `https://openlibrary.org/subjects/${searchData}`
    if (searchData) {
        $.ajax({
            url: bookUrl,
            dataType: "json",
            success: function (res) {
                console.log(res)
                if (res.work_count === 0) {
                    alert("no results.. try again")
                }
                else {
                    for (let index = 0; index < res.works.length; index++) {
                        const book = res.works[index];
                        const img = $("<img>");
                        img.attr("src", "https://covers.openlibrary.org/b/olid/" + book.cover_edition_key + "-M.jpg");
                        outputlist.append(img);
                    }
                    console.log(res)
                }
            },
            error: function () {
                alert("Something went wrong...");
            }
        });
    }
    // clears search box
    $("#search-box").val("");
});

// function to display results in index.html @param res
function displayResults(res) {
    for (var i = 0; i < res.items.length; i += 2) {
        item = res.items[i];
        title1
    }
}

