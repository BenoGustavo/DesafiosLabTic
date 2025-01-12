// Global variable to store the artist data
let artistData = [];

// Function to create artist card
function createArtistCard(artistName, imgSrc) {
    const card = document.createElement('li');
    card.className = 'card';

    const closeBtnContainer = document.createElement('div');
    closeBtnContainer.className = 'close-btn-container';

    const closeBtn = document.createElement('a');
    closeBtn.href = '#';
    closeBtn.className = 'close-btn';

    closeBtnContainer.appendChild(closeBtn);

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = 'Imagem do artista';

    const artistInfo = document.createElement('div');
    artistInfo.className = 'artist-info';

    const artistNameElement = document.createElement('h2');
    artistNameElement.textContent = artistName;

    const artistDescriptionElement = document.createElement('p');
    artistDescriptionElement.textContent = "Artist";

    artistInfo.appendChild(artistNameElement);
    artistInfo.appendChild(artistDescriptionElement);

    card.appendChild(closeBtnContainer);
    card.appendChild(img);
    card.appendChild(artistInfo);

    return card;
}

// Function to render artist cards
function renderArtistCard(artists) {
    const artistList = document.getElementsByClassName('artists-list')[0];
    artistList.innerHTML = ''; // Clear the existing list
    artists.forEach(artist => {
        const newArtistCard = createArtistCard(artist.name, "./assets/img/user_img.png");
        artistList.appendChild(newArtistCard);
    });
}

// Fetch and store the JSON data globally
fetch('./assets/data/data.json')
    .then(response => response.json())
    .then(data => {
        artistData = data.artists; // Store the data in the global variable
        renderArtistCard(artistData); // Call the render function to display the cards
    })
    .catch(error => console.error('Error loading JSON data:', error));

// Function to search artist or genre
function searchArtistOrGenre(event) {
    const searchValue = event.target.value.toLowerCase();
    const filteredArtists = artistData.filter(artist => {
        return artist.name.toLowerCase().includes(searchValue) || artist.genre.toLowerCase().includes(searchValue);
    });
    renderArtistCard(filteredArtists); // Render the filtered results
}

document.getElementById('search').addEventListener('input', searchArtistOrGenre);