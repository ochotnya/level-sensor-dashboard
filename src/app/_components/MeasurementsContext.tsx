'use client'

import { createContext, PropsWithChildren, useContext } from 'react'

export type SensorData = {
  id: number
  sensorID: string
  distance: number
  voltage: number
  RSSI: number
  SNR: number
  reading_time: Date
}

type MeasurementsContextType = {
  data?: SensorData[]
}

const MeasurementsContext = createContext<MeasurementsContextType>(undefined!)

const MeasurementsContextProvider = ({
  children,
  data,
}: PropsWithChildren<MeasurementsContextType>) => {
  return (
    <MeasurementsContext.Provider value={{ data }}>
      {children}
    </MeasurementsContext.Provider>
  )
}

export const useMeasurementContext = () => {
  const context = useContext(MeasurementsContext)

  if (typeof context === 'undefined') {
    throw new Error(
      'useMeasurementsContext should be used within MeasurementsContext provider',
    )
  }

  return context
}

export default MeasurementsContextProvider
