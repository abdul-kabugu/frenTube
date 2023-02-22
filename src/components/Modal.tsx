import { cx } from '@/utils/className'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { HiX } from 'react-icons/hi'
import Button from './Button'

export type ModalProps = {
  isOpen: boolean
  closeModal: () => void
  showCloseButton?: boolean
  children: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
}

export default function Modal({
  children,
  closeModal,
  showCloseButton,
  isOpen,
  title,
  description,
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10 text-text' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className={cx(
                  'relative w-full max-w-md overflow-hidden rounded-3xl bg-background-light',
                  'p-8 text-left align-middle shadow-xl',
                  'transform transition-all',
                  'flex flex-col'
                )}
              >
                {showCloseButton && (
                  <Button
                    className='absolute right-8 p-1 pr-0 text-2xl text-text-muted'
                    variant='transparent'
                  >
                    <HiX />
                  </Button>
                )}
                {title && (
                  <Dialog.Title as='h3' className={cx('mb-4 text-2xl')}>
                    {title}
                  </Dialog.Title>
                )}
                {description && (
                  <Dialog.Description className={cx('mb-4 text-text-muted')}>
                    {description}
                  </Dialog.Description>
                )}

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}