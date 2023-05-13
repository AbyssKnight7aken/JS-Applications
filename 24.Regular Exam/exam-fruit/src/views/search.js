import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUserData } from '../util.js';
import { search } from '../data/services.js';


//TODO Replace with actual view
const searchTemplate = (onSearch, result) => html`
<section id="search">
    <div class="form">
      <h2>Search</h2>
      <form @submit=${onSearch} class="search-form">
        <input
          type="text"
          name="search"
          id="search-input"
        />
        <button class="button-list">Search</button>
      </form>
    </div>
      <h4>Results:</h4>    
      <div class="search-result">
      ${null === result
      ? null 
      : result.length === 0
          ? html `<p class="no-result">No result.</p>`
          : html `${result.map(fruitTemplate)}`
    }
    </div>
</section>`;

const fruitTemplate = (fruit) => html`
 <div class="fruit">
  <img src=${fruit.imageUrl} alt="example1" />
  <h3 class="title">${fruit.name}</h3>
  <p class="description">${fruit.description}</p>
  <a class="details-btn" href="/details/${fruit._id}">More Info</a>
  </div>
`;



export async function searchPage(ctx) {
  ctx.render(searchTemplate(onSearch, null));

  async function onSearch(event) {
    event.preventDefault();
    const searchResult = document.querySelector('#search-input').value;

    if (searchResult == '') {
      return;
    }

    const result = await search(searchResult);
  
    ctx.render(searchTemplate(onSearch, result));
  }
}