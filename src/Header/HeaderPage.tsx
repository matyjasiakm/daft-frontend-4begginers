import './headerpage.css'
import {Routes, Route, Link} from "react-router-dom";
import {ContactPage} from "../Contact";
import {MyOwnPage} from "../MyOwnPage";
import {useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';


export const HeaderPage = () => {

    const [navVisible, setNavVisible] = useState<boolean>(true)
    const handleDisplayMobileNavigation = () => {
        setNavVisible(!navVisible)
    }
    return <div>
        <div >

        </div>
        <div className='Nav'>
            <div style={{marginRight: "20px"}}><Link to={'/'}>TOxJESTxLOGO</Link>
            </div>
            <MenuIcon className='Nav-mobile' id="MenuIcon"  onClick={handleDisplayMobileNavigation} />
            {navVisible && <div className="App-link">

                <Link className='App-link' to={'/'}>Home</Link>
                <Link className='App-link' to={`/about`}>About</Link>
                <Link className='App-link' to={'/contact'}>Contact</Link>
                <Link className='App-link' to={'/memes'}>Memes</Link>
            </div>
            }
        </div>
        <Routes>
            <Route path='/' element={<div className="Content">Witaj na mojej stronie</div>}/>
            <Route path='*' element={<div className="Content">404</div>}/>
            <Route path={'/about'}
                   element={<div className="Content">
                       <a className="App-link"
                          href="https://github.com/matyjasiakm/daft-frontend-4begginers">!!GITHUB!!</a></div>}/>
            <Route path='/memes' element={<MyOwnPage/>}/>
            <Route path='/contact' element={<ContactPage/>}/>
        </Routes>
    </div>
}