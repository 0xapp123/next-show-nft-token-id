import { useEffect, useState } from 'react'
import '../styles/style.scss'
import Web3Modal from "web3modal"
import Web3 from 'web3'
import { ToastContainer } from 'react-toastify'
import Loading from '../components/Loading'
import Header from '../components/Header'
import { SMARTCONTRACT_ABI, SMARTCONTRACT_ADDRESS } from '../../config'
import { ethers } from 'ethers'

let provider = undefined
let web3 = undefined
let web3Modal = undefined
let contract = undefined
let signer = undefined

function MyApp({ Component, pageProps }) {
  const [pageLoading, setPageLoading] = useState(false)
  const [connected, setConnected] = useState(false)
  const [signerAddress, setSignerAddress] = useState("")

  const [id, setID] = useState(1)
  const [description, setDesciption] = useState("")
  const [sn, setSN] = useState("")
  const [image, setImage] = useState("")
  const [totalNFT, setTotalNFT] = useState(0)

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

  const connectWallet = async () => {
    const providerOptions = {
      /* See Provider Options Section */
    }
    web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions // required
    })
    provider = await web3Modal.connect()
    checkContract()
    provider.on("accountsChanged", (accounts) => {
      console.log(accounts)
      if (accounts.length === 0) {
        setConnected(false)
      } else {
        setConnected(true)
        setSignerAddress(accounts[0])
      }
    });
  }
  const checkContract = async () => {
    web3 = new Web3(provider)
    provider = new ethers.providers.Web3Provider(provider);
    signer = provider.getSigner();
    contract = new ethers.Contract(
      SMARTCONTRACT_ADDRESS,
      SMARTCONTRACT_ABI,
      signer
    );
    getNFT(id)
  }

  const getNFT = async (id) => {
    setPageLoading(true)
    const uri = await contract.tokenURI(id)
    const total = await contract.totalSupply()
    setTotalNFT(total.toString())
    await fetch(uri)
      .then(resp =>
        resp.json()
      ).then((json) => {
        setDesciption(json.description)
        setSN(json.sn)
        setImage(json.image)
      })
    setPageLoading(false)
  }

  useEffect(() => {
    ethereum.on('accountsChanged', function (accounts) {
      if (accounts.length !== 0) {
        setSignerAddress(accounts[0])
        setConnected(true)
      } else {
        setConnected(false)
      }
    });
    if (ethereum.selectedAddress !== null) {
      setConnected(true)
      setSignerAddress(ethereum.selectedAddress)
    }
    connectWallet()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Header
        signerAddress={signerAddress}
        connectWallet={connectWallet}
        connected={connected}
      />
      <Component {...pageProps}
        incId={incId}
        decId={decId}
        getNFT={getNFT}
        setNewID={(e) => setID(e)}
        id={id}
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
