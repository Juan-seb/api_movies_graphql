import { gql } from "apollo-server";

const typeDefs = gql`

  scalar Date

  type PreviewMovie{
    id: ID!
    overview: String
    poster: String
    release_date: Date
    title: String!
  }

  type Genre{
    id: ID!
    name: String!
  }

  type Company{
    id: ID!
    logo: String!
    name: String!
    country: String!
  }

  type Country{
    region: String
    name: String!
  }

  type InfoProviders{
    logo: String
    provider_name: String!
  }

  type Movie{
    id: ID!
    genres: [Genre]!
    original_language: String
    overview: String
    backdrop: String!
    poster: String!
    production_companies: [Company]
    production_countries: [Country]
    release_date: Date
    duration: Int
    spoken_languages: [String]
    status: String
    title: String!
  }

  type Provider{
    country: String
    forRent: [InfoProviders]
    forSale: [InfoProviders]
  }

  type CastActor{
    id: ID!
    gender: Int!
    name: String!
    profile: String!
    characterInMovie: String!
  }

  type Actor{
    name: String!
    biography: String
    birthDate: Date!
    gender: Int!
    id: ID!
    place_of_birth: String
    profileImage: String
  }

  type Query{

    getListOfMovies(
      page: Int!
      year: Int!
      semester: Int!
      region: [String]      
    ):[PreviewMovie]


    getMovie(
      movie_id: ID!
    ): Movie!

    getGenres: [Genre]!

    getListOfMoviesByGenre(
      genre:[Int!]!
    ):[PreviewMovie]!

    getProviders(
      movie_id: ID!
    ): [Provider]

    getMovieSearched(
      search: String!
    ):[PreviewMovie]!

    getCast(
      movie_id: ID!
    ): [CastActor]!

  }
`

export default typeDefs