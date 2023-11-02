import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteItem, getItemById, } from "../data/services.js";
import { getUserData } from "../util.js";

const detailsTemplate = (item, isOwner, onDelete) => html`
<section id="details">
          <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src="${item.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">${item.brand}</span></p>
              <p>
                Model: <span id="details-model">${item.model}</span>
              </p>
              <p>Release date: <span id="details-release">${item.release}</span></p>
              <p>Designer: <span id="details-designer">${item.designer}</span></p>
              <p>Value: <span id="details-value">${item.value}</span></p>
            </div>

            <!--Edit and Delete are only for creator-->
            ${isOwner
            ? html`
            <div id="action-buttons">
              <a href="/edit/${item._id}" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
            </div>`
            : null}
          </div>
        </section>`;

// const itemControlsTemplate = (item, isOwner, onDelete) => {
//     if(isOwner){
//         return html`
//             <a class="button" href="/edit/${book._id}">Edit</a>
//             <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>
//         `;
//     } else {
//         return null;
//     }
// };

// const likesControlTemplate = (showLikeButton, onLike) => {
//     if(showLikeButton){
//         return html`
//         <a class="button" @click=${onLike} href="javascript:void(0)">Like</a>
//         `;
//     } else {
//         return null;
//     }

// }

//${showLikeButton ? html`<a class="button" @click=${onLike} href="javascript:void(0)">Like</a>` : null}

export async function detailsPage(ctx) {
    const itemId = ctx.params.id;
    const item = await getItemById(itemId);
    const userId = getUserData()?._id;
    const isOwner = item._ownerId === userId;
    //const likes = await getLikesByBookId(bookId);
    //const myLikes = userId && await getMyLikeBookId(bookId, userId);
    //const showLikeButton = !isOwner && !myLikes && userId;
    ctx.render(detailsTemplate(item, isOwner, onDelete));

    async function onDelete() {
        const confirmed = confirm(`Are you sure you want to delete ${item.model}?`)
        if(confirmed){
            await deleteItem(itemId);
            ctx.page.redirect('/dashboard');
        }
    }

    // async function onLike() {
    //     await likeBook(bookId);
    //     ctx.page.redirect(`/details/${bookId}`);
    // }
}

