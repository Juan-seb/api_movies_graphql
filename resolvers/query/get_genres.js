import { key, fetch } from '../get_required_tools.js'

const getGenres = async () => {

  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`

  try {
    const res = await fetch(url,{
      headers:{
        "Accept": "application/json"
      }
    })

    const json = await res.json()

    return json.genres

  } catch (error) {
    console.log(error)
  }

}

export default getGenres