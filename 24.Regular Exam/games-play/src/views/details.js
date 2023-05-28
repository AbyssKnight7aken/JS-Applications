import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteItem, getAllComments, addComment, getItemById } from "../data/services.js";
import { getUserData, createSubmitHandler } from "../util.js";

const detailsTemplate = (item, isOwner, onDelete, comments, showComments, onAddComment) => html`
<section id="game-details">
  <h1>Game Details</h1>
  <div class="info-section">

    <div class="game-header">
      <img class="game-img" src=${item.imageUrl} />
      <h1>${item.title}</h1>
      <span class="levels">MaxLevel: ${item.maxLevel}</span>
      <p class="type">${item.category}</p>
    </div>
    <p class="text">
      ${item.summary}
    </p>
    <!-- Bonus ( for Guests and Users ) -->
    <div class="details-comments">
      <h2>Comments:</h2>
      <ul>
        ${comments.length == 0
    ? html`<p class="no-comment">No comments.</p>`
    : comments.map(x => commentTemplate(x.comment))}
      </ul>
      <!-- Display paragraph: If there are no games in the database -->
    </div>
    <!-- Edit/Delete buttons ( Only for creator of this game )  -->
    <div class="buttons">
      ${itemControlsTemplate(item, isOwner, onDelete)}
    </div>
  </div>
  <!-- Bonus -->
  <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
  ${CommentsControlTemplate(showComments, onAddComment)}
</section>
`;

function commentTemplate(comment) {
  return html`
  <li class="comment">
    <p>${comment}</p>
  </li>
  `;
}

function itemControlsTemplate(item, isOwner, onDelete) {
  if (isOwner) {
    return html`
          <a href="/edit/${item._id}" class="button">Edit</a>
          <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
      `;
  } else {
    return null;
  }
}

function CommentsControlTemplate(showComments, onAddComment) {
  if (showComments) {
    return html`
      <article class="create-comment">
        <label>Add new comment:</label>
        <form @submit=${onAddComment} class="form">
          <textarea name="comment" placeholder="Comment......"></textarea>
          <input class="btn submit" type="submit" value="Add Comment">
        </form>
      </article>
      `;
  } else {
    return null;
  }
}

export async function detailsPage(ctx) {
  const itemId = ctx.params.id;

  const item = await getItemById(itemId);
  const userId = getUserData()?._id;
  const isOwner = item._ownerId === userId;

  let comments = await getAllComments(itemId);
  console.log(comments)

  const showComments = !isOwner && userId;
  //console.log(showComments);

  ctx.render(detailsTemplate(item, isOwner, onDelete, comments, showComments, createSubmitHandler(onAddComment)));

  async function onDelete() {
    const confirmed = confirm(`Are you sure you want to delete ${item.title}?`)
    if (confirmed) {
      await deleteItem(itemId);
      ctx.page.redirect('/');
    }
  }

  async function onAddComment(data) {
    console.log(data);
    if (!data.comment) {
      alert('Please write your comment!');
      return;
    }
    await addComment({ gameId: itemId, comment: data.comment });
    const NewComments = await getAllComments(itemId);
    //console.log(NewComments);
    const textarea = document.querySelector('.create-comment textarea');
    textarea.value = '';


    ctx.render(detailsTemplate(item, isOwner, onDelete, NewComments, showComments, createSubmitHandler(onAddComment)));
    //ctx.page.redirect(`/details/${itemId}`);
  }
}

