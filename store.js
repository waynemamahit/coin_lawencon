// import { Iterable } from 'immutable'
import { 
  configureStore,
} from '@reduxjs/toolkit'
import coinSlice from './reducers/coinSlice'

export default configureStore({
  reducer: {
    coin: coinSlice
  },
})
