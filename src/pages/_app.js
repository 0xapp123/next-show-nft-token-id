import { useEffect, useState } from 'react'
import '../styles/style.scss'
import Web3 from 'web3'
import { ToastContainer } from 'react-toastify'
import Loading from '../components/Loading'
import { INFURA_KEY, SMARTCONTRACT_ABI, SMARTCONTRACT_ADDRESS } from '../../config'

let web3 = undefined
let contract = undefined

function MyApp({ Component, pageProps }) {
  const [pageLoading, setPageLoading] = useState(false)

  const [id, setID] = useState(1)
  const [description, setDesciption] = useState("")
  const [sn, setSN] = useState("")
  const [image, setImage] = useState("")
  const [totalNFT, setTotalNFT] = useState(0)
  const [title, setTitle] = useState("")

  const incId = () => {
    if (id < totalNFT) {
      setID(parseInt(id) + 1)
      getNFT(parseInt(id) + 1)
    }
  }

  const decId = () => {
    if (id > 1) {
      setID(parseInt(id) - 1)
      getNFT(parseInt(id) - 1)
    }
  }

  const checkContract = async () => {
    await getNFT(id)
  }

  const getNFT = async (id) => {
    // setPageLoading(true)
    const provider = new Web3.providers.HttpProvider(INFURA_KEY);
    web3 = new Web3(provider)
    contract = new web3.eth.Contract(
      SMARTCONTRACT_ABI,
      SMARTCONTRACT_ADDRESS,
    )
    const uri = await contract.methods.tokenURI(id).call()
    const total = await contract.methods.totalSupply().call()
    setTotalNFT(total.toString())
    await fetch(uri)
      .then(resp =>
        resp.json()
      ).then((json) => {
        setTitle(json.title)
        setDesciption(json.description)
        setSN(json.sn)
        setImage(json.image)
      })
    // setPageLoading(false)
  }

  useEffect(() => {
    checkContract()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Component {...pageProps}
        incId={incId}
        decId={decId}
        getNFT={getNFT}
        setNewID={(e) => setID(e)}
        id={id}
        title={title}
        description={description}
        sn={sn}
        totalNFT={totalNFT}
        image={image}
      />
      <ToastContainer style={{ fontSize: 14, padding: '5px !important', lineHeight: '15px' }} />
      <Loading loading={pageLoading} />
    </>
  )
}

export default MyApp
