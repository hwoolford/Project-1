$(document).ready(function () {
    const item, title, author, publisher, booklink, bookImg
    const outputlist = document.getElementById("list-ouput");
    const bookUrl = "https://openlibrary.org/subjects/history"
    const placeHldr = ""
    const searchData;

    $("#search").click(function () {
        outputlist.innerHTML = ""
        searchData = $("#search-box").val();

        if (searchData === "" || searchData === null) {
            displayError();
        }
        else {
            $.ajax({
                url: bookUrl + searchData,
                dataType: "json",
                success: function (res) {
                    console.log(res)
                    if (response.totalItem === 0) {
                        alert("no results.. try again")
                    }
                    else {
                        $("title").anitem({ 'margin-top: 10px'});
                        $(".book-list").css('visibility: visible');
                        displayResults(res);
                    }
                }
                error: function () {
                    alert("Something went wrong...");
                }
            })
        }
        $("#search-box").val("");
    })

})