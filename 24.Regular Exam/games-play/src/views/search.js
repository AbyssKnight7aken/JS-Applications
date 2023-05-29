import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../data/services.js';
import { search } from '../data/services.js';
import { getUserData } from '../util.js';



//TODO Replace with actual view
const searchTemplate = (result, userId, ctx,) => html`
<section id="search">
          <h2>Search by Brand</h2>

          <form @submit=${e => onSearch(e, ctx)} class="search-wrapper cf">
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit">Search</button>
          </form>

          <h3>Results:</h3>

          <div id="search-container">
            <ul class="card-wrapper">
              <!-- Display a li with information about every post (if any)-->
              ${result.length == 0
              ? html`
              <h2>There are no results found.</h2>`
              : result.map(item => itemTemplate(item, userId))}            
            </ul>

            <!-- Display an h2 if there are no posts -->
            <!-- <h2>There are no results found.</h2> -->
          </div>
        </section>`;

const itemTemplate = (item, userId) => html`
    <li class="card">
      <img src="${item.imageUrl}" alt="travis" />
      <p>
        <strong>Brand: </strong><span class="brand">${item.brand}</span>
      </p>
      <p>
        <strong>Model: </strong
        ><span class="model">${item.model}</span>
      </p>
      <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
      ${userId
        ? html `<a class="details-btn" href="/details/${item._id}">Details</a>`
        : null}
    </li>
`;

async function onSearch(event, ctx) {
  event.preventDefault();

  const formData = new FormData(event.target);
  //const searchParams = new URLSearchParams(ctx.querrystring);
  //console.log(formData.get('search'));

  const query = formData.get('search').trim();
  //console.log(query);
  

  ctx.page.redirect(`/search?query=${query}`);
}

export async function searchPage(ctx) {
  //console.log(ctx);
  const userId = getUserData()?._id;
  //console.log(userId);
  const item = ctx.querystring.split('=')[1];
  const result = item == undefined ? [] : await search(item);
  //console.log(result);
  ctx.render(searchTemplate(result, userId, ctx,));
}