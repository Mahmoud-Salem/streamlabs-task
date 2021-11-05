const Loading = ({height = '100%'}) => {

    return (
        <div style={{width: '100%', height, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <img alt="Loading" style={{height: '17vh'}} src="https://img.pikbest.com/58pic/35/39/61/62K58PICb88i68HEwVnm5_PIC2018.gif!w340" />
        </div>
    )
}

export default Loading;