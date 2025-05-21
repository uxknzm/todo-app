import { memo, type FC } from "react"
import type { ButtonProps } from "./types"

import "./style.css"

const Button: FC<ButtonProps> = ({ children, ...props }) => {

    return (
        <button className="app-button" {...props}>
            {children}
        </button>
    )
}

export default memo(Button)