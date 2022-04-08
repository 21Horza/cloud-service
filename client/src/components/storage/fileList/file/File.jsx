import React from 'react';
import './file.css'
import dirLogo from '../../../../assets/img/dir.svg'
import fileLogo from '../../../../assets/img/file.svg'
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setDir } from '../../../../reducers/fileReducer';
import {deleteFile, downloadFiles} from "../../../../actions/file"

const File = (files) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const fileView = useSelector(state => state.files.view)
    
    const file = files.file
    
    function openHandler(file) {
        if(file.type ==='dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setDir(files.file._id))
        }
    }

    function downloadHandler(e) {
        e.stopPropagation()
        downloadFiles(file)
    }

    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    function sizeFormat(size) {
        if(size > 1024*1024*1024) {
            return (size/(1024*1024*1024)).toFixed(1)+"Gb"
        }
        if(size > 1024*1024) {
            return (size/(1024*1024)).toFixed(1)+"Mb"
        }
        if(size > 1024) {
            return (size/(1024)).toFixed(1)+"Kb"
        }
        return size+"B"
    }

    if(fileView === 'list') {
        return (
            <div className='file' onClick={() => openHandler(file)}>
                <img src={files.file.type === 'dir' ? dirLogo : fileLogo} alt="" className='file__img'/>
                <div className="file__name">{files.file.name}</div>
                <div className="file__date">{files.file.date.slice(0, 10)}</div>
                <div className="file__size">{sizeFormat(files.file.size)}</div>
                {file.type !== 'dir' && <button onClick={(e) => downloadHandler(e)} className="file__btn file__download">download</button>}
                <button onClick={(e) => deleteClickHandler(e)} className="file__btn file__delete">delete</button>
            </div>
        );
    }

    if (fileView === 'plate') {
        return (
            <div className='file-plate' onClick={() => openHandler(file)}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file-plate__img"/>
                <div className="file-plate__name">{file.name}</div>
                <div className="file-plate__btns">
                    {file.type !== 'dir' &&
                    <button onClick={(e) => downloadHandler(e)} className="file-plate__btn file-plate__download">download</button>}
                    <button onClick={(e) => deleteClickHandler(e)} className="file-plate__btn file-plate__delete">delete</button>
                </div>
            </div>
        );
    }

};

export default File;