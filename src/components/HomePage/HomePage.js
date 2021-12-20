import { Container } from "@mui/material";
import { DoActionButton } from "../styleHook"

export default function HomePage({
  description,
  sn,
  image,
  incId,
  decId,
  id,
  getNFT,
  setNewID,
  totalNFT,
  ...props
}) {

  const onChange = (e) => {
    console.log("getNFT")
    setNewID(e.target.value)
    getNFT(e.target.value)
  }
  return (
    <Container>
      <div className="nft-card">
        <div className="box">
          <div className="card-detail">
            {/* eslint-disable-next-line */}
            <img
              src={image === "" ? "/default.png" : image}
              alt=""
            />
            <div className="description">
              <p>Description:</p>
              <h4>{description}</h4>
              <p>Serial Number:</p>
              <h5>{sn}</h5>
            </div>
          </div>
          <div className="action-group">
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
          </div>
        </div>
      </div>
    </Container>
  )
}