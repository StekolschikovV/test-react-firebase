import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, storage } from "../firebase";

const Setting = () => {

  const [name, setName] = useState("")
  const [file, setFile] = useState<FileList | null>()

  let navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    if (!authToken) {
      navigate('/login')
    }
  }, [])

  const uploadAvate = (): Promise<null | string> => {
    return new Promise<string>((resolve, reject) => {
      console.log('file', file);
      if (file && file?.length > 0) {
        const _file = file[0]
        const fileExtension = _file?.name.split(".").slice(-1)
        const storageRef = ref(storage, `/avatars/${auth.currentUser?.email}.${fileExtension}`)
        const uploadTask = uploadBytesResumable(storageRef, _file);
        uploadTask.on(
          "state_changed",
          (snapshot) => { },
          (err) => reject(null),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              resolve(url);
            }).finally(() => reject())
          }
        );
      } else {
        console.log('1');
        reject(null)
      }
    });
  }


  const update = async () => {
    const avatarUrl = await uploadAvate().then(e => e).catch(() => null)
    const currentUser = auth?.currentUser
    if (currentUser) {
      console.log({
        displayName: name || currentUser.displayName,
        photoURL: avatarUrl || currentUser.photoURL,
      });
      updateProfile(currentUser, {
        displayName: name || currentUser.displayName,
        photoURL: avatarUrl || currentUser.photoURL,
      }).then(() => {
        console.log("Updated")
      })
    }

  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('event', event);
    setFile(event.target.files)
  }

  return <>
    <input type="file" accept="image/*" onChange={handleChange} />
    <input type="text" onChange={(e) => setName(e.target.value)} />
    <button onClick={() => update()}>Update</button>
  </>

}

export default Setting