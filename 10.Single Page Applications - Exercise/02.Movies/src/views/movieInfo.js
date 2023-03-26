import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { deleteMovie, getLikes, getMovie, getUserLike, likeMovie } from '../data/data.js';
//import { ctx } from '../api/router.js';
import { editMoviePage } from './editMovie.js';
import { getUserData } from '../util.js';


const section = document.querySelector('#container');

const template = (movie, isOwner, onDelete, likes, showLikeButton, onLike) => html`
  <div class="container">
    <div class="row bg-light text-dark">
      <h1>Movie title: ${movie.title}</h1>
      <div class="col-md-8">
        <img class="img-thumbnail" src="${movie.img}" alt="Movie" />
      </div>
      <div class="col-md-4 text-center">
        <h3 class="my-3">Movie Description</h3>
        <p>${movie.description}</p>
        ${movieControls(movie, isOwner, onDelete)}
        ${likeControls(showLikeButton, onLike)}
        <span class="enrolled-span">Liked ${likes}</span>
      </div>
    </div>
  </div>
`;

function movieControls(movie, isOwner, onDelete) {
  if (isOwner) {
    return html`<a id=${movie._id} class="btn btn-danger" @click=${onDelete} href="javascript:void(0)">Delete</a>
      <a id=${movie._id} class="btn btn-warning" href="/editMovie/${movie._id}">Edit</a>`;
  } else {
    return null;
  }
}

function likeControls(showLikeButton, onLike) {
  if (showLikeButton) {
    return html`<a class="btn btn-primary" @click=${onLike} href="javascript:void(0)">Like</a>`;
  } else {
    return null;
  }
}


export async function movieInfoPage(ctx) {
  //console.log(ctx.params);

  const userId = getUserData()?._id;

  const movieId = ctx.params.id;
  //console.log(id);
  const movie = await getMovie(movieId);
  const likes = await getLikes(movieId);
  const userLikes = await getUserLike(movieId, userId);
  console.log(userLikes);

  const isOwner = movie._ownerId === userId;
  //console.log(isOwner);

  let showLikeButton = !isOwner && userLikes.length == 0 && userId;
  console.log(showLikeButton);

  ctx.render(template(movie, isOwner, onDelete, likes, showLikeButton, onLike), section);

  //onDelete function is declared here to have access to the ctx and the id !!!
  async function onDelete() {
    await deleteMovie(movieId);
    ctx.page.redirect('/');
  }

  async function onLike() {
    console.log('like');
    const id = ctx.params.id;
    console.log(id);
    const data = { movieId: id }
    await likeMovie(data);
    ctx.page.redirect(`/movieInfo/${id}`);
    showLikeButton = false;
  }
}



