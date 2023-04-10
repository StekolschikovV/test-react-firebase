import { useState, useEffect, ChangeEvent } from "react"
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const Home = () => {

  const [percent, setPercent] = useState(0);
  const [file, setFile] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    if (!authToken) {
      navigate('/login')
    }
  }, [])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('event', event);
    if (event.target.files && event.target.files?.length > 0) {
      const file = event.target.files[0]
      const storageRef = ref(storage, `/files/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file);
      console.log(uploadTask)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
          });
        }
      );
    }
  }

  return <>
    Home

    <input type="file" accept="image/*" onChange={handleChange} />
    <p>{percent} "% done"</p>
  </>

}

export default Home