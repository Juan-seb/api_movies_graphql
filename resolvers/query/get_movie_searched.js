import { key, fetch } from '../get_required_tools.js'

const getMovieSearched = async (root, args) => {
  const { page, search } = args

  const sortBy = '&sort_by=release_date.desc'
  const pageResult = `&page=${page}`
  const query = `&query=${search}`
  const general = "&language=en-US&include_adult=false"

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}${sortBy}${pageResult}${query}${general}`

  try {
    const res = await fetch(url, {
      headers: {
        "Accept": "application/json"
      }
    })

    const json = await res.json()

    // Map the results to convert to the schema
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

export default getMovieSearched