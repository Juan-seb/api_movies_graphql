import {ApolloServer} from 'apollo-server'
import typeDefs from './typeDefs.js'
import resolvers from './resolvers/index.js'

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen({port:process.env.PORT||4000}).then(({url})=>{
  console.log(`🚀 Server ready at ${url}`)
})

