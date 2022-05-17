function aboutText(i) {
    document.getElementById('statsTable').innerHTML = '';
    document.getElementById('statsTable').innerHTML += /*html*/ ` 
            <tr>
                <th>Species</th>
                <th class=" j-flex-end">${allPokemons[i]['species']['name']}</th>
            </tr>
            <tr>
                <th>ID</th>
                <th class=" j-flex-end">#${i}</th>
            </tr> 
            <tr>
                <th>Height</th>
                <th class="text-lowercase j-flex-end">${allPokemons[i]['height']}0 cm</th>
            </tr> 
            <tr>
                <th>Weight</th>
                <th class="text-lowercase j-flex-end">${(allPokemons[i]['weight'] / 10).toFixed(2)} kg</th>
            </tr> 
            <tr>
                <th>Abilities</th>
                <th id="abilities" class="text-end j-flex-end"></th>
            </tr> 
            `;
    checkAbilitie(i);
}


function checkAbilitie(i) {
    for (let j = 0; j < allPokemons[i]['abilities'].length; j++) {
        const element = allPokemons[i]['abilities'][j]['ability']['name'];
        document.getElementById('abilities').innerHTML += /*html*/ ` 
${element}<br>
    `;
    }
}


function statsText(i) {
    document.getElementById('statsTable').innerHTML = '';
    for (let j = 0; j < allPokemons[i]['stats'].length; j++) {
        const element = allPokemons[i]['stats'][j];
        document.getElementById('statsTable').innerHTML += /*html*/ ` 
            <tr>
                <th>${element['stat']['name'].replace(/special-/i, "Sp. ")}</th>
                <th>${element['base_stat']}
                    <span><div id="data${j}" style="width: ${element['base_stat']}%;" class="background-light"></div></span>
                </th>
            </tr>   
            `;
        fillBar(element, j);
    }
}


function fillBar(element, j) {
    if (element['base_stat'] > 50) {
        document.getElementById(`data${j}`).classList.remove('background-light');
        document.getElementById(`data${j}`).classList.add('background-green');
    }
}


function movesText(i) {
    document.getElementById('statsTable').innerHTML = '';
    for (let j = 0; j < allPokemons[i]['moves'].length; j++) {
        const element = allPokemons[i]['moves'][j]['move']['name'];
        document.getElementById('movesId').innerHTML += /*html*/ ` 
            <span class="movesspan w-space-nowrap">${element}</span>
            `;
    }
}


function keydown(e) {
    if (e.keyCode == 13) {
        searchPokemon();
    }
}


async function searchPokemon() {
    let value = document.getElementById('searchContainer').value.toLowerCase();
    let url = await `https://pokeapi.co/api/v2/pokemon/${value}`;
    await checkUrl(url);
    document.getElementById('searchContainer').value = '';
}


async function checkUrl(url) {
    if (url) {
        let response = await fetch(url);
        let currentPokemon = await response.json();
        let i = currentPokemon['id']
        allPokemons[i] = currentPokemon;
        showBiger(i);
        checkInsidePokeList(i);
    } else {
        alert('no Pokemon could be found');
    }
}


function checkInsidePokeList(i) {
    if (i > displayPokemon) {
        document.getElementById('leftswipe').classList.add('d-none');
        document.getElementById('rightswipe').classList.add('d-none');
    }
}


function addFavorites(i) {
    document.getElementById('favHeartopen').classList.add('d-none');
    document.getElementById('favHeartclose').classList.remove('d-none');
    favoritesArray[i] = true;
    save()
}


function exciseFavorites(i) {
    document.getElementById('favHeartopen').classList.remove('d-none');
    document.getElementById('favHeartclose').classList.add('d-none');
    favoritesArray[i] = false;
    save()
}


function openFavorites() {
    document.getElementById('footerId').classList.add('d-none');
    document.getElementById('openFavorite').classList.add('d-none');
    document.getElementById('closeFavorite').classList.remove('d-none');
    document.getElementById('maincontainer').innerHTML = '';
    showFavorits = true;
    load();
    loadFavoriete();
}


function loadFavoriete() {
    for (let i = 0; i < favoritesArray.length; i++) {
        if (favoritesArray[i] == true) {
            allPokemonContent(i)
        }
    }
}


function closeFavorites() {
    document.getElementById('footerId').classList.remove('d-none');
    document.getElementById('openFavorite').classList.remove('d-none');
    document.getElementById('closeFavorite').classList.add('d-none');
    document.getElementById('maincontainer').innerHTML = '';
    showFavorits = false;
    beginPokemon = 1;
    allPokemon();
}


function save() {
    let favoritsAsText = JSON.stringify(favoritesArray);
    localStorage.setItem('favoritsPokemon', favoritsAsText);
}


function load() {
    let favoritsAsText = localStorage.getItem('favoritsPokemon');
    if (favoritsAsText) {
        favoritesArray = JSON.parse(favoritsAsText);
    }
}