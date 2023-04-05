import { html, render } from '../node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';
const rootElement = document.querySelector('div');
const form = document.querySelector('form');
form.addEventListener('submit', addItem);

async function getOptions() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const options = Object.values(await getOptions());

const selectTemplate = (data) => html`
    <select id="menu">
        ${data.map(x => html`<option value="${x._id}">${x.text}</option>`)}
    </select>
`;

function update(options) {
    render(selectTemplate(options), rootElement);
}

update(options);

async function addItem(event) {
    event.preventDefault();
    const formData = new FormData(form);
    //add name attribute to the input tag!!!
    const text = formData.get('text');

    if(text == '') {
        return;
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text})
    })
    options.push(await response.json())
    update(options);
    form.reset();
}