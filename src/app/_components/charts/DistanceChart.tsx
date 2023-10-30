import { ChartData, Point } from 'chart.js'
import React, { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { Card } from 'flowbite-react'
import { formatDate } from '~/app/_helpers/formatTime'
import { useConfigContext } from '~/app/_components/ConfigContext'
import { useMeasurementContext } from '~/app/_components/MeasurementsContext'

const DistanceChart = () => {
  const { config } = useConfigContext()
  const { data } = useMeasurementContext()

  const voltageDataset: ChartData<'line', (number | Point | null)[], unknown> =
    useMemo(
      () => ({
        labels: (data ?? []).map((item) => formatDate(item.reading_time)),
        datasets: [
          {
            label: 'Odległość',
            data: (data ?? []).map((item) => item.distance),
          },
        ],
      }),
      [data],
    )

  if (!data || !data.length) {
    return (
      <Card>
        <div className="flex justify-center  text-2xl text-gray-400">
          Brak danych
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold">Odległość</h3>
      <Line
        data={voltageDataset}
        height={120}
        options={{
          plugins: { legend: { display: false } },
          responsive: true,
          elements: {
            line: {
              borderWidth: 2,
              tension: 0,
              fill: 'start',
              backgroundColor: 'rgba(67,73,252, 0.3',
            },
          },
          scales: {
            x: {
              ticks: {
                display: false,
              },
            },
            y: {
              ticks: {
                callback: (value, index, ticks) => `${value} mm`,
              },
              min: 0,
              max: 4500,
            },
          },
        }}
      />
    </Card>
  )
}

export default DistanceChart
