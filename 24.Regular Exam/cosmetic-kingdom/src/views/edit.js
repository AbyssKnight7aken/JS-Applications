import { html } from "../../node_modules/lit-html/lit-html.js";
import { editItem, getItemById } from "../data/services.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (item, onSubmit) => html`
<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
          <div class="form">
            <h2>Edit Product</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
                value="${item.name}"
              />
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
                value="${item.imageUrl}"
              />
              <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
                value="${item.category}"
              />
              <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              >${item.description}"</textarea>
              
              <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
                value="${item.price}"
              />
              <button type="submit">post</button>
            </form>
          </div>
        </section>`;


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