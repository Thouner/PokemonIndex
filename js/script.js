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
    document.getElementById('bigCart').innerHTML = showBigerText(i, firstType, secoundType);
    if (i == 1) {
        document.getElementById('leftswipe').classList.add('d-none');
        document.getElementById('closeContainer').classList.remove('space-between');
        document.getElementById('closeContainer').classList.add('j-flex-end');
    }
    if (!secoundType) {
        document.getElementById('secoundtype').classList.remove('mar-pad-wid');
    }
    setTimeout(removeBounceAnimation, 1200);
}


function showBigerText(i, firstType, secoundType) {
    return /*html*/ `
    <div id="pokeCard" class="color-white animation-bounceInUp ${firstType}-bg">
        <img  onclick="closeBiger()" class="filter-withe closeicon" src="icon/close.png" alt="">
        <div id="closeContainer" class="d-flex j-space-betwen">
            <img id="leftswipe" onclick="swipeLeft(${i})" class="filter-withe" src="icon/left.png" alt="">
            <img onclick="swipeRight(${i})" class="filter-withe" src="icon/right.png" alt="">
        </div>
        <h3 id="pokeId">#${i}</h3>
        <img id="pokeImg" src="${allPokemons[i]['sprites']['other']['home']['front_default']}" alt="">
        <div id="pokeName" class="text-uppercase"><h2>${allPokemons[i]['name']}</h2>
            <div id="type2" class="d-flex j-center ">
            <span class="${firstType} mar-pad-wid" >${firstType}</span>
            <span id="secoundtype" class="${secoundType} mar-pad-wid">${secoundType}</span>
            </div>
            </div>
        <div id="infoCard">
        <img  onclick="closeData(${i})" id="closedata" class="filter-withe closeicon d-none" src="icon/down.png" alt="">

            <div class="buttonContainer d-flex">
                <div class="d-flex f-colum a-center">
                    <button id="aboutButton" onclick="openAbout(${i})">About</button>
                    <div id="aboutShadow" class="buttonshadow d-none"></div>
                </div>
                <div class="d-flex f-colum a-center">
                    <button id="statusButton" onclick="openStats(${i})">Stats</button>
                    <div id="statsShadow" class="buttonshadow d-none"></div>
                </div>
                <div class="d-flex f-colum a-center">
                    <button id="movesButton" onclick="openMoves(${i})">Moves</button>
                    <div id="movesShadow" class="buttonshadow d-none"></div>
                </div>
            </div>
            <table id="statsTable" class=""></table>
        </div>
    </div>
`;

}


function closeBiger() {
    document.getElementById('blurContainer').classList.add('d-none');
}

function removeBounceAnimation() {
    document.getElementById('pokeCard').classList.remove('animation-bounceInUp');

}

function swipeLeft(i) {
    i = i - 1;

    showBiger(i);
    removeBounceAnimation();
}



async function swipeRight(i) {
    i = i + 1;
    if (i >= allPokemons.length) {
        beginPokemon = displayPokemon + 1;
        displayPokemon = displayPokemon + 1;
        maxPokemon = displayPokemon + 1;
        await allPokemon();
    }
    showBiger(i);
    removeBounceAnimation();
}


function openAbout(i) {
    document.getElementById('pokeImg').classList.remove('animation-scaleup');
    document.getElementById('pokeImg').classList.add('animation-scaledown');
    document.getElementById('infoCard').classList.remove('animation-fadedown');
    document.getElementById('infoCard').classList.add('animation-fadeup');
    document.getElementById('pokeName').classList.add('d-none');
    document.getElementById('closedata').classList.remove('d-none');
    document.getElementById('aboutShadow').classList.remove('d-none');
    document.getElementById('statsShadow').classList.add('d-none');
    document.getElementById('movesShadow').classList.add('d-none');
    document.getElementById('pokeId').innerHTML = `<h2>${allPokemons[i]['name']}</h2>`;
    aboutText(i);

}

function openStats(i) {
    document.getElementById('pokeImg').classList.remove('animation-scaleup');
    document.getElementById('pokeImg').classList.add('animation-scaledown');
    document.getElementById('infoCard').classList.remove('animation-fadedown');
    document.getElementById('infoCard').classList.add('animation-fadeup');
    document.getElementById('pokeName').classList.add('d-none');
    document.getElementById('closedata').classList.remove('d-none');
    document.getElementById('statsShadow').classList.remove('d-none');
    document.getElementById('aboutShadow').classList.add('d-none');
    document.getElementById('movesShadow').classList.add('d-none');
    document.getElementById('pokeId').innerHTML = `<h2>${allPokemons[i]['name']}</h2>`;
    statsText(i);
}


function openMoves(i) {
    document.getElementById('pokeImg').classList.remove('animation-scaleup');
    document.getElementById('pokeImg').classList.add('animation-scaledown');
    document.getElementById('infoCard').classList.remove('animation-fadedown');
    document.getElementById('infoCard').classList.add('animation-fadeup');
    document.getElementById('pokeName').classList.add('d-none');
    document.getElementById('closedata').classList.remove('d-none');
    document.getElementById('movesShadow').classList.remove('d-none');
    document.getElementById('aboutShadow').classList.add('d-none');
    document.getElementById('statsShadow').classList.add('d-none');
    document.getElementById('pokeId').innerHTML = `<h2>${allPokemons[i]['name']}</h2>`;
    // movesText(i);
}


function closeData(i) {
    document.getElementById('statsTable').innerHTML = '';
    document.getElementById('pokeImg').classList.remove('animation-scaledown');
    document.getElementById('pokeImg').classList.add('animation-scaleup');
    document.getElementById('infoCard').classList.remove('animation-fadeup');
    document.getElementById('infoCard').classList.add('animation-fadedown');
    document.getElementById('pokeName').classList.remove('d-none');
    document.getElementById('closedata').classList.add('d-none');
    document.getElementById('aboutShadow').classList.add('d-none');
    document.getElementById('statsShadow').classList.add('d-none');
    document.getElementById('movesShadow').classList.add('d-none');
    document.getElementById('pokeId').innerHTML = `<h2>${allPokemons[i]['id']}</h2>`;
}

function aboutText(i) {
    document.getElementById('statsTable').innerHTML = '';

    document.getElementById('statsTable').innerHTML += ` 
            <tr>
                <th>Species</th>
                <th>${allPokemons[i]['species']['name']}</th>
            </tr>
            <tr>
                <th>ID</th>
                <th>#${i}</th>
            </tr> 
            <tr>
                <th>Height</th>
                <th>#${allPokemons[i]['height']}</th>
            </tr> 
            <tr>
                <th>Weight</th>
                <th>#${allPokemons[i]['weight']}</th>
            </tr> 
            <tr>
                <th>Abilities</th>
                <th>#${i}</th>
            </tr> 
            `;

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

function movesText(i) {
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