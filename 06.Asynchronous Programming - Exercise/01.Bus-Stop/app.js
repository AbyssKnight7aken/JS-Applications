async function getInfo() {

    const stopNameElement = document.getElementById('stopName');
    const timeTableelement = document.getElementById('buses');
    const stopId = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    try {
        stopNameElement.textContent = 'Loading...';
        timeTableelement.replaceChildren();
        const res = await fetch(url);

        if (!res.ok) {
            const error = new Error();
            error.status = res.status;
            error.statusText = res.statusText;
            throw error;
        }

        const data = await res.json();
        stopNameElement.textContent = data.name;
        Object.entries(data.buses).map(([busId, time]) => {
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${busId} arrives in ${time} minutes`;
            timeTableelement.appendChild(liElement);
        })
    } catch (error) {
        stopNameElement.textContent = 'Error';
    }
}