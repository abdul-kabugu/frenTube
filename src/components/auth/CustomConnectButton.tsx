import Button, { ButtonProps } from '@/components/Button'
import { useMyAccount } from '@/stores/my-account'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

type CustomConnectButtonProps = ButtonProps & {
  className?: string
  label?: React.ReactNode
  signAndLinkOnConnect?: boolean
  signAndLinkEvmAddress: (
    emvAddress?: string,
    substrateAddress?: string | null
  ) => Promise<void>
  isLoading: boolean
}

export const CustomConnectButton = ({
  className,
  signAndLinkEvmAddress,
  label = 'Connect EVM Wallet',
  isLoading,
  signAndLinkOnConnect = true,
  ...buttonProps
}: CustomConnectButtonProps) => {
  const mySubstrateAddress = useMyAccount((state) => state.address)
  const { isConnected } = useAccount({
    onConnect: async ({ address }) => {
      !isConnected &&
        signAndLinkOnConnect &&
        signAndLinkEvmAddress(address, mySubstrateAddress)
    },
  })

  const commonButtonProps: ButtonProps = {
    size: 'lg',
    className: className,
    isLoading: isLoading,
    ...buttonProps,
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')

        if (!connected) {
          return (
            <Button onClick={openConnectModal} {...commonButtonProps}>
              {label}
            </Button>
          )
        }

        if (chain.unsupported) {
          return (
            <Button onClick={openChainModal} {...commonButtonProps}>
              Wrong network
            </Button>
          )
        }

        return (
          <Button
            onClick={async () => {
              signAndLinkEvmAddress(account.address, mySubstrateAddress)
            }}
            {...commonButtonProps}
          >
            {label}
          </Button>
        )
      }}
    </ConnectButton.Custom>
  )
}