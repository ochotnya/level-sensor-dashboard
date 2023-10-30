import { ChartData, Point } from 'chart.js'
import React, { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { Card } from 'flowbite-react'
import { formatDate } from '~/app/_helpers/formatTime'
import { useMeasurementContext } from '~/app/_components/MeasurementsContext'

const VoltageChart = () => {
  const { data } = useMeasurementContext()
  const voltageDataset: ChartData<'line', (number | Point | null)[], unknown> =
    useMemo(
      () => ({
        labels: (data ?? []).map((item) => formatDate(item.reading_time)),
        datasets: [
          {
            label: 'Napięcie',
            data: (data ?? []).map((item) => item.voltage),
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
      <h3 className="text-lg font-semibold">Napięcie</h3>
      {
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
                backgroundColor: 'rgba(47,97,68, 0.3',
              },
            },
            scales: {
              x: {
                ticks: {
                  display: false,
                },
              },
              y: {
                min: 3.2,
                max: 3.7,
                ticks: {
                  callback: (value, index, ticks) => `${(+value).toFixed(2)} V`,
                },
              },
            },
          }}
        />
      }
    </Card>
  )
}

export default VoltageChart
