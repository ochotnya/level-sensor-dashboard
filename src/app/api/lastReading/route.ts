import { NextRequest, NextResponse } from 'next/server'
import { getLastLevelReading } from '~/app/_db/db'

export const GET = async (req: NextRequest) => {
  try {
    const result = await getLastLevelReading()

    return NextResponse.json({ ...result })
  } catch (error) {
    return NextResponse.json(
      { messsage: 'Failed to get last reading' },
      { status: 400 },
    )
  }
}
