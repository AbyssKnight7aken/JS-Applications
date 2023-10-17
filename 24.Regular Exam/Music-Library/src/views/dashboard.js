import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../data/services.js';



//TODO Replace with actual view
const dashboardTemplate = (items) => html`
  <section id="dashboard">
    <h2>Albums</h2>
    <ul class="card-wrapper">
      ${items.length == 0
      ? html`<h2>There are no albums added yet.</h2>`
    : items.map(itemTemplate)}
    </ul>  
  </section>
`;

const itemTemplate = (item) => html`
<li class="card">
  <img src=${item.imageUrl} alt="travis" />
  <p>
    <strong>Singer/Band: </strong><span class="singer">${item.singer}</span>
  </p>
  <p>
    <strong>Album name: </strong><span class="album">${item.album}</span>
  </p>
  <p><strong>Sales:</strong><span class="sales">${item.sales}</span></p>
  <a class="details-btn" href="/details/${item._id}">Details</a>
</li>
`;

export async function dashboardPage(ctx) {
  const items = await getAll();
  console.log(items);
  ctx.render(dashboardTemplate(items));
}

