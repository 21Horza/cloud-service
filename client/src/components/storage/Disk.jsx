import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../actions/file";
import FileList from "./fileList/FileList";
import Popup from './Popup';
import './disk.css'
import { setPopup, setDir, setFileView} from '../../reducers/fileReducer';
import Uploader from './uploader/Uploader';

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('type')

    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }) // [currentDir, sort]

    function showPopupHandler() {
        dispatch(setPopup('flex'))
    }

    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(setDir(backDirId))
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    function dragEnterHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    function dragLeaveHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    return ( !dragEnter ?
        <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className="disk__btns">
                <button className="disk__back" onClick={() => backClickHandler()}>Back</button>
                <button className="disk__create" onClick={() => showPopupHandler()}>Create folder</button>
                <div className="disk__upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label">Upload a file</label>
                    <input multiple={true} onChange={(event)=> fileUploadHandler(event)} type="file" id="disk__upload-input" className="disk__upload-input"/>
                </div>
                <select value={sort}
                        onChange={(e) => setSort(e.target.value)} 
                        className='disk__select'>
                    <option value="name">Name</option>
                    <option value="type">Type</option>
                    <option value="date">Date</option>
                </select>
                <button className="disk__plate" onClick={() => dispatch(setFileView('plate'))}></button>
                <button className="disk__list" onClick={() => dispatch(setFileView('list'))}></button>
            </div>
            <FileList />
            <Popup />
            <Uploader />
        </div>
        :
        <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            Drag files over here
        </div>
    );
};

export default Disk;