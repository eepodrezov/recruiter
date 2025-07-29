import type { PropsWithChildren } from "react"
import { PRIMARY_BUTTON_STYLES } from "./styles"

export interface ButtonProps {
    onClick: () => void
}

export const Button = ({
    children,
    onClick
}:PropsWithChildren<ButtonProps>) => {
    return (
        <button className={PRIMARY_BUTTON_STYLES} onClick={onClick}>
          {children}
        </button>
    )
}