import {configureStore, createAsyncThunk, createSlice} from "@reduxjs/toolkit"


const API_key = 'AIzaSyDrvonmdMrUrhP3pffJq_BRMZk8NrIHKyY'


export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async ( _ , {getState, rejectWithValue}) => {

        const input = getState().searchInput
        const order = getState().order
        const booksToShow = 30
        const startIndex = 0

        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}&orderBy=${order}&maxResults=${booksToShow}&startIndex=${startIndex}&key=${API_key}`)
    
            if (!response.ok) {
                throw new Error("Something went wrong...")
            }
            const books = await response.json()
            return books
            
        } catch (error) {
            return rejectWithValue(error.message)
        }
           
    }
 )


 export const fetchMoreBooks = createAsyncThunk(
     "books/fetchMoreBooks",
     async ( _ , {getState, rejectWithValue}) => {
        const input = getState().searchInput
        const order = getState().order
        const booksToShow = 30
        const startIndex = getState().startIndex
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}&orderBy=${order}&maxResults=${booksToShow}&startIndex=${startIndex}&key=${API_key}`)
            if (!response.ok) {
                throw new Error("Cannot get more books...")
            }
            const books = await response.json()
            return books
        } catch (error) {
            return rejectWithValue(error.message)
        }
     }
     
 )



const booksSlice = createSlice({
    name: 'books',
    initialState: {
        booksList: [],
        totalNumber: 0,
        startIndex: 0,
        searchInput: '',
        category: 'All',
        order: 'relevance',
        enableLoadMore: false,
        status: null,
        error: null,
        scroll: 0
    },
    reducers: {
        setSearchInput(state, action){
            state.searchInput = action.payload
        },
        setFilterCategory(state, action){
            state.category = action.payload
        },
        setFilterOrder(state, action){
            state.order = action.payload
        },
        setEnableLoadMore(state, action){
            state.enableLoadMore = action.payload
        },
        setStartIndex(state, action){
            state.startIndex += action.payload
        },
        setScroll(state, action){
            state.scroll = action.payload
        }
    },
    extraReducers: {
        [fetchBooks.pending]: (state) => {
            state.status = 'loading'
            
        },
        [fetchBooks.fulfilled]: (state, action) => {
            state.status = 'success'
            state.booksList = action.payload.items
            state.totalNumber = action.payload.totalItems
            
        },
        [fetchBooks.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
            console.log(state.error)
        },
        [fetchMoreBooks.pending]: (state) => {
            state.status = 'loading'
            
        },
        [fetchMoreBooks.fulfilled]: (state, action) => {
            state.status = 'success'
            if (action.payload.items) {
                state.booksList = [...state.booksList, ...action.payload.items]
            }
            
        },
        [fetchMoreBooks.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
            console.log(state.error)
        }
    }
})

const store = configureStore({
    reducer: booksSlice.reducer
})

export default store;
export const { setSearchInput, setFilterCategory, setFilterOrder, setEnableLoadMore, setStartIndex, setScroll } = booksSlice.actions