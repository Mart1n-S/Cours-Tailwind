import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Définition du type de ton state
interface CounterState {
    value: number
}

// État initial
const initialState: CounterState = {
    value: 0,
}

// Création du slice
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
    },
})

// Export des actions
export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Export du reducer
export default counterSlice.reducer
