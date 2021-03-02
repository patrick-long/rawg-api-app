// state variables
let gameData;

// cached element references
const $name = $('#name');
const $description = $('#description');
const $publisher = $('#publisher');
const $metacritic = $('#metacritic');
const $rating = $('#rating');
const $releaseDate = $('#release-date');
const $genres = $('#genres');
const $website = $('#website');
const $screenshot1 = $('#screenshot1');
const $screenshot2 = $('#screenshot2');
const $copyright = $('#copyright');
const $searchBar = $('#search-bar');

const BASE_URL = 'https://api.rawg.io/api/games';
const API_KEY = '';
const UPCOMING_URL = 'https://api.rawg.io/api/games?dates=2021-03-01,2021-12-31&ordering=-added';

// event listeners
$('form').on('submit', handleSubmit);

// functions

function handleSubmit(event) {
    event.preventDefault();
    let gameName = $searchBar.val().replace(/ /g, '-');
    $.ajax(`${BASE_URL}/${gameName}`).then((data) => {
        gameData = $(data);
        console.log(gameData);
        renderUser(); 
    }, (error) => {
        console.log('Bad request', error);
        alert(`Sorry, that is not a valid game title entry`);
    });
    $searchBar.val('');
};

const renderUser = () => {
    if (gameData) {
        $name.text(gameData[0].name);
        $('#d').html('Description:');
        $description.text(gameData[0].description_raw);
        if (gameData[0].publishers[0] !== null && gameData[0].publishers[0] !== null && !!gameData[0].publishers[0].name) {
            $('#p').html('Publisher:');
            $publisher.text(gameData[0].publishers[0].name);
        } else {
            $publisher.hide();
            $('#p').hide();
        }
        if (!!gameData[0].metacritic) {
            $('#m').html('Metacritic Rating:');
            $metacritic.text(`${gameData[0].metacritic}/100`);
        } else {
            $metacritic.hide();
            $('#m').hide();
        }
        if (gameData[0].esrb_rating !== null && !!gameData[0].esrb_rating.name) {
            $('#r').html('ESRB Rating:');
            $rating.text(gameData[0].esrb_rating.name);
        } else {
            $rating.hide();
            $('#r').hide();
        }
        if (!!gameData[0].released) {
            $('#re').html('Release Date:');
            $releaseDate.text(gameData[0].released);
        } else {
            $releaseDate.hide();
            $('#re').hide();
        }
        if (gameData[0].genres.length === 1) {
            $('#g').html('Genre(s):');
            $genres.text(`${gameData[0].genres[0].name}`);
        } else {
            $genres.text(`${gameData[0].genres[0].name}, ${gameData[0].genres[1].name}`);
        }
        if (!!gameData[0].website) {
            $('#w').html('Website:');
            $website.text(gameData[0].website);
            $website.attr('href', gameData[0].website);
        } else {
            $('#w').hide();
        }
        if (!!gameData[0].background_image) {
            $screenshot1.attr('src', gameData[0].background_image);
            $screenshot1.width('50%');
        }
        if (!!gameData[0].background_image_additional) {
            $screenshot2.attr('src', gameData[0].background_image_additional);
        }
    }
};

// pulls data for upcoming top 5 upcoming games
$.ajax(`${UPCOMING_URL}`).then(data => {
    gameData = $(data);
    console.log(gameData);
    renderUpcoming(); 
}, error => {
    console.log('Bad upcoming games request', error);
});

const renderUpcoming = () => {
// first upcoming game details
    $('.upcomingCards').append(`<h2 class="name">${gameData[0].results[0].name}</h2><img src="${gameData[0].results[0].background_image}" class="upcomingImage"><p class="re">Release Date: ${gameData[0].results[0].released}</p><p class="g">Genre(s): ${gameData[0].results[0].genres[0].name}, ${gameData[0].results[0].genres[1].name}, ${gameData[0].results[0].genres[2].name}</p><hr>`);

// second upcoming game details
    $('.upcomingCards').append(`<h2 class="name">${gameData[0].results[1].name}</h2><img src="${gameData[0].results[1].background_image}" class="upcomingImage"><p class="re">Release Date: ${gameData[0].results[1].released}</p><p class="g">Genre(s): ${gameData[0].results[1].genres[0].name}, ${gameData[0].results[1].genres[1].name}</p><hr>`);

// third upcoming game details
    $('.upcomingCards').append(`<h2 class="name">${gameData[0].results[2].name}</h2><img src="${gameData[0].results[2].background_image}" class="upcomingImage"><p class="re">Release Date: ${gameData[0].results[2].released}</p><p class="g">Genre(s): ${gameData[0].results[2].genres[0].name}, ${gameData[0].results[2].genres[1].name}</p><hr>`);

// fourth upcoming game details
    $('.upcomingCards').append(`<h2 class="name">${gameData[0].results[3].name}</h2><img src="${gameData[0].results[3].background_image}" class="upcomingImage"><p class="re">Release Date: ${gameData[0].results[3].released}</p><p class="g">Genre(s): ${gameData[0].results[3].genres[0].name}, ${gameData[0].results[3].genres[1].name}</p><hr>`);

// fifth upcoming game details
    $('.upcomingCards').append(`<h2 class="name">${gameData[0].results[4].name}</h2><img src="${gameData[0].results[4].background_image}" class="upcomingImage"><p class="re">Release Date: ${gameData[0].results[4].released}</p><p class="g">Genre(s): ${gameData[0].results[4].genres[0].name}, ${gameData[0].results[4].genres[1].name}, ${gameData[0].results[4].genres[2].name}</p>`);
};

