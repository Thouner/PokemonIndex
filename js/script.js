let allPokemons = [];
let beginPokemon = 1;
let displayPokemon = 24;
let maxPokemon = displayPokemon + 1;
let showAbout = false;
let showStats = false;
let showMoves = false;
let favoritesArray = [];
let showFavorits = false;
let allPokemonNames



async function allPokemon() {
    let allPokemonNamesUrl = 'https://pokeapi.co/api/v2/pokemon?limit=898';
    let allPokemonNamesresponse = await fetch(allPokemonNamesUrl);
    allPokemonNames = await allPokemonNamesresponse.json();
    for (let i = beginPokemon; i < maxPokemon; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        allPokemons[i] = await response.json();
        favoritesArray[i] = false;
        allPokemonContent(i);
    }
}


function allPokemonContent(i) {
    load();
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
    checkLeftswipe(i)
    checkSecoundType(secoundType)
    checkFavoritesArray(i)
    checkShowFavorits()
    setTimeout(removeBounceAnimation, 1200);
}


function checkLeftswipe(i) {
    if (i == 1) {
        document.getElementById('leftswipe').classList.add('d-none');
        document.getElementById('closeContainer').classList.remove('space-between');
        document.getElementById('closeContainer').classList.add('j-flex-end');
    }
}


function checkSecoundType(secoundType) {
    if (!secoundType) {
        document.getElementById('secoundtype').classList.remove('mar-pad-wid');
    }
}


function checkFavoritesArray(i) {
    if (favoritesArray[i]) {
        if (favoritesArray[i] == true) {
            addFavorites(i)
        } else {
            exciseFavorites(i)
        }
    }
}


function checkShowFavorits() {
    if (showFavorits == true) {
        document.getElementById('leftswipe').classList.add('d-none');
        document.getElementById('rightswipe').classList.add('d-none');
    }
}


function showBigerText(i, firstType, secoundType) {
    return /*html*/ `
    <div id="pokeCard" class="color-white animation-bounceInUp ${firstType}-bg">
        <img id="favHeartopen" onclick="addFavorites(${i})" class="filter-withe hearticon" src="img/open-heart.png" alt="">
        <img id="favHeartclose" onclick="exciseFavorites(${i})" class="filter-withe hearticon d-none" src="img/full-heart.png" alt="">
        <img  onclick="closeBiger()" class="filter-withe closeicon" src="icon/close.png" alt="">
        <div id="closeContainer" class="d-flex j-space-betwen">
            <img id="leftswipe" onclick="swipeLeft(${i})" class="filter-withe" src="icon/left.png" alt="">
            <img id="rightswipe" onclick="swipeRight(${i})" class="filter-withe" src="icon/right.png" alt="">
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
            <table id="statsTable" class=""><div id="movesId" class="d-flex f-wrap overflow-y-auto"></div></table>
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
    checkOpenData(i);
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
    checkOpenData(i);
}


function checkOpenData(i) {
    if (showAbout === true) {
        openAbout(i);
        changeAnimation();
    } else if (showStats === true) {
        openStats(i);
        changeAnimation();
    } else if (showMoves === true) {
        openMoves(i)
        changeAnimation();
    }
}


function changeAnimation() {
    document.getElementById('infoCard').classList.remove('animation-fadeup');
    document.getElementById('pokeImg').classList.remove('animation-scaledown');
    document.getElementById('infoCard').style.height = '70%';
    document.getElementById('infoCard').style.background = 'linear-gradient(30deg, rgba(17, 17, 17, 0.6) 0%, rgba(19, 29, 28, 0.6) 50%, rgba(29, 39, 30, 0.6) 100%)';
    document.getElementById('pokeImg').style.height = '30%';
}


function showDatas(i) {
    document.getElementById('movesId').innerHTML = '';
    document.getElementById('pokeImg').classList.remove('animation-scaleup');
    document.getElementById('pokeImg').classList.add('animation-scaledown');
    document.getElementById('infoCard').classList.remove('animation-fadedown');
    document.getElementById('infoCard').classList.add('animation-fadeup');
    document.getElementById('pokeName').classList.add('d-none');
    document.getElementById('closedata').classList.remove('d-none');
    document.getElementById('pokeId').innerHTML = `<h2>${allPokemons[i]['name']}</h2>`;
}


function openAbout(i) {
    showAbout = true;
    showStats = false;
    showMoves = false;
    showDatas(i);
    document.getElementById('aboutShadow').classList.remove('d-none');
    document.getElementById('statsShadow').classList.add('d-none');
    document.getElementById('movesShadow').classList.add('d-none');
    aboutText(i);
}

function openStats(i) {
    showAbout = false;
    showStats = true;
    showMoves = false;
    showDatas(i);
    document.getElementById('aboutShadow').classList.add('d-none');
    document.getElementById('statsShadow').classList.remove('d-none');
    document.getElementById('movesShadow').classList.add('d-none');
    statsText(i);
}


function openMoves(i) {
    showAbout = false;
    showStats = false;
    showMoves = true;
    showDatas(i);
    document.getElementById('aboutShadow').classList.add('d-none');
    document.getElementById('statsShadow').classList.add('d-none');
    document.getElementById('movesShadow').classList.remove('d-none');
    movesText(i);
}


function closeData(i) {
    showAbout = false;
    showStats = false;
    showMoves = false;
    document.getElementById('statsTable').innerHTML = '';
    document.getElementById('movesId').innerHTML = '';
    closeDataChangeAnimation();
    document.getElementById('pokeId').innerHTML = `<h2>${allPokemons[i]['id']}</h2>`;
}


function closeDataChangeAnimation() {
    document.getElementById('pokeImg').classList.remove('animation-scaledown');
    document.getElementById('pokeImg').classList.add('animation-scaleup');
    document.getElementById('infoCard').classList.remove('animation-fadeup');
    document.getElementById('infoCard').classList.add('animation-fadedown');
    document.getElementById('pokeName').classList.remove('d-none');
    document.getElementById('closedata').classList.add('d-none');
    document.getElementById('aboutShadow').classList.add('d-none');
    document.getElementById('statsShadow').classList.add('d-none');
    document.getElementById('movesShadow').classList.add('d-none');
}