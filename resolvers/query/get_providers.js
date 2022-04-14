import { key, fetch, countryTuples } from '../get_required_tools.js'

const getProviders = async (root, args) => {

  const { movie_id } = args

  const url = `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=${key}`

  try {
    const res = await fetch(url, {
      headers: {
        "Accept": "application/json"
      }
    })

    const json = await res.json()

    // The results is in form of a object
    const results = Object.entries(json.results).map(result => {
      
      // Extract of the result the country code
      const countryCode = result[0]

      // With a array of tuples of the country and the name filter with the country code and return the country
      const country = countryTuples.filter(country => country[1] === countryCode).pop()

      // Create a object with the sites where the movie can be rent
      const rent = result[1].rent.map(({ logo_path, provider_name }) => {

        return {
          logo: logo_path,
          provider_name
        }
      })

      // Create a object with the sites where the movie can be sell
      const sell = result[1].buy.map(({ logo_path, provider_name }) => {
        return {
          logo: logo_path,
          provider_name
        }
      })

      // Return the object according to the typeDefs
      return {
        country: country[0],
        forRent: rent,
        forSale: sell
      }

    })

    return results

  } catch (error) {
    console.log(error)
  }

}

export default getProviders