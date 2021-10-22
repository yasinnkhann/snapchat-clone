import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import NoteIcon from '@material-ui/icons/Note';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import { selectUser } from '../features/appSlice.js';
import {
  resetCameraImage,
  selectCameraImage,
} from '../features/cameraSlice.js';
import { db, storage } from '../firebaseConfig.js';
import '../styles/Preview.css';

function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!cameraImage) {
      history.replace('/');
    }
  }, [cameraImage, history]);

  const closePreview = () => {
    dispatch(resetCameraImage());
    history.replace('/');
  };

  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImage, 'data_url');

    uploadTask.on(
      'state_changed',
      null,
      error => {
        //ERROR function
        console.log(error);
      },
      () => {
        //COMPLETE function
        storage
          .ref('posts')
          .child(id)
          .getDownloadURL()
          .then(url => {
            db.collection('posts').add({
              imageUrl: url,
              username: user.username,
              read: false,
              profilePic: user.profilePic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace('/chats');
          });
      }
    );
  };

  return (
    <div className='preview'>
      <CloseIcon onClick={closePreview} className='preview__close' />
      <div className='preview__toolbarRight'>
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt='' />
      <div onClick={sendPost} className='preview__footer'>
        <h2>Send Now</h2>
        <SendIcon fontSize='small' className='preview__sendIcon' />
      </div>
    </div>
  );
}

export default Preview;
