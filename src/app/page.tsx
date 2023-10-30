import { DateTime } from 'luxon'
import ConfigContextProvider from '~/app/_components/ConfigContext'
import Dashboard from '~/app/_components/Dashboard'
import MeasurementsContextProvider, {
  SensorData,
} from '~/app/_components/MeasurementsContext'
import { getConfig, getSensorData } from '~/app/_db/db'

type SearchParams = {
  from?: string
  to?: string
}
const DashboardPage = async ({
  searchParams: { from, to },
}: {
  searchParams: SearchParams
}) => {
  const now = DateTime.now()
  let data: SensorData[] | undefined = await getSensorData(
    from ?? DateTime.now().minus({ days: 7 }).toISO() ?? '',
    to ?? now.toISO() ?? '',
  )

  const config = await getConfig()

  return (
    <div>
      <ConfigContextProvider config={config}>
        <MeasurementsContextProvider data={data}>
          <Dashboard />
        </MeasurementsContextProvider>
      </ConfigContextProvider>
    </div>
  )
}

export default DashboardPage
