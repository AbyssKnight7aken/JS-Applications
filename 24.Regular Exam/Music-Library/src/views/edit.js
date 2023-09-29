import { html } from "../../node_modules/lit-html/lit-html.js";
import { editItem, getItemById } from "../data/services.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (item, onSubmit) => html`
<section id="edit">
        <div class="form">
          <h2>Edit Album</h2>
          <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="singer" id="album-singer" value=${item.singer} placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" value=${item.album} placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" value=${item.imageUrl} placeholder="Image url" />
            <input type="text" name="release" id="album-release" value=${item.release} placeholder="Release date" />
            <input type="text" name="label" id="album-label" value=${item.label} placeholder="Label" />
            <input type="text" name="sales" id="album-sales" value=${item.sales} placeholder="Sales" />

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