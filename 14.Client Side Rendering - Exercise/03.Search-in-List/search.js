import { html, render } from '../node_modules/lit-html/lit-html.js';
import { towns } from "./towns.js";

const rootElement = document.querySelector('#towns');
const resultElement = document.querySelector('#result');
document.querySelector('button').addEventListener('click', search);

const cardTemplate = html`
<ul>
${towns.map(town => html`<li id=${town}>${town}</li>`)}
</ul>
`;

render(cardTemplate, rootElement);

function search() {
   const text = document.querySelector('#searchText').value;

   const result = towns.filter(town => {
      if (town.includes(text)) {
         const match = document.querySelector(`#${town}`);
         match.setAttribute('class', 'active');
         return town;
      }
   });
   resultElement.textContent = `${result.length} matches found`;
}