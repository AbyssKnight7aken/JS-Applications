import { html, render } from '../node_modules/lit-html/lit-html.js';

const form = document.querySelector('.content');
form.addEventListener('submit', onSubmit);
const rootElement = document.getElementById('root');

const listTemplate = (data) => html`
<ul>
    ${data.map(town => html`<li>${town}</li>`)}
</ul>
`

function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const towns = formData.get('towns').split(', ');
    if (towns == '') {
        return;
    }

    const result = listTemplate(towns);
    render(result, rootElement);
    form.reset();
    //console.log(towns);
}