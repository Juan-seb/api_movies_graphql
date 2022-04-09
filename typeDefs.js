import { gql } from "apollo-server";

const typeDefs = gql`

  type Movie{
    name: String!
  }

  type Query{

    getMovie: Movie!

  }
`

export default typeDefs