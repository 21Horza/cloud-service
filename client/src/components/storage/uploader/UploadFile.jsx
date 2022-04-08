import React from 'react'
import { useDispatch } from 'react-redux'
import './uploader.css'
import {removeUploadFile} from '../../../reducers/uploadReducer'

function UploadFile({file}) {
  const dispatch = useDispatch()

  return (
    <div className="upload-file">
        <div className="upload-file__header">
            <div className="upload-file__name">{file.name}</div>
            <div className="upload-file__remove" onClick={() => dispatch(removeUploadFile(file.id))}>X</div>
        </div>
        <div className="upload-file__progress-bar">
            <div className="upload-file__upload-var" style={{width: file.progress + "%"}}></div>
            <div className="upload-file__percent">{file.progress}%</div>
        </div>
    </div>
  )
}

export default UploadFile