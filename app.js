const API_KEY = "71777aa1586445708535c0385e26a0a8";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load" , () =>fetchnews("India"));

function reload(){
    window.location.reload();
}

async function fetchnews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardscontainer = document.getElementById("card-container");
    const newscardTemplate = document.getElementById("template-news-card");

    cardscontainer.innerHTML = "";

    articles.forEach(article =>{
        if(!article.urlToImage) return;
        const cardClone = newscardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone , article);
        cardscontainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone , article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDescription = cardClone.querySelector("#news-description");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDescription.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click" , () =>{
        window.open(article.url);
    })

}
 
let currentSelectedNav = null;

function onNavItemClick(id) {
    fetchnews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener("click" , ()=>{
    const query = searchText.value;
    if(!query) return;
    fetchnews(query);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = null;
})








