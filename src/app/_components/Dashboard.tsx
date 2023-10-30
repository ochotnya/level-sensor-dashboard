'use client'

import { Tabs } from 'flowbite-react'
import React from 'react'
import { HiTable, HiPresentationChartLine } from 'react-icons/hi'
import { useMeasurementContext } from '~/app/_components/MeasurementsContext'
import SensorCharts from '~/app/_components/SensorCharts'
import SensorDataTable from '~/app/_components/SensorDataTable'

const Dashboard = () => {
  const { data } = useMeasurementContext()

  return (
    <div>
      <div className="text-xl">Dashboard</div>
      <Tabs.Group style="underline" className="outline-none focus:outline-none">
        <Tabs.Item
          active
          icon={HiPresentationChartLine}
          title="Wykresy"
          className="outline-none focus:outline-none"
        >
          <SensorCharts />
        </Tabs.Item>
        <Tabs.Item active icon={HiTable} title="Tabela pomiarów">
          <SensorDataTable data={data} />
        </Tabs.Item>
      </Tabs.Group>
    </div>
  )
}

export default Dashboard
