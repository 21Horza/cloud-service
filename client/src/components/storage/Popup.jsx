import React, {useState} from 'react'
import Input from "../../utils/input/Input"
import { useDispatch, useSelector } from 'react-redux'
import { setPopup } from '../../reducers/fileReducer'
import { createDir } from '../../actions/file'
import './popup.css'

function Popup() {
    const [dirName, setDirName] = useState('')
    const popupDisplay = useSelector(state => state.files.popupDisplay)
    const currentDir = useSelector(state => state.files.currentDir)
    const dispatch = useDispatch()

    function createHandler() {
        dispatch(createDir(currentDir, dirName))
    }
    

    return (
        <div className='popup' onClick={() => dispatch(setPopup('none'))} style={{display: popupDisplay}}>
            <div className="popup__content" onClick={(e => e.stopPropagation())}>
                <div className="popup__header">
                    <div className="popup__title">Create a new folder</div>
                    <button className="popup__close" onClick={() => dispatch(setPopup('none'))}>X</button>
                </div>
                <Input type="text" placeholder="Enter a new name" value={dirName} setValue={setDirName}/>
                <button className="popup__create" onClick={() => createHandler()}>Create</button>
            </div>
        </div>
    )
}

export default Popup