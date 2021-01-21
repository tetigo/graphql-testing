const { ApolloServer, gql } = require("apollo-server");
const authors = [
    { id: 1, name: "J. K. Rowling" },
    { id: 2, name: "J. R. R. Tolkien" },
    { id: 3, name: "Brent Weeks" },
];

const books = [
    { id: 1, name: "Harry Potter and the Chamber of Secrets", authorId: 1 },
    { id: 2, name: "Harry Potter and the Prisoner of Azkaban", authorId: 1 },
    { id: 3, name: "Harry Potter and the Goblet of Fire", authorId: 1 },
    { id: 4, name: "The Fellowship of the Ring", authorId: 2 },
    { id: 5, name: "The Two Towers", authorId: 2 },
    { id: 6, name: "The Return of the King", authorId: 2 },
    { id: 7, name: "The Way of Shadows", authorId: 3 },
    { id: 8, name: "Beyond the Shadows", authorId: 3 },
];
const typeDefs = gql(`
type Book {
    name:String
    authorId:Int
    id:ID!
    author: Author
}
type Author {
    id: ID!,
    name:String,  
    books:[Book] 
}
type Query {
    books:[Book]
    authors:[Author]
    bookById(id : Int) : Book
    authorById(id: Int) : Author
}
type Mutation{
    addBook(name: String, authorId: Int): Book
    addAuthor(name:String): Author
}
`);
const resolvers = {
    Query: {
        books() {
            return books;
        },
        authors() {
            return authors;
        },
        bookById(parent, args, context, info) {
            console.log(args);
            return books.find((book) => book.id === args.id);
        },
        authorById(parent, args, context, info) {
            return authors.find((author) => author.id === args.id);
        },
    },
    Book: {
        author(parent) {
            return authors.find((author) => author.id === parent.authorId);
        },
    },
    Author: {
        books(parent) {
            return books.filter((book) => book.authorId === parent.id);
        },
    },
    Mutation: {
        addBook(parent, args, context, info) {
            const book = {
                id: books.length + 1,
                name: args.name,
                authorId: args.authorId
            }
            books.push(book)
            return book
        },
        addAuthor(parent, args, context, info) {
            const author = {
                id: author.length + 1,
                name: args.name,
            }
            authors.push(author)
            return author
        }
    }

};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});

// mutation{
//     addBook(name:"Sample Book", authorId:2){
//       name
//       id
//       authorId
//     }
//   }