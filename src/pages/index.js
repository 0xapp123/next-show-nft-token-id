import Head from 'next/head'
import HomePage from '../components/HomePage/HomePage'

export default function Home({
  description,
  sn,
  incId,
  decId,
  id,
  getNFT,
  setNewID,
  totalNFT,
  image,
  ...props
}) {
  return (
    <>
      <Head>
        <title>Show NFTs</title>
        <meta name="description" content="Show NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage
        description={description}
        sn={sn}
        incId={incId}
        decId={decId}
        id={id}
        image={image}
        totalNFT={totalNFT}
        getNFT={getNFT}
        setNewID={setNewID}
        description={description}
      />
    </>
  )
}
