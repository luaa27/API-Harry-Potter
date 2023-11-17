document.addEventListener('DOMContentLoaded', function () {
    const sortingHatButton = document.getElementById('sorting-hat-button');
    const sortingHatResult = document.getElementById('sorting-hat-result');
    const houseInfoSection = document.getElementById('house-info-section');

    sortingHatButton.addEventListener('click', function () {
        const houses = ['Grifinória', 'Lufa-Lufa', 'Corvinal', 'Sonserina'];
        const randomHouse = houses[Math.floor(Math.random() * houses.length)];
        sortingHatResult.textContent = `Você pertence à casa: ${randomHouse}`;
        houseInfoSection.style.display = 'block';
    });
    document.querySelectorAll('.houses img').forEach(img => {
        img.addEventListener('click', function () {
            fetchHouse(img.alt.toLowerCase());
            document.getElementById('characters-list').style.display = 'none';
        });
    });
    const characterSearchInput = document.getElementById('character-search');
    characterSearchInput.addEventListener('input', function () {
        const searchQuery = characterSearchInput.value.toLowerCase();
        fetchCharactersApi(searchQuery);
    });
    document.getElementById('back-to-hogwarts').addEventListener('click', function () {
        const URL_CHARACTERS_API = 'https://hp-api.onrender.com/api/characters';

        fetch(URL_CHARACTERS_API)
            .then(response => response.json())
            .then(characters => {
                displayCharacters(characters);
            })
            .catch(error => console.error('Erro ao buscar personagens:', error));
    });
});
function fetchHouse(house) {
    const initialBackground = document.getElementById('initial-background');
    initialBackground.style.display = 'none';

    const houseImage = document.getElementById('house-image');
    const background = document.getElementById('background');
    const backgroundOverlay = document.getElementById('background-overlay');

    const URL_API = `https://wizard-world-api.herokuapp.com/Houses`;

    fetch(URL_API)
        .then(response => response.json())
        .then(data => {
            const selectedHouse = data.find(h => h.name.toLowerCase() === house.toLowerCase());

            if (!selectedHouse) {
                console.error('Casa não encontrada na API');
                return;
            }

            const { name, founder, houseColours, animal, element, ghost, commonRoom, heads, traits } = selectedHouse;

            const houseInfo = document.getElementById('house-info');
            houseInfo.innerHTML = `
                <h3 class="white-text">${name}</h3>
                <p class="white-text"><strong>Founder:</strong> ${founder}</p>
                <p class="white-text"><strong>House Colours:</strong> ${houseColours}</p>
                <p class="white-text"><strong>Animal:</strong> ${animal}</p>
                <p class="white-text"><strong>Element:</strong> ${element}</p>
                <p class="white-text"><strong>Ghost:</strong> ${ghost}</p>
                <p class="white-text"><strong>Common Room:</strong> ${commonRoom}</p>
                <p class="white-text"><strong>Heads:</strong> ${heads.map(head => `${head.firstName} ${head.lastName}`).join(', ')}</p>
                <p class="white-text"><strong>Traits:</strong> ${traits.map(trait => trait.name).join(', ')}</p>
            `;
            let backgroundColor;
            switch (house.toLowerCase()) {
                case 'gryffindor':
                    backgroundColor = '#8a0f0f';
                    break;
                case 'hufflepuff':
                    backgroundColor = '#FFC436';
                    break;
                case 'ravenclaw':
                    backgroundColor = '#003c8a';
                    break;
                case 'slytherin':
                    backgroundColor = '#004e0b';
                    break;
                default:
                    backgroundColor = 'white';
            }

            changeBackgroundColor(backgroundColor);
            if (house.toLowerCase() === 'slytherin') {
                houseImage.style.display = 'block';
                background.style.display = 'block';
                backgroundOverlay.style.display = 'block';
            } else {
                houseImage.style.display = 'none';
                background.style.display = 'none';
                backgroundOverlay.style.display = 'none';
            }

            houseInfoSection.style.display = 'block';
        })
        .catch(error => console.error('Erro ao buscar informações da casa:', error));
}

