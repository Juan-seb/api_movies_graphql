import { key, fetch } from '../get_required_tools.js'

const getMovie = async (root, args) => {

  const { movie_id } = args
  
  let url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${key}&language=en-US`
  console.log(url)
  try {
    const res = await fetch(url, {
      headers: {
        "Accept": "application/json"
      }
    })

    const json = await res.json()
    const { id,
      genres,
      original_language,
      overview,
      backdrop_path,
      poster_path,
      production_companies,
      production_countries,
      release_date,
      runtime,
      spoken_languages,
      status,
      title
    } = json

    console.log(production_countries,production_countries)
    const languages = spoken_languages.map(language => language.name)

    return {
      id,
      genres,
      original_language,
      overview,
      backdrop: backdrop_path,
      poster: poster_path,
      production_companies: production_companies.map(company => ({
        id: company.id,
        logo: company.logo_path,
        name: company.name,
        country: company.origin_country
      })),
      production_countries: production_countries.map(country => {
        return {
          name: country.name,
          region: country.iso_3166_1
        }
      }),
      release_date,
      duration: runtime,
      spoken_languages: languages,
      status,
      title
    }

  } catch (error) {
    console.log(error)
  }

}

export default getMovie