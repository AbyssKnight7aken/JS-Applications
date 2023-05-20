import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../data/services.js';
import { getUserData } from "../util.js";



//TODO Replace with actual view
const dashboardTemplate = (fruits, user) => html`
<h2>Fruits<h2>
<section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
        ${fruits.length == 0
        ? html`<h2>No fruit info yet.</h2>`
        : fruits.map(fruitTemplate)}
</section>
`;

const fruitTemplate = (fruit, user) => html`
<div class="fruit">
  <img src=${fruit.imageUrl} alt="example1" />
  <h3 class="title">${fruit.name}</h3>
  <p class="description">${fruit.description}</p>
  <a class="details-btn" href="/details/${fruit._id}">More Info</a>
</div>
`;

export async function dashboardPage(ctx) {
  const user = getUserData();
  const fruits = await getAll();
  
  ctx.render(dashboardTemplate(fruits, user));
}

