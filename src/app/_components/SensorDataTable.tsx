import { Table } from 'flowbite-react'
import React from 'react'
import { SensorData } from '~/app/_components/MeasurementsContext'
import { formatDate } from '~/app/_helpers/formatTime'

type Props = {
  data?: SensorData[]
}
const SensorDataTable = ({ data }: Props) => {
  if (!data || !data.length) {
    return (
      <div className="flex justify-center text-2xl text-gray-400">
        Brak danych
      </div>
    )
  }

  return (
    <Table>
      <Table.Head>
        <Table.HeadCell>Sensor ID</Table.HeadCell>
        <Table.HeadCell>Odległość</Table.HeadCell>
        <Table.HeadCell>Napięcie</Table.HeadCell>
        <Table.HeadCell>RSSI</Table.HeadCell>
        <Table.HeadCell>SNR</Table.HeadCell>
        <Table.HeadCell>Czas</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {data.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.sensorID}</Table.Cell>
            <Table.Cell>{row.distance}</Table.Cell>
            <Table.Cell>{row.voltage} V</Table.Cell>
            <Table.Cell>{row.RSSI}</Table.Cell>
            <Table.Cell>{row.SNR}</Table.Cell>
            <Table.Cell>{formatDate(row.reading_time)}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default SensorDataTable
