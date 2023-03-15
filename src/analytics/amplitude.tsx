import { getAmpId } from '@/utils/env/client'
import { createInstance } from '@amplitude/analytics-browser'

export async function createAmplitudeInstance() {
  if (typeof window === 'undefined') return null
  const ampId = getAmpId()
  if (!ampId) return null

  try {
    const amp = createInstance()
    await amp.init(getAmpId(), undefined, { disableCookies: true }).promise
    return amp
  } catch (e) {
    console.error(e)
    return null
  }
}
