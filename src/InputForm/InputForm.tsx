import {useState, useEffect, useCallback} from "react";
import './InputForm.css';

const storageFormKey = 'inpVal'

interface InputProps {
    defaultVal?: string
}

export const InputForm = (props?: InputProps) => {
    const [dispErrorMsg, setDispErrorMsg] = useState<boolean>(false)
    const [errMsg, setErrMsg] = useState<string>('')
    const [inputVal, setInputVal] = useState<string>('')

    //Load value form storage
    const loadValue = useCallback(() => {
        const lcStorageData = localStorage.getItem(storageFormKey)
        if (!!lcStorageData) {
            setInputVal(lcStorageData)
        } else if (!!props?.defaultVal) {
            setInputVal(props?.defaultVal)
        }
    }, [props])

    useEffect(() => {
        const delay = setTimeout(() => {
            console.log("time")
        }, 3000)
        return () => clearTimeout(delay)
    }, [dispErrorMsg])

    //Handler for input value
    const inputHandler = (event: any) => {
        const msgLength = event.target.value.length;
        setInputVal(event.target.value)

        if (msgLength > 20) {
            setDispErrorMsg(true)
            setErrMsg('Za długa nazwa (Podaj: 3-20 znaków)')
        } else if (msgLength < 3) {
            setDispErrorMsg(true)
            setErrMsg('Za krótka nazwa (Podaj: 3-20 znaków)')

        } else {
            setDispErrorMsg(false)
            setErrMsg('')
        }


    }
    //Submit button
    const onClickSubmitButton = useCallback(() => {
        console.log('click')
        if (!dispErrorMsg && inputVal.length <= 20 && inputVal.length >= 3) {
            localStorage.setItem(storageFormKey, inputVal)
        }
    }, [inputVal, dispErrorMsg])

    //Load button
    const onClickLoadButton = useCallback(() => {
        console.log('clickLoad')
        loadValue()
        setDispErrorMsg(false)
        setErrMsg('')
    }, [loadValue])


    //Load value if is in storage
    useEffect(() => {
        loadValue()
    }, [loadValue])

    return <div className='InputForm' style={{display: "flex", flexDirection: 'column'}}>
        <div>Wprowadź nazwę użytkownika:</div>
        {dispErrorMsg && <div style={{color: 'red'}}>{errMsg}</div>}
        <input className="Input-text-form" type="text" onChange={inputHandler} value={inputVal} onInput={inputHandler}/>

        <div style={{display: "flex", flexDirection: "row", marginLeft: 'auto', marginRight: 'auto'}}>
            <button className="Submit-button" onClick={onClickSubmitButton}
                    disabled={dispErrorMsg || inputVal.length === 0}>Zapisz
            </button>
            <button className="Submit-button" onClick={onClickLoadButton}>Wczytaj</button>
        </div>
    </div>
}