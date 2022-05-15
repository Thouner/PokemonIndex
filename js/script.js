let allPokemons;
let displayPokemon = 24;
let maxPokemon = displayPokemon + 1;


async function allPokemon() {
    document.getElementById('maincontainer').innerHTML = '';
    for (let i = 1; i < maxPokemon; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemonText(currentPokemon);
    }
    document.getElementById('maincontainer').innerHTML += /*html*/ `
    
    `;
}



function allPokemonText(currentPokemon) {
    let firstType = currentPokemon['types'][0]['type']['name'];
    let secoundType = '';
    if (currentPokemon['types'][1]) {
        secoundType = currentPokemon['types'][1]['type']['name']
    }
    document.getElementById('maincontainer').innerHTML += /*html*/ `
        <div id="id${currentPokemon['id']}" class="smallCart color-white letter-2 ${firstType}-bg">
            <div class="frist-smallcart-container">
                <img src="${currentPokemon['sprites']['other']['home']['front_default']}" alt="">
                <h3 style="margin-top: 10px;">#${currentPokemon['id']}</h3>
            </div>
            <div class="secound-smallcart-container">
                <h3>${currentPokemon['name']}</h3>
                <div id="type" class="d-flex f-colum">
                <span class="${firstType}" >${firstType}</span>
                <span class="${secoundType}">${secoundType}</span>
                </div>
            </div>
        </div>
        `;
}


function morePokemon() {
    displayPokemon = displayPokemon + 12;
    maxPokemon = displayPokemon + 1;
    allPokemon();
}


// function renderPokemonInfo() {
//     let containerId = document.getElementById('pokeId');
//     let containerImg = document.getElementById('pokeImg');
//     let containerName = document.getElementById('pokeName');
//     containerId.innerHTML = `<h3>#${currentPokemon['id']}</h3>`;
//     containerImg.src = currentPokemon['sprites']['other']['home']['front_default'];
//     containerName.innerHTML = `<h2>${currentPokemon['name']}</h2>`;
// }


// function openStats() {
//     document.getElementById('pokeImg').classList.toggle('animation-scaledown');
//     document.getElementById('infoCard').classList.toggle('animation-fadeup');
//     document.getElementById('pokeName').classList.toggle('d-none');
//     document.getElementById('pokeId').innerHTML = `<h2>${currentPokemon['name']}</h2>`;
//     statsText();

// }


// function statsText() {
//     document.getElementById('statsTable').innerHTML = '';
//     for (let i = 0; i < currentPokemon['stats'].length; i++) {
//         const element = currentPokemon['stats'][i];
//         document.getElementById('statsTable').innerHTML += ` 
//             <tr>
//                 <th>${element['stat']['name'].replace(/special-/i, "Sp. ")}</th>
//                 <th>${element['base_stat']}
//                     <span><div style="width: ${element['base_stat']}%;"></div></span>
//                 </th>
//             </tr>   
//             `;
//     }
// }


// function removeanimation() {
//     document.getElementById('pokeImg').classList.remove('animation-scaledown');
//     document.getElementById('infoCard').classList.remove('animation-fadeup');
// }