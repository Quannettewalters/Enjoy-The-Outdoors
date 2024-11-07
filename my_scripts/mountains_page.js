document.addEventListener("DOMContentLoaded", () => {
    const inputGroupSelect = document.getElementById("inputGroupSelect");
    mountainsArray.forEach(m => inputGroupSelect.appendChild(new Option(m.name)));
    inputGroupSelect.addEventListener("change", e => {
        const selectedIndex = inputGroupSelect.selectedIndex;
        if (selectedIndex) {
            const m = mountainsArray[selectedIndex - 1];

            const coords = m.coords.lat.toFixed(3) +
                ", " +
                m.coords.lng.toFixed(3);

            results.innerHTML = "<h1>" + m.name + "</h1>" + `                
                Elevation:   <b>${m.elevation}</b><br>
                Effort:      <b>${m.effort}</b><br>
                Coordinates: <b>(${coords})</b><br>
                <br>
                ${m.desc}
                <br><br>
            `;
            //add img image here? how?
            if (m.img) {
                const i = document.createElement("img");
                i.alt = "Mountain Image";
                i.src = "data/images/" + m.img;
                results.appendChild(i);
            }
        }
        // function that can "fetch" the sunrise/sunset times
        async function getSunsetForMountain(lat, lng) {
            let response = await fetch(
                `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
            let data = await response.json();
            return data;
        }
        const m = mountainsArray[inputGroupSelect.selectedIndex - 1].coords;
        getSunsetForMountain(m.lat, m.lng).then(data => {
            results.innerHTML += `Sunset: ${data.results.sunset}`;
            results.innerHTML += `<br>Sunrise: ${data.results.sunrise}`;
        });

    

    });//end change
});//end load

// ARRAY  NA I0 I1 ...
// SELECT H0 M1 M2 ...
// SINDEX  0  1  3 ...