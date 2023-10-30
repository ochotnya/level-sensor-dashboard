import { DateTime } from 'luxon'

export const formatDate = (dateString: Date): string | undefined => {
  const date = DateTime.fromJSDate(dateString, { zone: 'pl' })

  return date.toFormat('dd-MM-yyyy HH:mm')
}
