import { Spinner } from 'flowbite-react'
import React from 'react'
import useSWR from 'swr'
import { SensorData } from '~/app/_components/MeasurementsContext'
import FillChart from '~/app/_components/charts/FillChart/FillChart'

const fetcher = async (url: string): Promise<SensorData> => {
  const response = await fetch(url, { cache: 'no-cache' })
  return await response.json()
}

const CurrentLevelIndicator = () => {
  const { data, isLoading } = useSWR('/api/lastReading', fetcher)

  if (isLoading) {
    return (
      <div className="flex w-full justify-center p-4">
        <Spinner />
      </div>
    )
  }
  if (!data) {
    return (
      <div className="flex w-full justify-center p-4 text-gray-400">
        Brak danych o ostatnim odczycie
      </div>
    )
  }

  return <FillChart data={data} />
}

export default CurrentLevelIndicator
