import { GraphQLScalarType } from 'graphql'
import Query from './query/index.js'

const resolvers = {
  Query,
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Scalar value of date',
    parseValue: (value) => {
      return new Date(value) 

    },
    serialize: (value) => {
      console.log(typeof new Date(value).getTime())
      return new Date(value).getTime()
    }
  })
}

export default resolvers