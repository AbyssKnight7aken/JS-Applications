import { html } from '../../node_modules/lit-html/lit-html.js';
import {until} from '../../node_modules/lit-html/directives/until.js';
import { editMovie, getMovie } from '../data/data.js';
//import { ctx } from "../api/router.js";
import { movieInfoPage } from "./movieInfo.js";


const section = document.querySelector('#container');

const editTemplate = (moviePromise) => html`
<section id="edit-movie" class="view-section">
    ${until(moviePromise, html`<p>Loading &hellip;</p>`)}
</section>`;

const formTemplate = (movie, onSubmit) => html`
        <form @submit=${onSubmit} class="text-center border border-light p-5" action="#" method="">
            <h1>Edit Movie</h1>
            <div class="form-group">
                <label for="imageUrl">Image url</label>
                <input id="imageUrl" type="text" class="form-control" placeholder="Image Url" value="${movie.img}" name="img" />
            </div>
            <div class="form-group">
                <label for="title">Movie Title</label>
                <input id="title" type="text" class="form-control" placeholder="Movie Title" value="${movie.title}"
                    name="title" />
            </div>
            <div class="form-group">
                <label for="description">Movie Description</label>
                <input value="${movie.description}" type="text" id="description" class="form-control"
                    placeholder="Movie Description..." name="description" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>`;


export async function editMoviePage(ctx) {
    console.log(ctx);

    const movieID = ctx.params.id;
    console.log(movieID);
    const moviePromise = await getMovie(movieID);
    //console.log(moviePromise);
    update(moviePromise); // initial load!
    
    function update(moviePromise) {
        ctx.render(editTemplate(loadMovie(moviePromise)));
    }

    async function loadMovie(moviePromise) {
        const movie = await moviePromise;
        return formTemplate(movie, onSubmit);
    }

    async function onSubmit(event) {
        event.preventDefault();

        const formData = [...new FormData(event.target).entries()];
        const data = formData.reduce((a, [k, v]) => Object.assign(a, { [k]: v.trim() }), {});
        console.log(ctx);

        await editMovie(ctx.params.id, data);
        ctx.page.redirect(`/movieInfo/${ctx.params.id}`);
    }
}

