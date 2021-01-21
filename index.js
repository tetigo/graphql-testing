const {ApolloServer, gql} = require('apollo-server')

//schema
//informando ao GraphQL a estrutura (shape) que o cliente pode consultar
//schema é descricao dos dados que cliente pode requisitar da API GraphQL
//HelloWorld é objeto com campo chamado message que contem dado String
//Query falamos pro GraphQL que cliente pode executar consulta chamada
//helloworld e como resultado, os dados retornados são do tipo HelloWorld.
//Query é objeto especial que define todos os dados que cliente pode requisitar
const typeDefs = gql(`
type HelloWorld {
    message: String,
    text: String,
    number: String
}
type Query {
    helloworld: HelloWorld
}
`)

//o objeto em si que será retornado na consulta
const HelloWorld = {
    message: "Hello Fucking World from GraphQL !!!",
    text: "It can be possible!",
    number: 43
}

//resolver é função que fala ao GraphQL de onde pegar os dados,
//fala pro GraphQL que dados deve retornar quando usuario efetuar consulta
const resolvers = {
    Query: {
        helloworld() {
            return HelloWorld
        }
    }
}

//e por fim levantamos o servidor, que fica ouvindo na porta 4000
const server = new ApolloServer({
    typeDefs,
    resolvers
})
server.listen().then(({url})=>{
    console.log(`Server ready at ${url}`)
})

//executar comando:
// query{
//     helloworld{
//         message
//     }
// }

// query{
//     helloworld{
//         number
//     }
// }
