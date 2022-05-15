let allPokemons = [];
let beginPokemon = 1;
let displayPokemon = 24;
let maxPokemon = displayPokemon + 1;



async function allPokemon() {
    for (let i = beginPokemon; i < maxPokemon; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemons[i] = currentPokemon;
        allPokemonContent(i);

    }
}


function allPokemonContent(i) {
    let firstType = allPokemons[i]['types'][0]['type']['name'];
    let secoundType = '';
    if (allPokemons[i]['types'][1]) {
        secoundType = allPokemons[i]['types'][1]['type']['name']
    }
    document.getElementById('maincontainer').innerHTML += allPokemonText(i, firstType, secoundType);
}


function allPokemonText(i, firstType, secoundType) {
    return /*html*/ `
    <div id="id${i}" onclick="showBiger(${i})" class="smallCart height350 width260 color-white letter-2 ${firstType}-bg">
        <div class="frist-smallcart-container">
            <img src="${allPokemons[i]['sprites']['other']['home']['front_default']}" alt="">
            <h3 style="margin-top: 10px;">#${allPokemons[i]['id']}</h3>
        </div>
        <div class="secound-smallcart-container">
            <h3>${allPokemons[i]['name']}</h3>
            <div  class="d-flex f-colum">
            <span class="${firstType}" >${firstType}</span>
            <span class="${secoundType}">${secoundType}</span>
            </div>
        </div>
    </div>
    `;
}


async function morePokemon() {
    beginPokemon = displayPokemon + 1;
    displayPokemon = displayPokemon + 12;
    maxPokemon = displayPokemon + 1;
    await allPokemon();
}


function showBiger(i) {
    document.getElementById('blurContainer').classList.remove('d-none');

    let firstType = allPokemons[i]['types'][0]['type']['name'];
    let secoundType = '';
    if (allPokemons[i]['types'][1]) {
        secoundType = allPokemons[i]['types'][1]['type']['name']
    }
    document.getElementById('bigCart').innerHTML = /*html*/ `
            <div id="pokeCard" class="color-white ${firstType}-bg">
                <img  onclick="closeBiger()" class="filter-withe closeicon" src="icon/close.png" alt="">
                <div id="closeContainer" class="d-flex j-space-betwen">
                    <img id="leftswipe" onclick="swipeLeft(${i})" class="filter-withe" src="icon/left.png" alt="">
                    <img onclick="swipeRight(${i})" class="filter-withe" src="icon/right.png" alt="">
                </div>
                <h3 id="pokeId">#${i}</h3>
                <img id="pokeImg" src="${allPokemons[i]['sprites']['other']['home']['front_default']}" alt="">
                <div id="pokeName" class="text-uppercase"><h2>${allPokemons[i]['name']}</h2>
                    <div id="type2" class="d-flex">
                    <span class="${firstType}" >${firstType}</span>
                    <span class="${secoundType}">${secoundType}</span>
                    </div>
                    </div>
                <div id="infoCard">
                    <button id="statusButton" onclick="openStats(${i})">Stats</button>
                    <table id="statsTable" class=""></table>
                </div>
            </div>
`;
    if (i == 1) {
        document.getElementById('leftswipe').classList.add('d-none');
        document.getElementById('closeContainer').classList.remove('space-between');
        document.getElementById('closeContainer').classList.add('j-flex-end');

    }
}


function closeBiger() {
    document.getElementById('blurContainer').classList.add('d-none');
}


function swipeLeft(i) {
    i = i - 1;
    showBiger(i);
}

function swipeRight(i) {
    i = i + 1;
    showBiger(i);
}


// function renderPokemonInfo() {
//     let containerId = document.getElementById('pokeId');
//     let containerImg = document.getElementById('pokeImg');
//     let containerName = document.getElementById('pokeName');
//     containerId.innerHTML = ` < h3 > #$ { currentPokemon['id'] } < /h3>`;
//     containerImg.src = currentPokemon['sprites']['other']['home']['front_default'];
//     containerName.innerHTML = `<h2>${currentPokemon['name']}</h2>`;
// }


function openStats(i) {
    document.getElementById('pokeImg').classList.toggle('animation-scaledown');
    document.getElementById('infoCard').classList.toggle('animation-fadeup');
    document.getElementById('pokeName').classList.toggle('d-none');
    document.getElementById('pokeId').innerHTML = `<h2>${allPokemons[i]['name']}</h2>`;
    statsText(i);

}


function statsText(i) {
    document.getElementById('statsTable').innerHTML = '';
    for (let j = 0; j < allPokemons[i]['stats'].length; j++) {
        const element = allPokemons[i]['stats'][j];
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


// function removeanimation() {
//     document.getElementById('pokeImg').classList.remove('animation-scaledown');
//     document.getElementById('infoCard').classList.remove('animation-fadeup');
// }