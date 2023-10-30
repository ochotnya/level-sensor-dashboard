import React, { useMemo } from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  LineElement,
} from 'chart.js'
import VoltageChart from '~/app/_components/charts/VoltageChart'
import DistanceChart from '~/app/_components/charts/DistanceChart'
import CurrentLevelIndicator from '~/app/_components/charts/FillChart/CurrentLevelIndicator'
import DateRange from '~/app/_components/DateRange'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  LineElement,
)

export type Dataset = {
  data: []
  labels: string[]
}

const SensorCharts = () => {
  return (
    <div>
      <CurrentLevelIndicator />
      <DateRange />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <VoltageChart />
        <DistanceChart />
      </div>
    </div>
  )
}

export default SensorCharts
