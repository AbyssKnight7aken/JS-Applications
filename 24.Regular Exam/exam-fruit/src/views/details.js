import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteItem, getItemById } from "../data/services.js";
import { getUserData } from "../util.js";

const detailsTemplate = (fruit, isOwner, onDelete) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${fruit.imageUrl} alt="example1" />
            <p id="details-title">${fruit.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>${fruit.description}</p>
                    <p id="nutrition">Nutrition</p>
                   <p id = "details-nutrition">${fruit.nutrition}</p></div>
               <!--Edit and Delete are only for creator-->
          <div id="action-buttons">
            ${fruitControlsTemplate(fruit, isOwner, onDelete)}
          </div>
            </div>
        </div>
      </section>
`;

function fruitControlsTemplate(fruit, isOwner, onDelete) {
  if (isOwner) {
    return html`
          <a href="/edit/${fruit._id}" id="edit-btn">Edit</a>
          <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
      `;
  } else {
    return null;
  }
}


export async function detailsPage(ctx) {
  const fruitId = ctx.params.id;

  const fruit = await getItemById(fruitId);
  const userId = getUserData()?._id;
  const isOwner = fruit._ownerId === userId;

  ctx.render(detailsTemplate(fruit, isOwner, onDelete));

  async function onDelete() {
    const confirmed = confirm(`Are you sure you want to delete ${fruit.name}?`)
    if (confirmed) {
      await deleteItem(fruitId);
      ctx.page.redirect('/dashboard');
    }
  }
}

