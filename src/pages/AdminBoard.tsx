import { useState } from "react"

type DataType = {
  title: string,
  content: string
}

const AdminBoard = () => {
  const [data, setData] = useState<DataType>({
    title: "", content: ""
  })

  const postNotice = async (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:8080/auth/notice-register",
        { method : "POST",  
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify(data)
        }
      )
      const result = await response.json()

      if(!result.success){
        alert(result.message)
        return
      }

      if (result.success) {
       alert(result.message)
       setData({title:"", content:""})
      }

    } catch(e) 
    {
      console.log(e)
    }
  }
  const { title, content } = data;
  
  return<>
  <form onSubmit={postNotice} className="flex flex-col mx-auto justify-center items-center gap-4 w-full min-h-screen">
    <input type="text" value={title} onChange ={(e)=>setData({ ...data, title: e.target.value})} placeholder="Title" />
    <textarea value={content} onChange={(e) => setData({ ...data, content: e.target.value })} placeholder="Content"/>
    <button type="submit" className="border-2 border-blue-800 bg-blue px-3 py-1 rounded-full hover:scale-105">Write</button>
  </form>
  
  </>
}

export default AdminBoard
