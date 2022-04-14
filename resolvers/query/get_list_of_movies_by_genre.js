import { key, fetch } from '../get_required_tools.js'

const getListOfMoviesByGenre = async (root, args) => {

  const { page, year, region, genre } = args

  const sortBy = '&sort_by=release_date.desc'
  const pageResult = `&page=${page}`
  const yearToSearch = `&year=${year}`
  const regionToSearch = `${region ? "&region=" + region.join(',') : '&region=US,CO,BR,FR,UK,CA&'}`
  const genresUrl = `&with_genres=${genre.join(',')}`
  const primaryRelease = `&primary_release_year=${year}`
  const general = "&include_adult=false&include_video=false&language=en-US"

  const url = "https://api.themoviedb.org/3/discover/movie?api_key="
  const urlWithFilters = `${url}${key}${sortBy}${pageResult}${yearToSearch}${regionToSearch}${primaryRelease}${genresUrl}${general}`

  try {
    
    // Fetching the data with the url constructed
    const res = await fetch(urlWithFilters,{
      headers:{
        "Accept": "application/json"
      },
    })

    // Convert to javascript object
    const json = await res.json()
    
    // Map the results to the predefined schema
    const results = json.results.map(result => {

      const { id, overview, poster_path, release_date, title } = result

      return {
        id,
        overview,
        poster: poster_path,
        release_date,
        title
      }
    })

    return results

  } catch (error) {
    console.log(error)
  }

}

export default getListOfMoviesByGenre