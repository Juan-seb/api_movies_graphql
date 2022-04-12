import { key, fetch } from '../get_required_tools.js'

const getListOfMovies = async (root, args) => {
  const { page, year, semester, region } = args
  const sortBy = '&sort_by=release_date.desc'
  const pageResult = `&page=${page}`
  const yearToSearch = `&year=${year}`
  const regionToSearch = `${region ? "&" + region.join(',') : '&region=US,CO,BR,FR,UK,CA&'}`
  const primaryRelease = `&primary_release_year=${year}`
  const general = "&include_adult=false&include_video=false&language=en-US"
  let releaseDateLte = "&release_date.lte="
  let releaseDateGte = "&release_date.gte="

  releaseDateLte += new Date().toISOString().split('T')[0]
  releaseDateGte += `${new Date().getFullYear}-01-01`

  if (!(year === new Date().getFullYear)) {
    releaseDateLte = (semester === 1) ? `&release_date.lte=${year}-06-30` : `&release_date.lte=${year}-12-31`
    releaseDateGte = (semester === 1) ? `&release_date.gte=${year}-01-01` : `&release_date.gte=${year}-06-30`
  }

  const url = "https://api.themoviedb.org/3/discover/movie?api_key="
  const urlWithFilters = `${url}${key}${sortBy}${pageResult}${yearToSearch}${regionToSearch}${primaryRelease}${releaseDateLte}${releaseDateGte}${general}`

  try {

    // Get the movie list of the specific time
    const res = await fetch(urlWithFilters, {
      headers: {
        "Accept": "application/json"
      }
    })

    const json = await res.json()

    // Map the results
    const resToGraph = json.results.map(result => {

      const { id, overview, poster_path, release_date, title } = result

      return {
        id,
        overview,
        poster: poster_path,
        release_date,
        title
      }

    })

    return resToGraph

  } catch (error) {
    console.log(error)
  }

}

/* https://image.tmdb.org/t/p/w500/osYbtvqjMUhEXgkuFJOsRYVpq6N.jpg */

export default getListOfMovies