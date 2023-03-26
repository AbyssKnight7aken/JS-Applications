import { html } from '../../node_modules/lit-html/lit-html.js';
import { addMovie } from '../data/data.js';
import { createSubmitHandler } from '../util.js';


const root = document.querySelector('#container');
//TODO Replace with actual view
const createTemplate = (onCreate) => html`
  <section id="add-movie" class="view-section">
    <form @submit=${onCreate} id="add-movie-form" class="text-center border border-light p-5" action="#" method="">
      <h1>Add Movie</h1>
      <div class="form-group">
        <label for="title">Movie Title</label>
        <input id="title" type="text" class="form-control" placeholder="Title" name="title" value="" />
      </div>
      <div class="form-group">
        <label for="description">Movie Description</label>
        <textarea class="form-control" placeholder="Description" name="description"></textarea>
      </div>
      <div class="form-group">
        <label for="imageUrl">Image url</label>
        <input id="imageUrl" type="text" class="form-control" placeholder="Image Url" name="img" value="" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </section>`;

export function createPage(ctx) {
  ctx.render(createTemplate(createSubmitHandler(onCreate)));

  //TODO change user object based on requirements
  async function onCreate({ title, description, img }, form) {

    const userData = localStorage.getItem('userData');

    if (!title || !description || !img) {
      return alert('All fields are required!')
    };

    const data = { title, description, img, _ownerId: userData._id };

    await addMovie(data);
    form.reset();
    //TODO use redirect location from requirements
    ctx.page.redirect('/');
  }
}

