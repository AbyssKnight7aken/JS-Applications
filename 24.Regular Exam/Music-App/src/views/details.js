import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteItem, getAllComments, addComment, getItemById } from "../data/services.js";
import { getUserData, createSubmitHandler } from "../util.js";

const detailsTemplate = (album, isOwner, onDelete,) => html`
<section id="detailsPage">
  <div class="wrapper">
      <div class="albumCover">
          <img src=${album.imgUrl}>
      </div>
      <div class="albumInfo">
          <div class="albumText">

              <h1>Name: ${album.name}</h1>
              <h3>Artist: ${album.artist}</h3>
              <h4>Genre: ${album.genre}</h4>
              <h4>Price: $${album.price}</h4>
              <h4>Date: ${album.date}</h4>
              <p>Description: ${album.description}</p>
          </div>

          <!-- Only for registered user and creator of the album-->
          <div class="actionBtn">
              ${albumControlsTemplate(album, isOwner, onDelete)}
          </div>
      </div>
  </div>
</section>
`;

function albumControlsTemplate(album, isOwner, onDelete) {
  if (isOwner) {
    return html`
          <a href="/edit/${album._id}" class="edit">Edit</a>
          <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
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

  //const showComments = !isOwner && userId;
  //console.log(showComments);

  ctx.render(detailsTemplate(album, isOwner, onDelete));

  async function onDelete() {
    const confirmed = confirm(`Are you sure you want to delete ${album.title}?`)
    if (confirmed) {
      await deleteItem(albumId);
      ctx.page.redirect('/');
    }
  }

  // async function onAddComment(data) {
  //   console.log(data);
  //   if (!data.comment) {
  //     alert('Please write your comment!');
  //     return;
  //   }
  //   await addComment({ gameId: itemId, comment: data.comment });
  //   const NewComments = await getAllComments(itemId);
  //   //console.log(NewComments);
  //   const textarea = document.querySelector('.create-comment textarea');
  //   textarea.value = '';


  //   ctx.render(detailsTemplate(item, isOwner, onDelete, NewComments, showComments, createSubmitHandler(onAddComment)));
  //   //ctx.page.redirect(`/details/${itemId}`);
  // }
}

