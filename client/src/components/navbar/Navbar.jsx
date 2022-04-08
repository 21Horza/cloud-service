import React, {useState} from 'react'
import './navbar.css'
import logo from '../../assets/img/logo.svg'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../reducers/userReducer'
import {getFiles, searchFiles} from "../../actions/file";
import {showLoader} from "../../reducers/appReducer";
import avatarLogo from '../../assets/img/avatar.svg'
import { API_URL } from '../../config'

function Navbar() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const currentUser = useSelector(state => state.user.currentUser)
  const [searchName, setSearchName] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(false)
  const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo

    function searchChangeHandler(e) {
        setSearchName(e.target.value)
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if(e.target.value !=='') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value));
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }

  return (
    <div className='navbar'>
        <div className="container">
            <img src={logo} alt='' className='navbar__logo'/>
            <div className='navbar__header'>Cloud Storage</div>
            {isAuth && <input
                    value={searchName}
                    onChange={e => searchChangeHandler(e)}
                    className='navbar__search'
                    type="text"
                    placeholder="File name..."/>}
            {!isAuth && <div className='navbar__login'><NavLink className='link link__login' to="/login">Login</NavLink></div> }
            {!isAuth && <div className='navbar__registration'><NavLink className='link link__registration' to="/registration">Sign Up</NavLink></div> }
            {isAuth && <div className='navbar__login link__exit' onClick={() => dispatch(logout())}>Exit</div> }
            {isAuth && <NavLink to='/profile'>
                <img className='avatar' src={avatar} alt=''/>
            </NavLink>}
        </div>
    </div>
  )
}

export default Navbar