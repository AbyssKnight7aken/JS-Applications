import { html } from "../../node_modules/lit-html/lit-html.js";
import { editItem, getItemById } from "../data/services.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (item, onSubmit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit item</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
                value="${item.brand}"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
                value="${item.model}"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
                value="${item.imageUrl}"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
                value="${item.release}"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
                value="${item.designer}"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
                value="${item.value}"
              />

              <button type="submit">post</button>
            </form>
          </div>
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