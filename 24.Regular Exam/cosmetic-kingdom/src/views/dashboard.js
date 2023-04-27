import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../data/services.js';



//TODO Replace with actual view
const dashboardTemplate = (products) => html`
        <h2>Products</h2>
        <section id="dashboard">
          ${products.length == 0
            ? html`<h2>No products yet.</h2>`
            : html `${products.map(itemTemplate)}`}
        </section>
`;

const itemTemplate = (item) => html`
<div class="product">
  <img src="${item.imageUrl}" alt="example1" />
  <p class="title">${item.name}</p>
  <p><strong>Price:</strong><span class="price">${item.price}</span>$</p>
  <a class="details-btn" href="/details/${item._id}">Details</a>
</div>
`;

export async function dashboardPage(ctx) {
  const products = await getAll();
  console.log(products);
  ctx.render(dashboardTemplate(products));
}

