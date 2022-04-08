import React from 'react';
import {useDispatch} from "react-redux";
import {deleteAvatar, uploadAvatar} from "../actions/user";
import './profile.css'

function Profile() {
    const dispatch = useDispatch()

    function changeHandler(e) {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    return (
        <div>
            <button className='profile__delete' onClick={() => dispatch(deleteAvatar())}>Delete avatar</button>
            <input className='profile__download' accept="image/*" onChange={e => changeHandler(e)} type="file" placeholder="Download avatar"/>
        </div>
    );
}

export default Profile