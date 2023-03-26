import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getAllMovies } from '../data/data.js';
import { movieInfoPage } from './movieInfo.js';


//TODO Replace with actual view
const root = document.getElementById('container');

const homeTemplate = (movies) => html`
<div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40">
    <img src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg"
        class="img-fluid" alt="Responsive image" style="width: 150%; height: 200px" />
    <h1 class="display-4">Movies</h1>
    <p class="lead">
        Unlimited movies, TV shows, and more. Watch anywhere. Cancel
        anytime.
    </p>
</div>
<section id="add-movie-button" class="user">
    <a href="/addMovie" class="btn btn-warning">Add Movie</a>
</section>
<section id="movie">
    <div class="mt-3">
        <div class="row d-flex d-wrap">
            <ul id="movies-list" class="card-deck d-flex justify-content-center">
                ${movies.map(movie => html`
                <li class="card mb-4">
                    <img class="card-img-top" src="${movie.img}" alt="Card image cap" width="400">
                    <div class="card-body">
                        <h4 class="card-title">${movie.title}</h4>
                    </div>
                    <div class="card-footer">
                        <a href=${`/movieInfo/${movie._id}`}>
                            <button type="button" class="btn btn-info">Details</button>
                        </a>
                    </div>
                </li>`)}
            </ul>
        </div>
    </div>
</section>
`;

{/* <div class="card-footer">
                        <a href=${`/movieInfo/${movie._id}`} id=${movie._id} class="btn btn-info">Details</a>
                    </div> */}

export async function homePage(ctx) {

    const movies = await getAllMovies();
    console.log(movies);

    ctx.render(homeTemplate(movies), root);
}
