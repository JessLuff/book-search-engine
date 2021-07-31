# book-search-engine

update auth in client
Excuse me Past Jess wtf does this mean

BACK END


FRONT END
queries.js query GET_ME -> me query
mutations.js
    LOGIN_USER -> loginUser
    ADD_USER -> addUser
    SAVE_BOOK -> saveBook
    REMOVE_BOOK -> removeBook
App.js create Apollo Provider
SearchBooks.js Use useMutation() hook to excecute SAVE_HOOK in handleSaveBook()
    Keep logic for save book ID in try...catch
SavedBooks.js
    Use useQuery() hook to execute GET_ME save to variable userData, instead of useEffect() for UserData
    Use useMutation() hook to execute REMOVE_BOOK mutation in handleDeleteBook() instead of deleteBook() KEEP removeBookId() FUNCTION
SignupForm.js
    Replace addUser() with ADD_USER mutation
LoginForm.js
    replace loginUser() with LOGIN_USER

DONE BACK END
server.js add Apollo
auth.js Update for GraphQL
Schemas:
    index.js export TypeDefs and Resolvers
Schemas Add:
    resolvers.js (take from user-controller)
    typeDefs.js (CURRENT WORK)
    Mutations
        login: returns Auth
        addUser: input username, email, password, returns Auth
        saveBook: import desc, title, bookId, image, link, returns User (use Input type??)
        removeBook: import bookId, returns 
    Auth
        token
        user
    User and Book types (more deets in spec)


DONE FRONT END



Exercises 1 & 12??