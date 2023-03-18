function attachEvents() {

    //get url and elements
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const ul = document.getElementById('phonebook');
    const loadButton = document.getElementById('btnLoad');
    const createButton = document.getElementById('btnCreate');
    const person = document.getElementById('person');
    const phone = document.getElementById('phone');

    //add event listeners
    loadButton.addEventListener('click', onClickLoad);
    createButton.addEventListener('click', onClickCreate);

    //onClick load function
    async function onClickLoad() {
        ul.replaceChildren();
        const response = await fetch(url);
        const data = await response.json();

        Object.values(data).map(x => {
            const {person, phone, _id} = x;
            const li = createElement('li', `${person}: ${phone}`, ul);
            li.setAttribute('id', _id);

            const deleteButton = createElement('button', 'Delete', li);
            deleteButton.addEventListener('click', onClickDelete);
        })

        //delete function
        async function onClickDelete(event) {
            const id = event.target.parentNode.id;
            event.target.parentNode.remove();
            const deleteResponse = await fetch(`${url}/${id}`, {method: 'DELETE'});
        }
    }

    //onClick create function
    async function onClickCreate() {
        if (person.value == '' || phone.value == '') {
            return;
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({person: person.value, phone: phone.value})
        })
        loadButton.click();
        person.value = '';
        phone.value = '';
    }

    //create element function
    function createElement(type, text, appender) {
        const resultElement = document.createElement(type);
        resultElement.textContent = text;
        appender.appendChild(resultElement);
        return resultElement;
    }
}

attachEvents();