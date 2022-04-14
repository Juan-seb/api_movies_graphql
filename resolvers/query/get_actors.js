import { key, fetch } from '../get_required_tools.js'

const getActors = async (root, args) => {

  const { movie_id } = args

  const url = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${key}&language=en-US`

  try {
    const res = await fetch(url, {
      headers: {
        "Accept": "application/json"
      }
    })

    const json = await res.json()

    // Filter the all cast only with the actors
    const actors = json.cast.filter(actor => actor.known_for_department === "Acting")
    const results = actors.map(actor => {
      const { id, gender, name, profile_path, character } = actor
      
      return {
        id,
        gender: gender === 1 ? "Female" : "Male",
        name,
        profileImage: profile_path,
        characterInMovie: character
      }
    })

    return results

  } catch (error) {

  }

}

export default getActors