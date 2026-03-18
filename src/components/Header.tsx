import { IceCream } from "lucide-react"
import { redirect } from "react-router";

const MenuItems = [
  {
    name: "Home",
    url: "/"
  },
  {
    name: "About",
    url: "/about"
  },
  {
    name: "Demo",
    url: "/demo"
  }
]

const Header = () => {
  return <>
  <div className="flex flex-row justify-between items-center">

    <div className="flex flex-row">
      <IceCream/>
      <span>ReachWise</span>
    </div>

    <div className="flex flex-row gap-5">
      {MenuItems.map((item,index)=><span key={index}><button onClick={()=>redirect(item.url)} className="px-3 py-2 bg-slate-100 rounded-xl">{item.name}</button></span>)}
    </div>
  </div>
  </>
}

export default Header;
