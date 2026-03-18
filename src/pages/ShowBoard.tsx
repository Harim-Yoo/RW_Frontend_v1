import { useEffect, useCallback, useState } from 'react'

const NoticeItem = (props: {
  idx: number,
  title: string,
  content: string,
  ins_date: string,
  comments: any[],
  refresh: () => void,
}) => {
  const [comment, setComment] = useState<string|null>(null)
  const { idx, title, content, ins_date, comments, refresh } = props;
  const commentData = async (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{
    const response = await fetch('http://localhost:8080/auth/notice-comment', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idx: idx,
        comment: comment
      })
    })
    const result = await response.json()
    if(result.success) {
      refresh()
      alert("Success!")
      setComment("")
    }
    } catch(e) {
      console.log(e)
    }
  }
  return<>
  <div className="flex flex-col">
    <span>{title}</span>
    <span>{content}</span>
    <span>{ins_date}</span>
    {comments && comments.map((cmt) => (
          <div key={cmt.idx} className="bg-slate-50 p-2 rounded text-sm">
            <span className="font-semibold">{cmt.writer_id}: </span>
            <span>{cmt.content}</span>
          </div>
        ))}
    <form onSubmit={commentData}>
      <input type="text" value={comment || ""} onChange={(e)=>setComment(e.target.value)} placeholder="Comment"/>
      <button type="submit">Submit</button>
    </form>
  </div>
  </>
}

const ShowBoard = () => {
  const [data, setData] = useState<any[]>([])
  const fetchData = useCallback(async () => {
    try{
    const response = await fetch('http://localhost:8080/auth/fetchdata', {
      method: "GET",
      headers: {
        'Content-Type': "application/json"
      }
    })
    const result = await response.json();
    setData(result.data)
    } catch(e) {
      console.log(e) 
    }
  }, [])
  
  useEffect(()=>{
    (async ()=>{fetchData()})()
  },[fetchData])

  return<>
  <div className='flex flex-col gap-1 bg-slate-100'>
    {data.map((item)=><NoticeItem 
    key={item.idx}
    idx={item.idx}
    title={item.title}
    content={item.content}
    ins_date={item.ins_date}
    comments={item.THNK_NOTICE_COMMENT}
    refresh = {fetchData}
    />)}
  </div>
  </>
}

export default ShowBoard;