import { useState } from 'react'

type UserType = {
  username: string,
  password: string,
}
const Register = () => {
  const [user, setUser] = useState<UserType>({
    username:"",
    password:""
  })
  const [fetchedUser, setFetchedUser] = useState<UserType>({
    username: "",
    password: ""
  })
  const updateUser = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!username && username.trimStart().trimEnd().length === 0 || !password && password.trimStart().trimEnd().length === 0) {
      alert("You must type something")
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      const result = await response.json()
      if (!result) throw new Error("No response back from the server")
      if (result.success) {
        const { userName, passWord } = result.data;
        setFetchedUser({...fetchedUser, username: userName, password: passWord })
      } else if (!result.success) {
        alert(result.message)
        return;
      } 
    } catch (error) {
      console.log(error)
    } finally {
      setUser({username:"",password:""})
    }
  }

  const { username, password } = user;
  return<>
  <div className="flex flex-col justify-center items-center min-h-screen">
  <form onSubmit={updateUser}>
    <input type="text" value={username} onChange={(e)=>setUser({...user,username:e.target.value})} placeholder="Username"/>
    <input type="text" value={password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="Password"/>
    <button type="submit">Register</button>
  </form>

  <div className="px-5 py-2 bg-slate-300 flex flex-col justify-center items-center gap-6">
    <span>What you have registered as the username goes like</span>
    <span>Username : {fetchedUser.username} </span>
  </div>
  </div>
  </>
}

export default Register