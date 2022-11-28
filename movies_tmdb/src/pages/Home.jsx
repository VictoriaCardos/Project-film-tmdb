import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

const Home = () => {
  const [topMovies, setTopMovies] = useState([])

  const getTopRateMovies = async url => {
    const response = await fetch(url)
    const data = await response.json()
    setTopMovies(data.results)
    console.log(data.results)
  }

  useEffect(() => {
    const topRateUrl = `${moviesURL}top_rated?api_key=${apiKey}`

    getTopRateMovies(topRateUrl)
  }, [])

  return (
    <div className="container">
      <h2 className="title">Melhores Filmes</h2>
      <div className="movies-container">
        {topMovies.length > 0 &&
          topMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  )
}

export default Home
