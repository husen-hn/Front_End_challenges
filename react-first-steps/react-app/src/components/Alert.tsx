import { ReactNode } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

interface Props {
    children: ReactNode
    onClose: () => void
}

function Alert({ children, onClose }: Props) {
    return (
        <div
            className="alert alert-warning alert-dismissible false show"
            role="alert"
        >
            {children}
            <button
                type="button"
                className="btn-close"
                onClick={onClose}
            ></button>
        </div>
    )
}

export default Alert
