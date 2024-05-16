const preloader = document.querySelector(".preloader");

window.addEventListener('load', () => {
  preloader.remove();
})

// function for formating the date...
function formatSimpleDate(dateString) {
  const date = new Date(dateString);

  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}
//main api called for website-----
var url =
  "https://newsapi.org/v2/top-headlines?" +
  "country=in&" +
  "apiKey=639496e9d0ad441b9773a6d0807ad46e";
var req = new Request(url);

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then((value) => {


    console.log(value.articles);


    //main DIV implementation
    var container = document.querySelector(".articles");

    // Loop through the articles and create a div for each article with the author and title.
    value.articles.forEach((article) => {
      var articleDiv = document.createElement("div");
      articleDiv.classList.add("article"); // You may need to define a CSS class for this.

      var authorDiv = document.createElement("div");
      authorDiv.classList.add("author");
      authorDiv.textContent = "Author: " + article.author;

      var titleDiv = document.createElement("div");
      titleDiv.classList.add("title");
      titleDiv.textContent = "Title: " + article.title;

      var btnDiv = document.createElement("a");
      btnDiv.classList.add("LinkForNews");
      btnDiv.href = article.url;
      btnDiv.textContent = "LINK";

      //check for proper image 
      if (article.urlToImage === null) {
        var imageDiv = document.createElement("img");
        imageDiv.classList.add("newsImage");
        imageDiv.src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkchanews.com%2Fwp-content%2Fuploads%2F2014%2F09%2Fbigstock-Breaking-News-Screen-36237841.jpg&f=1&nofb=1&ipt=3c099214a69015a74d8d1ffa91f0f32655884da331e0acea3568cab0b06a9780&ipo=images";
      } else {

        var imageDiv = document.createElement("img");
        imageDiv.classList.add("newsImage");
        imageDiv.src = article.urlToImage;
      }

      var publishDiv = document.createElement("p");
      publishDiv.classList.add("publishDiv")
      publishDiv.textContent = "Published Time :" + formatSimpleDate(article.publishedAt);


      //full box
      container.appendChild(articleDiv);

      //news box
      articleDiv.appendChild(authorDiv);
      articleDiv.appendChild(titleDiv);
      articleDiv.appendChild(publishDiv);
      articleDiv.appendChild(imageDiv);
      articleDiv.appendChild(btnDiv)
    });
  });
