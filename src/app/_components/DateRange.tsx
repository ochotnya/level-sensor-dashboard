'use client'

import { Button } from 'flowbite-react'
import { DateTime } from 'luxon'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormFields = {
  dateFrom?: string
  dateTo?: string
}

const defaultRange: FormFields = {
  dateFrom: DateTime.now().minus({ days: 7 }).toFormat("yyyy-MM-dd'T'HH:mm"),
  dateTo: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
}

const DateRange = () => {
  const { get } = useSearchParams()
  const pathname = usePathname()

  const fromParam = get('from')
  const toParam = get('to')

  const { register, handleSubmit, reset } = useForm<FormFields>({
    defaultValues: {
      dateFrom: fromParam ?? defaultRange.dateFrom,
      dateTo: toParam ?? defaultRange.dateTo,
    },
  })
  const router = useRouter()

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const params = new URLSearchParams()

    if (data.dateFrom) {
      params.set('from', data.dateFrom)
    }

    if (data.dateTo) {
      params.set('to', data.dateTo)
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const resetRange = () => {
    router.push(`${pathname}`)
    reset(defaultRange)
  }

  return (
    <form className="flex gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
      <input type="datetime-local" {...register('dateFrom')} />
      <input type="datetime-local" {...register('dateTo')} />

      <Button type="submit">Wczytaj</Button>
      <Button color="gray" onClick={resetRange}>
        Resetuj zakres
      </Button>
    </form>
  )
}

export default DateRange
