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
  const [id, setID] = useState(30)

  const incId = () => {
    setID(parseInt(id) + 1)
  }

  const decId = () => {
    if (id > 0) {
      setID(parseInt(id) - 1)
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

  const checkContract = async () => {
    setPageLoading(true)
    web3 = new Web3(provider)
    provider = new ethers.providers.Web3Provider(provider);
    signer = provider.getSigner();
    contract = new ethers.Contract(
      SMARTCONTRACT_ADDRESS,
      SMARTCONTRACT_ABI,
      signer
    );
    console.log(contract)
    // getNFT()
    setPageLoading(false)
  }

  const getNFT = async () => {
    const uri = await contract.tokenURI("2")
    console.log(uri)
  }
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
      />
      <ToastContainer style={{ fontSize: 14, padding: '5px !important', lineHeight: '15px' }} />
      <Loading loading={pageLoading} />
    </>
  )
}

export default MyApp
