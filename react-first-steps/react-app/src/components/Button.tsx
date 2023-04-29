import BtnType from './BtnType'

interface Props {
    children: string
    type: BtnType
    onClick: () => void
}

function Button({ children, type, onClick }: Props) {
    return (
        <button type="button" className={'btn btn-' + type} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
