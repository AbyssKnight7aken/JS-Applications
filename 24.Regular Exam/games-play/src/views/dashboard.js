import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../data/services.js';



//TODO Replace with actual view
const dashboardTemplate = (items) => html`
<section id="catalog-page">
  <h1>All Games</h1>
  <!-- Display div: with information about every game (if any) -->
  ${items.length == 0
  ? html`<h3 class="no-articles">No articles yet</h3>`
  : items.map(itemTemplate)}
  <!-- Display paragraph: If there is no games  -->
</section>
`;

const itemTemplate = (item) => html`
  </div>
  <div class="allGames">
    <div class="allGames-info">
      <img src=${item.imageUrl}>
      <h6>${item.category}</h6>
      <h2>${item.title}</h2>
      <a href="/details/${item._id}" class="details-button">Details</a>
    </div>
  </div>
`;

export async function dashboardPage(ctx) {
  const items = await getAll();
  console.log(items);
  ctx.render(dashboardTemplate(items));
}

