import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../data/services.js';



//TODO Replace with actual view
const dashboardTemplate = (shoes) => html`
<!-- Dashboard page -->
<section id="dashboard">
          <h2>Collectibles</h2>
          <ul class="card-wrapper">
            <!-- Display a li with information about every post (if any)-->

            ${shoes.length == 0
            ? html`<h2>There are no items added yet.</h2>`
            : shoes.map(itemTemplate)}
          </ul>
          <!-- Display an h2 if there are no posts -->
          
        </section>
`;

const itemTemplate = (item) => html`
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
              <a class="details-btn" href="/details/${item._id}">Details</a>
            </li>
`

export async function dashboardPage(ctx) {
    const shoes = await getAll();
    console.log(shoes);
    ctx.render(dashboardTemplate(shoes));
}

