const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="showItem(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

/*
<li class="pokemon ${pokemon.type}" onclick="showItem(${pokemon.number})">
<span class="number">#${pokemon.number}</span>
<span class="name">${pokemon.name}</span>
<div class="detail">
    <ol class="types">
        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
    </ol>
    <img src="${pokemon.photo}" alt="${pokemon.name}">
</div>
</li>
    <div id ="pokemon-about" class="content pokemon-about" style ="${handleTypeColor(pokemon.types[0].type.name)}">

*/
function convertPokemonToDiv(pokemonItem) {
    return `
    <div class="pokemon-item ${pokemonItem.type}">
        <div class="nav">
            <div class="pokemon-item-nav" id="pokemon-item-nav" onClick="backList()">
                <img width="40px" height="40px" src="/assets/img/back.png" onClick="backList()">
                    <i class="fa-solid fa-arrow-left-long"></i>
                </button>    
            </div>
        </div>
        <div class="pokemon-item">    
            <span class="name">${pokemonItem.name}   #${pokemonItem.number}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemonItem.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            <img class="img" width="200px" height="200px" src="${pokemonItem.photo}" alt="${pokemonItem.name}">
        </div>
        <div class="pokemon-info">
            <div id="poke-header">
                <ul class="pokemon-item-nav">
                    <li id="t-about" class="active t-about" onClick="showItemAbout()">About</li>
                    <li id="t-base" class="t-base" onClick="showItemBase()">Base Status</li>
                </ul>
            </div>
            <div id="info-content">
                <ul>
                    <li class="active t-about">
                        <div class="d-flex" id="poke-info">
                            <ol class="details-a">
                                <li>Height</li>
                                <li>Weight</li>
                                <li>Abilities</li>
                            </ol>
                            <ol class="details-b">
                                <li> ${(pokemonItem.height)/10} cm</li>
                                <li>${(pokemonItem.weight)/10} kg</li>
                                    ${pokemonItem.abilities.map((ability) => `<li class="ability ${ability}">${ability}</li>`).join('')}                                    
                                </li>
                            </ol>
                        </div>
                    </li>
                    <li class="active t-base">
                        <div class="d-flex" id="poke-info">
                            <ol class="details-a">
                                <li>Alguma coisa</li>
                                <li>Mais alguma</li>
                            </ol>
                            <ol class="details-b">
                                <li>Info 1</li>
                                <li>Info 2</li>
                            </ol>
                        </div>
                    </li>
                </ul>    
            </div>
        </div>
    </div>
    `
}

function showItem(number) {
    pokeApi.getPokemonItem(number).then((pokemonItem = '') => {
        //console.log(pokemonItem)
        //document.getElementById('header').style.display = "none"
        document.getElementById('content').style.display = "none"
        document.getElementById('pokemon-content').style.display = "block"
    
        location.href="#pokemon-about"
        document.getElementById('pokemon-content').innerHTML = convertPokemonToDiv(pokemonItem)

        scroll(0,0);        
    })
}

function backList() {
    document.getElementById('pokemon-content').style.display = "none"
    document.getElementById('content').style.display = "block"
}

function showItemAbout() {
    document.getElementsByClassName('t-base').removeAttribute('active')
    document.getElementsByClassName('t-about').toggleAttribute('active')
}

function showItemBase() {
    document.getElementsByClassName('t-about').removeAttribute('active')
    document.getElementsByClassName('t-base').toggleAttribute('active')
}
