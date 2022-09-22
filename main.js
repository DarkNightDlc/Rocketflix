import {
  API_KEY, BASE_URL,
  IMG_URL,
  language,
} from './api.js'

var pageList = new Set([]), movieNumberList = new Set([]);

var movieList = []

const showMovie = (data) => {
    console.log(`carai tamo aqui${data}`)
    document.getElementById('titleCard').innerHTML = data.title;
    document.getElementById('textCard').innerHTML = data.overview;
    document.getElementById('imageCard').src = `https://image.tmdb.org/t/p/original/${data.poster_path}`;
    document.getElementById('descriptionCard').classList.remove("hidden");
  }

const getRandomNumber = (min, max)=> Math.floor(Math.random() * (max - min) + min)

const reqMovieList = async (pageNumber)=>{
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`)
    const data = await response.json()
    movieList = await data.results
    movieSelectAndShow()
}

const getRandomPageMovie = ()=>{
    let pageNumber = getRandomNumber(1, 350)
    if(!pageList.has(pageNumber)){
        pageList.add(pageNumber)
        reqMovieList(pageNumber)
        return
    }

    getRandomPageMovie()
}

const getRandomMovieNumber= ()=>{
    let movieNumber = getRandomNumber(1, 20)
    if(!movieNumberList.has(movieNumber)){
      movieNumberList.add(movieNumber)
      console.log(movieNumber)
      console.log(movieList[movieNumber])
      return movieList[movieNumber]
    }

    getRandomMovieNumber()
}

const movieSelectAndShow = () =>{
  console.log('chegou aqui')
  showMovie(getRandomMovieNumber())
} 

const randomMovie = ()=>{
    var movieNumberListSize = movieNumberList.size

    if(1<=movieNumberListSize && movieNumberListSize<=10){
      movieSelectAndShow()
      console.log("dddd2")
    }else{
      console.log('carai tamo aqui no começo')
      movieNumberList.clear()
      getRandomPageMovie()
    }
    
}

document.getElementById('movieBtn').addEventListener('click', () =>{
    randomMovie()    
})