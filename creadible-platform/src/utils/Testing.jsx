import { useContext } from "react"
import { UserContext } from "./userContext"
const Testing = () => {

    const { user } = useContext(UserContext);

  return (
      <div>Testing { user.address}</div>
  )
}

export default Testing