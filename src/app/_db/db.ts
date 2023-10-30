import mysql, { Pool } from 'mysql2/promise'
import { SensorData } from '~/app/_components/MeasurementsContext'

let pool: Pool | undefined = undefined

export const connectToDb = async () => {
  console.log('Creating pool...') //eslint-disable-line no-console

  if (typeof pool !== 'undefined') {
    console.log('Pool exists') //eslint-disable-line no-console
    return pool
  }

  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  })

  console.log('Pool created') //eslint-disable-line no-console
  return pool
}

const mapSensorRow = (row: any): SensorData => ({
  id: row.id,
  sensorID: row.sensorID,
  distance: +row.distance,
  voltage: +row.voltage,
  RSSI: +row.RSSI,
  SNR: row.SNR,
  reading_time: row.reading_time,
})

export const getSensorData = async (from: string, to: string) => {
  if (!pool) {
    return
  }

  const connection = await pool.getConnection()

  const [rows] = await connection.execute(
    'select * from levelSensor.SensorData where reading_time between ? and ?',
    [from, to],
  )

  return (rows as any[]).map(mapSensorRow)
}

export const getLastLevelReading = async () => {
  if (!pool) {
    return
  }

  const connection = await pool.getConnection()

  const [rows] = await connection.execute(
    'select * from levelSensor.SensorData order by reading_time desc limit 1',
  )

  return (rows as any[]).map(mapSensorRow)[0]
}
