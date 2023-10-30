'use client'

import { createContext, PropsWithChildren, useContext } from 'react'

type Config = {
  distanceEmpty: number
  distanceFull: number
  distanceWarning: number
  distanceCritical: number
}
type ConfigContextType = {
  config: Config
}

const ConfigContext = createContext<ConfigContextType>(undefined!)

const ConfigContextProvider = ({
  children,
  config,
}: PropsWithChildren<ConfigContextType>) => {
  return (
    <ConfigContext.Provider value={{ config }}>
      {children}
    </ConfigContext.Provider>
  )
}

export const useConfigContext = () => {
  const context = useContext(ConfigContext)

  if (typeof context === 'undefined') {
    throw new Error(
      'useConfigContext should be used within ConfigContext provider',
    )
  }

  return context
}

export default ConfigContextProvider
