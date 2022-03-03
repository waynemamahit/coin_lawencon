import { createSlice } from "@reduxjs/toolkit"

const coinSlice = createSlice({
  name: "coin",
  initialState: {
    types: [],
    loading: false,
    error: false
  },
  reducers: {
    setData(state, action) {
      let { field, data } = action.payload
      state[field] = data
    },
    setLoading(state) { 
      state.loading = !state.loading
    },
  }
})

export const { setData, setLoading } = coinSlice.actions

export const selectCoin = state => state.coin

export default coinSlice.reducer