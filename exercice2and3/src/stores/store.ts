import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './actions/counterSlice'

// Création du store Redux
export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
})

// Types pour l'utilisation dans React
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
