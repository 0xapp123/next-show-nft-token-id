import { Container } from "@mui/material";
import { DoActionButton } from "../styleHook"
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'

export default function HomePage({
  description,
  sn,
  incId,
  decId,
  id,
  getNFT,
  setNewID,
  ...props
}) {

  const onChange = (e) => {
    setNewID(e.target.value)
  }

  return (
    <Container>
      <div className="nft-card">
        <div className="card-detail">
          {/* eslint-disable-next-line */}
          <img
            src="/default.png"
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
          <DoActionButton onClick={decId}>
            <KeyboardArrowLeftRoundedIcon />
          </DoActionButton>
          <input
            type="number"
            value={id}
            onChange={(e) => onChange(e)}
            min={1}
          />
          <DoActionButton onClick={incId}>
            <ChevronRightRoundedIcon />
          </DoActionButton>
        </div>
      </div>
    </Container>
  )
}