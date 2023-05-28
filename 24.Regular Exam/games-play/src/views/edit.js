import { html } from "../../node_modules/lit-html/lit-html.js";
import { editItem, getItemById } from "../data/services.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (item, onSubmit) => html`
<section id="edit-page" class="auth">
  <form @submit=${onSubmit} id="edit">
    <div class="container">

      <h1>Edit Game</h1>
      <label for="leg-title">Legendary title:</label>
      <input type="text" id="title" name="title" value=${item.title}>

      <label for="category">Category:</label>
      <input type="text" id="category" name="category" value=${item.category}>

      <label for="levels">MaxLevel:</label>
      <input type="number" id="maxLevel" name="maxLevel" min="1" value=${item.maxLevel}>

      <label for="game-img">Image:</label>
      <input type="text" id="imageUrl" name="imageUrl" value=${item.imageUrl}>

      <label for="summary">Summary:</label>
      <textarea name="summary" id="summary">${item.summary}</textarea>
      <input class="btn submit" type="submit" value="Edit Game">

    </div>
  </form>
</section>
      `;


export async function editPage(ctx) {
  const itemId = ctx.params.id;
  const item = await getItemById(itemId);
  ctx.render(editTemplate(item, createSubmitHandler(onSubmit)));

  async function onSubmit(data) {
    if (Object.values(data).some(x => x === '')) {
      return alert('All fields are required');
    }

    await editItem(itemId, data);
    ctx.page.redirect(`/details/${itemId}`);
  }
}