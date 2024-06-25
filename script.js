const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:  `${"PUT YOUR API AUTH KEY"}`
    }
};

const nameField = document.querySelector("#name");
const genreField = document.querySelector("#genre");
const releaseDateField = document.querySelector("#release-date");
const popularityField = document.querySelector("#popularity");
const runtimeField = document.querySelector("#run-time");
const searchField = document.querySelector(".input_field");
const form = document.querySelector("form");

form.addEventListener("submit", getMovieValue);






const fetchResults = async (movieId) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options);
    const data = await response.json();
    console.log(data);
    let genre = data.genres[0].name;
    let releaseDate = data.release_date;
    let Popularity = data.popularity;
    let runTime = data.runtime;

    updateData(genre,releaseDate,Popularity,runTime,movieName );
    
}

function getMovieValue (evt){
    evt.preventDefault();

    movieName = searchField.value;
    console.log(movieName)
    searchMovie(movieName);
    
}



// let movieName = "Star Wars"
// Making a function to fetch movie name by its id


function updateData(genre,releaseDate,Popularity,runTime,movieName ){
    //updating all the data
    nameField.innerText = movieName;
    genreField.innerText = genre;
    releaseDateField.innerText = releaseDate;
    popularityField.innerText = Popularity;
    runtimeField.innerText = runTime;
    console.log(movieName);
}



const searchMovie = async (movieName) => {
    
        // Use encodeURIComponent to properly format the movieName for the URL
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}`, options);
        const data = await response.json();
        // console.log(data);
    if (data.results && data.results.length > 0) {
        let finalData = data.results[0].id; // Return the ID of the first matching movie
        console.log(finalData);
        fetchResults(finalData);
        return finalData;
        
    } else {
        throw new Error('Movie not found');
    }
    
};




