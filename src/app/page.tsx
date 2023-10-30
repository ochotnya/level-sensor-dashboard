import { DateTime } from 'luxon'
import ConfigContextProvider from '~/app/_components/ConfigContext'
import Dashboard from '~/app/_components/Dashboard'
import MeasurementsContextProvider, {
  SensorData,
} from '~/app/_components/MeasurementsContext'

import { connectToDb, getSensorData } from '~/app/_db/db'

type SearchParams = {
  from?: string
  to?: string
}
const DashboardPage = async ({
  searchParams: { from, to },
}: {
  searchParams: SearchParams
}) => {
  await connectToDb()
  const now = DateTime.now()
  let data: SensorData[] | undefined = await getSensorData(
    from ?? DateTime.now().minus({ days: 7 }).toISO() ?? '',
    to ?? now.toISO() ?? '',
  )

  return (
    <div>
      <ConfigContextProvider
        config={{
          distanceCritical: 70,
          distanceEmpty: 500,
          distanceFull: 50,
          distanceWarning: 100,
        }}
      >
        <MeasurementsContextProvider data={data}>
          <Dashboard />
        </MeasurementsContextProvider>
      </ConfigContextProvider>
    </div>
  )
}

export default DashboardPage
