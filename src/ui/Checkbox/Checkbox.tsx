import { memo, type FC } from "react"
import type { CheckboxProps } from "./types"

import "./style.css"

const Checkbox: FC<CheckboxProps> = ({ checked = false, onChange, ...props }) => {

    return (
        <label className="app-checkbox">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                {...props}
            />
            <span className="checkmark" />
        </label>
    )
}

export default memo(Checkbox)