import { useMemo } from 'react'

import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { themeSlice } from '../../redux/slice/theme-slice'
import { AppDispatch } from '../../redux/store'

export const useThemeActions = () => {
  const dispatch = useDispatch<AppDispatch>()
  return useMemo(
    () => bindActionCreators(themeSlice.actions, dispatch),
    [dispatch],
  )
}

export default useThemeActions
