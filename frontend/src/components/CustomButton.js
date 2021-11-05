import './CustomButton.scss';

const CustomButton = ({accept = true, title, onClick = () => {}}) => {
    return (
            <div className={accept ? `custom-box-accept` : `custom-box-reject`} onClick={onClick}>{title}</div>
    )
}

export default CustomButton;