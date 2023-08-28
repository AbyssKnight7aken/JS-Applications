import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUserData } from '../util.js';
import { search } from '../data/services.js';


//TODO Replace with actual view
const searchTemplate = (result, userId, ctx,) => html`
<section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button @click=${e => onSearch(e, ctx)} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>

            <!--Show after click Search button-->
            <div class="search-result">
                <!--If have matches-->
                ${result.length == 0
                ? html`
              <p class="no-result">No result.</p>`
                : result.map(album => itemTemplate(album, userId))}

                <!--If there are no matches-->
                
            </div>
        </section>`;

const itemTemplate = (album, userId) => html`
<div class="card-box">
  <img src=${album.imgUrl}>
  <div>
      <div class="text-center">
          <p class="name">Name: ${album.name}</p>
          <p class="artist">Artist: ${album.artist}</p>
          <p class="genre">Genre: ${album.genre}</p>
          <p class="price">Price: $${album.price}</p>
          <p class="date">Release Date: ${album.releaseDate}</p>
      </div>
      <div class="btn-group">
        ${userId
        ? html`<a href="/details/${album._id}" id="details">Details</a>`
        : null}
          
      </div>
  </div>
</div>
`;

async function onSearch(event, ctx) {
  event.preventDefault();
  console.log(event.target);
  const searchInput = document.querySelector('#search-input');
  //const formData = new FormData(event.target);
  //const searchParams = new URLSearchParams(ctx.querrystring);
  //console.log(formData.get('search'));

  const query = searchInput.value.trim();
  console.log(query);
  

  ctx.page.redirect(`/search?query=${query}`);
}

export async function searchPage(ctx) {
  //console.log(ctx);
  const userId = getUserData()?._id;
  //console.log(userId);
  const album = ctx.querystring.split('=')[1];
  const result = album == undefined ? [] : await search(album);
  //console.log(result);
  ctx.render(searchTemplate(result, userId, ctx,));
}