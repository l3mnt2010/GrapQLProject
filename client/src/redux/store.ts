import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authSlide from './slide/authSlide'
import subjectSlide from './slide/subjectSlide'

const store = configureStore({
  reducer: {
    auth: authSlide,
    subject: subjectSlide
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store