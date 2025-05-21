import { memo, type FC } from "react"

import "./style.css"
import type { InputProps } from "./types"

const Input: FC<InputProps> = ({ ...props }) => {

    return (
        <input className="app-input" {...props} />
    )
}

export default memo(Input)