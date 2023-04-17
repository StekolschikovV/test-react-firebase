import { addDoc, collection } from "@firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
const Records = () => {

  const [record, setRecord] = useState<string | null>(null)

  return <div style={{ width: "100%" }}>
    <input placeholder="New record" onChange={e => setRecord(e?.target?.value)} />
    <button onClick={async () => {
      await addDoc(collection(db, "messages"), {
        text: 123,

      });
    }}>1Add</button>
  </div>

}

export default Records