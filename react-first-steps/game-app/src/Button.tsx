import BtnType from './BtnType'

interface Props {
    text: string
    type: BtnType
    onClickBtn: () => void
}

function Button({ text, type, onClickBtn }: Props) {
    return (
        <button
            type="button"
            className={'btn btn-' + type}
            onClick={() => onClickBtn()}
        >
            {text}
        </button>
    )
}

export default Button
