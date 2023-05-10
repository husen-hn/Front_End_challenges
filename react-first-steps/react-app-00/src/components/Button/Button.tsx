import BtnType from './BtnType'
import styles from './Button.module.css'

interface Props {
    children: string
    type: BtnType
    onClick: () => void
}

function Button({ children, type, onClick }: Props) {
    return (
        <button
            type="button"
            className={[styles.btn, styles['btn-' + type]].join(' ')}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
