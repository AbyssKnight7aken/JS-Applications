import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteItem, getItemById, getLikesByItemId, getMyLikeItemId, likeItem } from "../data/services.js";
import { getUserData } from "../util.js";

const detailsTemplate = (album, isOwner, onDelete, likes, showLikeButton, onLike) => html`
<section id="details">
  <div id="details-wrapper">
    <p id="details-title">Album Details</p>
    <div id="img-wrapper">
      <img src=${album.imageUrl} alt="example1" />
    </div>
    <div id="info-wrapper">
      <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
      <p>
        <strong>Album name:</strong><span id="details-album">${album.album}</span>
      </p>
      <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
      <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
      <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
    </div>
    <div id="likes">Likes: <span id="likes-count">${likes}</span></div>
    <div id="action-buttons">
      ${itemControlsTemplate(album, isOwner, onDelete)}
      ${likesControlTemplate(showLikeButton, onLike)}
    </div>
  </div>
</section>`;


function itemControlsTemplate(album, isOwner, onDelete) {
  if (isOwner) {
    return html`
          <a href="/edit/${album._id}" id="edit-btn">Edit</a>
          <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
      `;
  } else {
    return null;
  }
}

function likesControlTemplate(showLikeButton, onLike) {
  if (showLikeButton) {
    return html`
      <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>
      `;
  } else {
    return null;
  }
}

export async function detailsPage(ctx) {
  const albumId = ctx.params.id;
  
  const album = await getItemById(albumId);
  const userId = getUserData()?._id;
  const isOwner = album._ownerId === userId;
  
  let likes = await getLikesByItemId(albumId);
  console.log(likes)
  const myLikes = await getMyLikeItemId(albumId, userId);
  console.log(myLikes);
  let showLikeButton = !isOwner && !myLikes && userId;
  //console.log(showLikeButton);

  ctx.render(detailsTemplate(album, isOwner, onDelete, likes, showLikeButton, onLike));

  async function onDelete() {
    const confirmed = confirm(`Are you sure you want to delete ${item.name}?`)
    if (confirmed) {
      await deleteItem(albumId);
      ctx.page.redirect('/dashboard');
    }
  }

  async function onLike() {
    await likeItem(albumId);
    const newLikes = await getLikesByItemId(albumId);
    showLikeButton = false
    ctx.render(detailsTemplate(album, isOwner, onDelete, newLikes, showLikeButton, onLike));
    //ctx.page.redirect(`/details/${itemId}`);
  }
}

