import { Theme } from '@/@types/theme'
import { useConfigContext } from '@/providers/ConfigProvider'
import { getAccountDataQuery } from '@/services/subsocial/evmAddresses'
import { generateRandomColor } from '@/utils/random-colors'
import useGetTheme from './useGetTheme'

export default function useRandomColor(
  seed: string | null | undefined,
  config: {
    isAddress?: boolean
    theme?: Theme
  } = {}
) {
  const { isAddress, theme } = config

  const { theme: configTheme } = useConfigContext()
  const currentTheme = useGetTheme()
  const { data: accountData } = getAccountDataQuery.useQuery(seed || '', {
    enabled: !!isAddress,
  })

  const { evmAddress } = accountData || {}

  return generateRandomColor(
    evmAddress || seed,
    theme ?? configTheme ?? currentTheme
  )
}
