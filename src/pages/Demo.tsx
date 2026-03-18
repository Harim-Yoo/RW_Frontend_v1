import { useState } from 'react';

type DataType = {
  id: number|null,
  problem: string|null,
  choices: string[]|null,
  solution: string|null,
}

const Demo = () => {
  const [data, setData] = useState<DataType[]|null>(null)

  const GetData = async () => {
      const response = await fetch("http://localhost:8080/fetch")
      const result = await response.json()
      if (result.success) {
        setData(result.data)
      }
  }

  return<>
  <div className="flex flex-col justify-center items-center min-h-screen">
  <button onClick={GetData}>Algebra1</button>
  {data && data.map((item, index)=>(
    <div 
      key={index}
      className="flex flex-col justify-center items-center"
    >
      <span>{item.id}: {item.problem}</span>
      <ul>
      {item.choices?.map((subitem,subindex)=><li key={subindex}>{subitem}</li>)}
      </ul>
    </div>
  ))}
  </div>
  </>
}

export default Demo;
