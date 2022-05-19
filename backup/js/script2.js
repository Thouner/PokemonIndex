// html for about
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

// fill the abilities for about
function checkAbilitie(i) {
    for (let j = 0; j < allPokemons[i]['abilities'].length; j++) {
        const element = allPokemons[i]['abilities'][j]['ability']['name'];
        document.getElementById('abilities').innerHTML += /*html*/ ` 
${element}<br>
    `;
    }
}

// html for stats
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

// fill the bar for stats
function fillBar(element, j) {
    if (element['base_stat'] > 50) {
        document.getElementById(`data${j}`).classList.remove('background-light');
        document.getElementById(`data${j}`).classList.add('background-green');
    }
}

// html for moves
function movesText(i) {
    document.getElementById('statsTable').innerHTML = '';
    for (let j = 0; j < allPokemons[i]['moves'].length; j++) {
        const element = allPokemons[i]['moves'][j]['move']['name'];
        document.getElementById('movesId').innerHTML += /*html*/ ` 
            <span class="movesspan w-space-nowrap">${element}</span>
            `;
    }
}

// press enter to search 
function keydown(e) {
    if (e.keyCode == 13) {
        searchPokemon();
    }
}

// search number or string
async function searchPokemon() {
    searchPokemons = [];
    let value = document.getElementById('searchContainer').value.toLowerCase();
    let regex = /^[0-9]+$/;
    if (value.match(regex)) {
        searchOnlyNumber(value)
    } else {
        searchOnlyString(value);
    }
    document.getElementById('searchContainer').value = '';
}

// search number
async function searchOnlyNumber(value) {
    if (value > 0 && value <= 898) {
        try {
            let url = `https://pokeapi.co/api/v2/pokemon/${value}`;
            let response = await fetch(url);
            let currentPokemon = await response.json();
            let i = currentPokemon['id']
            allPokemons[i] = currentPokemon;
            showBiger(i);
            // checkInsidePokeList(i);
        } catch (e) {
            alert('an error has occurred');
        }
    } else {
        alert('no Pokemon could be found');
    }
}

// search string
async function searchOnlyString(value) {
    document.getElementById('maincontainer').innerHTML = '';
    for (let i = 0; i < allPokemonNames['results'].length; i++) {
        let pokemonName = allPokemonNames['results'][i];
        if (checkletters(pokemonName, value)) {
            console.log(`${pokemonName['name']}`)
            try {
                let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName['name']}`;
                let response = await fetch(url);
                allPokemons[i] = await response.json();
                searchPokemons[i] = true
            } catch (e) {
                alert('an error has occurred');
            }
        }
    }
    checkResults();
}

// check if a pokemon was found in the database
function checkResults() {
    if (!searchPokemons.includes(true)) {
        alert('no Pokemon could be found');
    } else {
        loadSerachResults();
    }
}

// loads all found pokemon
function loadSerachResults() {
    document.getElementById('footerId').classList.add('d-none');
    document.getElementById('openFavorite').classList.add('d-none');
    document.getElementById('closeFavorite').classList.remove('d-none');
    document.getElementById('maincontainer').innerHTML = '';
    showFavorits = true;
    load();
    for (let i = 0; i < searchPokemons.length; i++) {
        if (searchPokemons[i] == true) {
            allPokemonContent(i)
        }
    }
}

// comparison of search value with pokemon name
function checkletters(pokemonName, value) {
    let valueLetter = '';
    let pokemonLetter = '';
    for (let i = 0; i < value.length; i++) {
        valueLetter = valueLetter + value[i]
        pokemonLetter = pokemonLetter + pokemonName['name'][i]
    }
    return pokemonLetter == valueLetter
}

// remove arrows if not loaded
function checkInsidePokeList(i) {
    document.getElementById('leftswipe').classList.add('d-none');
    document.getElementById('rightswipe').classList.add('d-none');
}

// Add to favorites
function addFavorites(i) {
    document.getElementById('favHeartopen').classList.add('d-none');
    document.getElementById('favHeartclose').classList.remove('d-none');
    favoritesArray[i] = true;
    save()
}

// remove to favorites
function exciseFavorites(i) {
    document.getElementById('favHeartopen').classList.remove('d-none');
    document.getElementById('favHeartclose').classList.add('d-none');
    favoritesArray[i] = false;
    save()
    if (showFavorits == true) {
        openFavorites();
    }
}

// open favorites
function openFavorites() {
    document.getElementById('footerId').classList.add('d-none');
    document.getElementById('openFavorite').classList.add('d-none');
    document.getElementById('closeFavorite').classList.remove('d-none');
    document.getElementById('maincontainer').innerHTML = '';
    showFavorits = true;
    load();
    loadFavoriete();
}

// load favorites
function loadFavoriete() {
    for (let i = 0; i < favoritesArray.length; i++) {
        if (favoritesArray[i] == true) {
            allPokemonContent(i)
        }
    }
}

// close favorites
function closeFavorites() {
    document.getElementById('footerId').classList.remove('d-none');
    document.getElementById('openFavorite').classList.remove('d-none');
    document.getElementById('closeFavorite').classList.add('d-none');
    document.getElementById('maincontainer').innerHTML = '';
    showFavorits = false;
    searchPokemons = [];
    beginPokemon = 1;
    allPokemon();
}

// save favorites
function save() {
    let favoritsAsText = JSON.stringify(favoritesArray);
    localStorage.setItem('favoritsPokemon', favoritsAsText);
}

// load favorites
function load() {
    let favoritsAsText = localStorage.getItem('favoritsPokemon');
    if (favoritsAsText) {
        favoritesArray = JSON.parse(favoritsAsText);
    }
}