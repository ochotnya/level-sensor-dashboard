import mysql from 'mysql2/promise'
import { Config } from '~/app/_components/ConfigContext'
import { SensorData } from '~/app/_components/MeasurementsContext'

const dbName = process.env.DB_NAME ?? 'levelSensor'

const connectToDb = async () =>
  mysql.createConnection(process.env.DATABASE_URL ?? '')

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
  const connection = await connectToDb()

  const [rows] = await connection.execute(
    `select * from ${dbName}.SensorData where reading_time between ? and ? order by reading_time asc`,
    [from, to],
  )

  connection.end()
  return (rows as any[]).map(mapSensorRow)
}

export const getLastLevelReading = async () => {
  const connection = await connectToDb()

  const [rows] = await connection.execute(
    `select * from ${dbName}.SensorData order by reading_time desc limit 1`,
  )
  connection.end()
  return (rows as any[]).map(mapSensorRow)[0]
}

export const getConfig = async (): Promise<Config> => {
  const connection = await connectToDb()

  const [rows] = await connection.execute(`select * from ${dbName}.Config`)

  connection.end()

  const data = (rows as any[])[0]
  return {
    distanceCritical: data.distanceCritical,
    distanceEmpty: data.distanceEmpty,
    distanceFull: data.distanceFull,
    distanceWarning: data.distanceWarning,
  }
}
