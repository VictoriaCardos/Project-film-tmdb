import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'

import ReactPaginate from 'react-paginate'

import './MovieGrid.css'

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

const Home = () => {
  function Items({ currentItems }) {
    return (
      <>
        {topMovies.length > 0 &&
          topMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </>
    )
  }
  const [itemOffset, setItemOffset] = useState(1)
  const [actualPage, setActualPage] = useState(1)
  function PaginatedItems({ itemsPerPage }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage
    console.log(`Loading items from ${itemOffset} to ${endOffset}`)
    const currentItems = topMovies.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(page / itemsPerPage)

    // Invoke when user click to request another page.
    const handlePageClick = event => {
      const newOffset = (event.selected * itemsPerPage) % topMovies.length
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      )
      setItemOffset(newOffset)
      setActualPage(event.selected)
      console.log(actualPage)
    }

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </>
    )
  }

  const [topMovies, setTopMovies] = useState([])
  const [page, setPage] = useState(0)

  const getTopRateMovies = async url => {
    const response = await fetch(url)
    const data = await response.json()

    setItemOffset(data.total_results)
    setPage(data.total_pages)
    setTopMovies(data.results)
    console.log(data.results)
  }

  useEffect(() => {
    const topRateUrl = `${moviesURL}top_rated?api_key=${apiKey}&page=${actualPage}`

    getTopRateMovies(topRateUrl)
  }, [actualPage])

  return (
    <div className="container">
      <h2 className="title">Melhores Filmes</h2>
      <div className="movies-container">
        <PaginatedItems itemsPerPage={20}></PaginatedItems>
      </div>
    </div>
  )
}

export default Home
