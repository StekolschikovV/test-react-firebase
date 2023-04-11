import { getDownloadURL, listAll, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import {
  useNavigate
} from "react-router-dom";
import { storage } from "./firebase";

const Home = () => {

  const [percent, setPercent] = useState(0);
  const [refreshImgs, setRefreshImgs] = useState(0);
  const [imgs, setImgs] = useState<string[]>([])
  let navigate = useNavigate();

  const listRef = ref(storage, 'files');

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

            setRefreshImgs(refreshImgs + 1)
          });
        }
      );
    }
  }

  useEffect(() => {

    listAll(listRef)
      .then(async (res) => {
        const urls = await Promise.all(res.items.map(img => getDownloadURL(img)))
        setImgs(urls)
      }).catch((error) => {
        console.log('error', error);
      });
  }, [refreshImgs])

  return <>
    Home

    <input type="file" accept="image/*" onChange={handleChange} />
    <p>{percent} "% done"</p>
    <div style={{ padding: "20px" }}>
      {imgs.map(img => <img key={img} src={img} style={{ width: "250px", display: "block" }} />)}

    </div>
  </>

}

export default Home