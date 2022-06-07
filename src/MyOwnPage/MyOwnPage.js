import {useEffect, useState} from "react";
import Airtable from "airtable";
import {MemePage} from "../MemePage";
import './ownpage.css'


const dataBase = new Airtable({apiKey: process.env.REACT_APP_API_KEY}).base(process.env.REACT_APP_BASE_ID)

export const MyOwnPage = () => {
    const [memes, setMemes] = useState([])
    const [inputVal, setInputVal] = useState('')
    const [inputValUrl, setInputValUrl] = useState('')

    useEffect(() => {
        dataBase("Memes")
            .select({view: "Grid view"})
            .eachPage((records, fetchNextPage) => {
                setMemes(records)
                setInputVal("")
                setInputValUrl("")
                fetchNextPage()
            })
    }, [])

    const onClickSubmitButton = () => {
        if (inputVal.length === 0 || inputValUrl.length === 0)
            return
        dataBase("Memes").create([{
            "fields": {
                "title": inputVal,
                "urlImg": [{
                    "url": inputValUrl
                }]
            }
        }], function (err, _) {
            if (err) {
                console.error(err);
                return;
            }
            window.location.reload()
        })
    }


    return <div className='OwnPage'>
        <div>Wprowadź tytuł:</div>
        <input className="Input-text-form" type="text" value={inputVal} onInput={e => setInputVal(e.target.value)}/>
        <div>Wprowadź POPRAWNY url zdjęcia:</div>
        <input className="Input-text-form" type="text" value={inputValUrl}
               onInput={e => setInputValUrl(e.target.value)}/>

        <div style={{display: "flex", flexDirection: "row", marginLeft: 'auto', marginRight: 'auto'}}>
            <button className="Submit-button" onClick={onClickSubmitButton}>Zapisz
            </button>
        </div>
        <div><h1>Main memes</h1></div>
        {
            memes.map(meme => (
                <MemePage title={meme.get('title')}
                          urlImg={meme.get('urlImg')}
                          key={meme.id}/>
            ))
        }
        <img src={require('./assets/214286.gif')} alt="loading..."/>
    </div>
}