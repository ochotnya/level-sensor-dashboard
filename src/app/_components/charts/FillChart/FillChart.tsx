'use client'

import { Progress } from 'flowbite-react'
import React from 'react'
import { useConfigContext } from '~/app/_components/ConfigContext'
import { SensorData } from '~/app/_components/MeasurementsContext'

type Props = {
  data: SensorData
}

const FillChart = ({ data }: Props) => {
  const { config } = useConfigContext()

  const currentDistance = data.distance ?? 0
  const progress = Math.ceil(
    ((config.distanceEmpty - currentDistance) /
      (config.distanceEmpty - config.distanceFull)) *
      100,
  )

  const color = () => {
    if (currentDistance > config.distanceWarning) {
      return 'green'
    }

    if (currentDistance > config.distanceCritical) {
      return 'yellow'
    }

    return 'red'
  }

  return (
    <div className="pb-4">
      <Progress
        labelProgress
        labelText
        progress={progress}
        size="lg"
        color={color()}
        textLabel="Aktualne zapełnienie"
        textLabelPosition="outside"
        theme={{
          bar: 'rounded-full text-center font-medium leading-none text-white dark:text-cyan-100 space-x-2',
        }}
      />
    </div>
  )
}

export default FillChart
