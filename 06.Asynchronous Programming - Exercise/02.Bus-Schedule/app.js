function solve() {

    const infoElement = document.querySelector('#info span');
    const departButton = document.getElementById('depart');
    const arriveButton = document.getElementById('arrive');

    let stop = { next: 'depot' };

    async function depart() {
        try {
            departButton.disabled = true;
            const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
            const res = await fetch(url);
            if (!res.ok) {
                const error = new Error();
                error.status = res.status;
                error.statusText = res.statusText;
                throw error;
            }
            stop = await res.json();

            infoElement.textContent = `Next stop ${stop.name}`;
            arriveButton.disabled = false;
        }
        catch (error) {
            infoElement.textContent = 'Error';
            departButton.disabled = true;
            arriveButton.disabled = true;
        }
    }

    function arrive() {
        infoElement.textContent = `Arriving at ${stop.name}`;
        departButton.disabled = false;
        arriveButton.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();