function fetchHouseInfo(house) {
    const URL_API = `https://www.potterapi.com/v1/houses?`;

    fetch(URL_API)
        .then(response => response.json())
        .then(data => {
            const selectedHouse = data.find(h => h.name.toLowerCase() === house.toLowerCase());

            if (!selectedHouse) {
                console.error('Casa não encontrada na API');
                return;
            }

            const { name, founder, colors, animal, headOfHouse, values, mascot } = selectedHouse;

            const houseInfo = document.getElementById('house-info');
            houseInfo.innerHTML = `
                <h3 class="white-text">${name}</h3>
                <p class="white-text"><strong>Founder:</strong> ${founder}</p>
                <p class="white-text"><strong>Colors:</strong> ${colors.join(', ')}</p>
                <p class="white-text"><strong>Animal:</strong> ${animal}</p>
                <p class="white-text"><strong>Head of House:</strong> ${headOfHouse}</p>
                <p class="white-text"><strong>Values:</strong> ${values.join(', ')}</p>
                <p class="white-text"><strong>Mascot:</strong> ${mascot}</p>
            `;

            houseInfoSection.style.display = 'block';
        })
        .catch(error => console.error('Erro ao buscar informações da casa:', error));
}
function fetchCharactersApi(searchQuery) {
    const URL_CHARACTERS_API = 'https://hp-api.onrender.com/api/characters';

    fetch(URL_CHARACTERS_API)
        .then(response => response.json())
        .then(characters => {
            if (searchQuery) {
                characters = characters.filter(character =>
                    character.name.toLowerCase().includes(searchQuery)
                );
            }

            displayCharacters(characters);
        })
        .catch(error => console.error('Erro ao buscar personagens:', error));
}
function displayCharacters(characters) {
    const charactersList = document.getElementById('characters-list');
    charactersList.innerHTML = '';

    if (characters.length === 0) {
        charactersList.innerHTML = '<p>Nenhum personagem encontrado.</p>';
    } else {
        characters.forEach(character => {
            const listItem = document.createElement('li');
            listItem.textContent = character.name;
            charactersList.appendChild(listItem);
        });

        charactersList.style.display = 'block';
    }
}
function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}
document.addEventListener('DOMContentLoaded', function () {
    const sortingHatButton = document.getElementById('sorting-hat-button');
    const sortingHatResult = document.getElementById('sorting-hat-result');
    const houseInfoSection = document.getElementById('house-info-section');
    const charactersSection = document.getElementById('characters-section');
    const characterSearchInput = document.getElementById('character-search');
    const charactersList = document.getElementById('characters-list');

    sortingHatButton.addEventListener('click', function () {
        const houses = ['Grifinória', 'Lufa-Lufa', 'Corvinal', 'Sonserina'];
        const randomHouse = houses[Math.floor(Math.random() * houses.length)];
        sortingHatResult.textContent = `Você pertence à casa: ${randomHouse}`;
        houseInfoSection.style.display = 'block';
        charactersSection.style.display = 'none';

    });

    characterSearchInput.addEventListener('input', function () {
        const searchTerm = characterSearchInput.value.toLowerCase();
        const filteredCharacters = characters.filter(character => character.name.toLowerCase().includes(searchTerm));
        displayCharacters(filteredCharacters);
        charactersSection.style.display = 'block';
        houseInfoSection.style.display = 'none';
    });
    function fetchHouse(house) {
    }
    function fetchHouseInfo(house) {
    }
    function fetchCharactersApi() {
        const URL_CHARACTERS_API = 'https://hp-api.onrender.com/api/characters';

        fetch(URL_CHARACTERS_API)
            .then(response => response.json())
            .then(characters => {
                displayCharacters(characters);
            })
            .catch(error => console.error('Erro ao buscar personagens:', error));
    }
    function displayCharacters(characters) {
        charactersList.innerHTML = '';
        characters.forEach(character => {
            const listItem = document.createElement('li');
            listItem.textContent = character.name;
            charactersList.appendChild(listItem);
        });
    }
    document.getElementById('back-to-hogwarts').addEventListener('click', fetchCharactersApi);
});
document.addEventListener('DOMContentLoaded', function () {
    const sortingHatButton = document.getElementById('sorting-hat-button');
    const sortingHatResult = document.getElementById('sorting-hat-result');
    const houseInfoSection = document.getElementById('house-info-section');
    const charactersSection = document.getElementById('characters-section');
    const characterSearchInput = document.getElementById('character-search');
    const charactersList = document.getElementById('characters-list');

    sortingHatButton.addEventListener('click', function () {
        const houses = ['Grifinória', 'Lufa-Lufa', 'Corvinal', 'Sonserina'];
        const randomHouse = houses[Math.floor(Math.random() * houses.length)];
        sortingHatResult.textContent = `Você pertence à casa: ${randomHouse}`;
        houseInfoSection.style.display = 'block';
        charactersSection.style.display = 'none';
        characterSearchInput.value = '';
        charactersList.innerHTML = '';
    });
    document.getElementById('back-to-hogwarts').addEventListener('click', function () {
        charactersSection.style.display = 'block';
        houseInfoSection.style.display = 'none';
        characterSearchInput.focus();
    });
    characterSearchInput.addEventListener('input', function () {
        const searchQuery = characterSearchInput.value.toLowerCase();
        const filteredCharacters = characters.filter(character => character.name.toLowerCase().includes(searchQuery));
        displayCharacters(filteredCharacters);
    });
});
    const houseLogos = document.querySelectorAll('.house-logo');
    houseLogos.forEach(logo => {
        logo.addEventListener('click', function () {
            const houseName = logo.getAttribute('data-house');
            fetchHouse(houseName); 
            houseInfoSection.style.display = 'block';
        });
    });
;
function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;

    const initialBackground = document.getElementById('initial-background');
    initialBackground.style.display = 'none';
}

