import Head from 'next/head'
import HomePage from '../components/HomePage/HomePage'

export default function Home() {
  return (
    <>
      <Head>
        <title>Show NFTs</title>
        <meta name="description" content="Show NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  )
}
