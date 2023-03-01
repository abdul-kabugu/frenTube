import Bitcoin from '@/assets/topics/bitcoin.png'
import ChatRoom from '@/components/chats/ChatRoom'
import { getTopicId } from '@/constants/topics'
import { useRouter } from 'next/router'
import ChatNavbarExtension from './ChatNavbarExtension'

const dummyChats = [
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'right',
  },
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'left',
  },
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'left',
  },
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'left',
  },
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'left',
  },
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'left',
  },
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'left',
  },
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'left',
  },
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'left',
  },
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'right',
  },
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'left',
  },
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start? Hey guys, I want to build my first app on Subsocial. How should I start? Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'left',
  },
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'left',
  },
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'left',
  },
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'right',
  },
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'left',
  },
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'left',
  },
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'right',
  },
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'left',
  },
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'left',
  },
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'right',
  },
  {
    text: 'Hey guys, I want to build my first app on Subsocial. How should I start?',
    alignment: 'left',
  },
]

export default function ChatPage() {
  const router = useRouter()
  const { topic } = router.query as { topic: string }
  const postId = getTopicId(topic as any)

  return (
    <>
      <ChatNavbarExtension image={Bitcoin} messageCount={96} topic={topic} />
      <ChatRoom
        postId={postId}
        chats={dummyChats as any}
        asContainer
        className='flex-1 overflow-hidden pt-2'
        scrollableContainerClassName='pt-2'
      />
    </>
  )
}
