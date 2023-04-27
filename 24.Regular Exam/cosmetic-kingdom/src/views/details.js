import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteItem, getItemById, getLikesByItemId, getMyLikeItemId, likeItem } from "../data/services.js";
import { getUserData } from "../util.js";

const detailsTemplate = (item,userId, isOwner, onDelete, likes, onLike, showLikeButton) => html`
<!-- Details page -->
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${item.imageUrl}" alt="example1" />
            <p id="details-title">${item.name}</p>
            <p id="details-category">
              Category: <span id="categories">${item.category}</span>
            </p>
            <p id="details-price">
              Price: <span id="price-number">${item.price}</span>$</p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Bought: <span id="buys">${likes}</span> times.</h4>
                <span>${item.description}</span
                >
              </div>
            </div>

            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
            ${isOwner
            ? html`
              <a href="/edit/${item._id}" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
            : null}
            
            ${showLikeButton
            ? html`
            <a @click=${onLike} href="javascript:void(0)" id="buy-btn">Buy</a>`
          : null}
            
              <!--Bonus - Only for logged-in users ( not authors )-->
              
            </div>
          </div>
        </section>`;

export async function detailsPage(ctx) {
    const itemId = ctx.params.id;
    const item = await getItemById(itemId);
    const userId = getUserData()?._id;
    const isOwner = item._ownerId === userId;
  ;
    const likes = await getLikesByItemId(itemId);
      console.log(likes)
    const myLikes = userId && await getMyLikeItemId(itemId, userId);
    const showLikeButton = !isOwner && !myLikes && userId;
    console.log(showLikeButton);
    ctx.render(detailsTemplate(item,userId, isOwner, onDelete, likes, onLike, showLikeButton));

    async function onDelete() {
        const confirmed = confirm(`Are you sure you want to delete ${item.name}?`)
        if(confirmed){
            await deleteItem(itemId);
            ctx.page.redirect('/dashboard');
        }
    }

    async function onLike() {
        await likeItem(itemId);
        ctx.page.redirect(`/details/${itemId}`);
    }
}

