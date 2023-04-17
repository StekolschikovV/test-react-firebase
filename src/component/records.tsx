import { addDoc, collection, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
const Records = () => {

  const [record, setRecord] = useState<string | null>(null)
  const [records, setRecords] = useState<{ text: string }[]>([])
  const [update, setUpdate] = useState(0)

  useEffect(() => {
    (async () => {
      let response = await getDocs(collection(db, "messages"))
      let result: { text: string }[] = []
      response.forEach(element => {
        result.push(element.data() as { text: string })
      })
      setRecords(result)
    })()
  }, [record])

  return <div style={{ width: "100%" }}>
    <ul>
      {records.map((r, i) => <div key={i}>{r.text}</div>)}
    </ul>
    <input placeholder="New record" value={record || ""} onChange={e => setRecord(e?.target?.value)} />
    <button onClick={async () => {
      if (record)
        await addDoc(collection(db, "messages"), {
          text: record
        })
      setRecord(null)
      setUpdate(update + 1)
    }}>Add</button>
  </div>

}

export default Records