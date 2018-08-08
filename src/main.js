const informacion = document.getElementById('informacion');

// Set the map variable
const myMap = L.map('map');

// Load the basemap
const myBasemap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

// Add basemap to map id
myBasemap.addTo(myMap);

// Set view of the map
myMap.setView([-12.0570522, -76.9418717], 12);
// myMap.setView([-12.1151394, -77.0118109], 15);

// Make an XMLHttpRequest to the JSON data
const request = new XMLHttpRequest();
request.open('GET', 'mapa.json', true);
request.onload = function() {
  // Begin accessing JSON data here
  const data = JSON.parse(this.response);

  // Suma la cantidad de distritos
    const neighborhoodCount = data.foods.reduce((sums, food) => {
    sums[food.neighborhood] = (sums[food.neighborhood] || 0) + 1;
    return sums;
    }, {});

    // Create a sidebar
    const sidebar = document.getElementById('neighborhoods');
    const h3 = document.createElement("h3");
    h3.innerHTML = "Total de lugares";
    sidebar.appendChild(h3);

    // Print all neighborhoods in sidebar
    for (let neighborhood in neighborhoodCount) {
    const p = document.createElement("p");
    p.innerHTML = `<b>${neighborhood}</b> : ${neighborhoodCount[neighborhood]}`;
    sidebar.appendChild(p);
    }

    // Print food markers
    const foods = data.foods.map(food => {
    L.marker([food.lat, food.long]).bindPopup(`
        <div class="container">
        <img src="${food.foto}" class="w-100 border border-light mt-10" alt="hola">
        <h2>${food.name}</h2>
        <p><strong>Distrito:</strong> ${food.neighborhood}</p>
        <p><strong>Ambiente:</strong> ${food.ambiance}</p>
        <p><strong>Sabor:</strong> ${food.flavor}</p>
        <p><strong>Comentarios:</strong> ${food.comments}</p>
        </div>
    `).openPopup().addTo(myMap);
    });

// const llenandoData = (food) => {
    let stringEmpty = '';
    informacion.innerHTML = '';
    let comer = data.foods;
    comer.forEach(food => {
      console.log(food);
      let exampleModalLong = document.getElementById('exampleModalLong');
    stringEmpty += `
    <div>
    <button type="button" class="btn btn-primary mt-3 w-100" data-toggle="modal" data-target="#exampleModalLong">
    <img w-100 src="${food.foto}"><br><strong>${food.neighborhood}<hr>${food.name}</strong></button>
    </div>
    <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">${food.name}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <img class="w-50" src="${food.fotoMapa}">
            <p><strong>Distrito:</strong>${food.direccion}</p>
            <p><strong>Ambiente:</strong>${food.ambiance}</p>
            <p><strong>Sabor:</strong>${food.flavor}</p>
            <p><strong>Comentarios:</strong>${food.comments}</p>
            <hr>
            <button type="button" class="btn btn-primary" data-dismiss="modal">PEDIR AHORA</button>

            </div>
          </div>
        </div>
      </div>`
    });
  informacion.innerHTML = stringEmpty;
  // }
}

request.send();
