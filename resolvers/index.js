import { GraphQLScalarType } from 'graphql'
import Query from './query/index.js'

const resolvers = {
  Query,
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Scalar value of date',
    parseValue: (value) => {
      // return the date
      return new Date(value) 

    },
    serialize: (value) => {
      // Return a integer, convert the date to a integer
      return new Date(value).getTime()
    }
  })
}

export default resolvers