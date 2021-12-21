import { Container } from "@mui/material";
// import { DoActionButton } from "../styleHook"

export default function HomePage({
  description,
  sn,
  image,
  incId,
  decId,
  id,
  getNFT,
  allData,
  setNewID,
  totalNFT,
  ...props
}) {
  // const onChange = (e) => {
  //   console.log("getNFT")
  //   setNewID(e.target.value)
  //   getNFT(e.target.value)
  // }
  return (
    <Container>
      <div className="page-title">
        <h1>Assets to NFTs</h1>
        <p>Total: {totalNFT}</p>
      </div>
      <div className="main-box">
        {allData.length !== 0 && allData.map((item, key) => (
          <div className="nft-card" key={key}>
            <div className="box">
              <div className="card-detail">
                {/* eslint-disable-next-line */}
                <img
                  src={item.image === "" ? "/default.png" : item.image}
                  alt=""
                />
                <div className="description">
                  <p>Serial Number:</p>
                  <h5>{item.sn}</h5>
                  <p>Title:</p>
                  <h4>{item.title}</h4>
                  <p>Description:</p>
                  <h4>{item.description}</h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}
{/* <div className="action-group">
  <p>Enter the token Id.</p>
  <div className="actions">
    <DoActionButton onClick={decId}>
      Prev
    </DoActionButton>
    <input
      type="number"
      value={id}
      onChange={(e) => onChange(e)}
      min={1}
      max={totalNFT}
    />
    <DoActionButton onClick={incId}>
      Next
    </DoActionButton>
  </div>
</div> */}