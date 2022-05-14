let currentPokemon;

async function loadPokeon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/pikachu';
    let response = await fetch(url);
    currentPokemon = await response.json();
    renderPokemonInfo();
}


function renderPokemonInfo() {
    let containerImg = document.getElementById('pokeImg');
    let containerName = document.getElementById('pokeName');
    containerImg.src = currentPokemon['sprites']['other']['home']['front_default'];
    containerName.innerHTML = `<h2>${currentPokemon['name']}</h2>`;
}


function openStats() {
    document.getElementById('pokeImg').classList.toggle('animation-scaledown');
    document.getElementById('infoCard').classList.toggle('animation-fadeup');
    document.getElementById('pokeName').classList.toggle('d-none');
    document.getElementById('pokeId').innerHTML = `<h2>${currentPokemon['name']}</h2>`;
    statsText();

}


function statsText() {
    for (let i = 0; i < currentPokemon['stats'].length; i++) {
        const element = currentPokemon['stats'][i];
        document.getElementById('statsTable').innerHTML += ` 
            <tr>
                <th>${element['stat']['name'].replace(/special-/i, "Sp. ")}</th>
                <th>${element['base_stat']}
                    <span><div style="width: ${element['base_stat']}%;"></div></span>
                </th>
            </tr>   
            `;
    }
}


function removeanimation() {
    document.getElementById('pokeImg').classList.remove('animation-scaledown');
    document.getElementById('infoCard').classList.remove('animation-fadeup');
}