import { html } from "../../node_modules/lit-html/lit-html.js";
import { createSubmitHandler } from "../util.js";
import { createItem } from "../data/services.js";

const createTemplate = (onSubmit) => html`
<!-- Create Page (Only for logged-in users) -->
<section id="create">
  <div class="form">
    <h2>Add Product</h2>
    <form @submit=${onSubmit} class="create-form">
      <input type="text" name="name" id="name" placeholder="Product Name" />
      <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" />
      <input type="text" name="category" id="product-category" placeholder="Category" />
      <textarea id="product-description" name="description" placeholder="Description" rows="5" cols="50"></textarea>
      <input type="text" name="price" id="product-price" placeholder="Price" />
      <button type="submit">Add</button>
    </form>
  </div>
</section>`;

export function createPage(ctx) {
  ctx.render(createTemplate(createSubmitHandler(onSubmit)));

  async function onSubmit(data) {

    if (Object.values(data).some(x => x === '')) {
      return alert('All fields are required!')
    }

    await createItem(data);
    ctx.page.redirect('/dashboard');
  }
}


{/* <section id="create-page" class="create">
    <form @submit=${onSubmit} id="create-form" action="" method="">
        <fieldset>
            <legend>Add new Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" placeholder="Title">
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description" id="description" placeholder="Description"></textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" placeholder="Image">
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type">
                        <option value="Fiction">Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Add Book">
        </fieldset>
    </form>
</section> */}