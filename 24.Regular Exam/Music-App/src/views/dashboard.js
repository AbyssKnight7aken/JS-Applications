import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../data/services.js';
import { getUserData } from "../util.js";



//TODO Replace with actual view
const dashboardTemplate = (albums, user) => html`
<section id="catalogPage">
    <h1>All Albums</h1>

  ${albums.length == 0
  ? html`<p>No Albums in Catalog!</p>`
  : albums.map(x => itemTemplate(x, user))}
</section>
`;

const itemTemplate = (album, user) => html`
<div class="card-box">
  <img src=${album.imgUrl}>
  <div>
      <div class="text-center">
          <p class="name">Name: ${album.name}</p>
          <p class="artist">Artist: ${album.artist}</p>
          <p class="genre">Genre: ${album.genre}</p>
          <p class="price">Price: $${album.price}</p>
          <p class="date">Release Date: ${album.date}</p>
      </div>
      <div class="btn-group">
        ${user
        ? html`<a href="/details/${album._id}" id="details">Details</a>`
        : null}
      </div>
  </div>
</div>
`;

export async function dashboardPage(ctx) {
  const user = getUserData();
  const albums = await getAll();
  console.log(albums);
  ctx.render(dashboardTemplate(albums, user));
}

