
import {useState, useEffect} from "react";

import { useRecoilState } from "recoil";
import Atom_auth from "./Atoms/Atom_auth.jsx";
import Atom_user_name from "./Atoms/Atom_user_name.jsx";
import Register from "./Components/Register.jsx";
import Login from "./Components/Login.jsx"
import Comments from "./Components/Comments.jsx";
import Insert from "./Components/Insert";
import Admin from "./Components/Admin";



import "../resources/css/style.css"
import axios from "axios";


function App() {
    const url= import.meta.env.VITE_APP_URL
    const [registerVisible, setRegisterVisible] = useState(false);
    const [loginVisible, setLoginVisible] = useState(false);
    const [insertVisible, setInsertVisible] = useState(false);
    const [adminVisible, setAdminVisible] = useState(false)
    const [commentsVisible, setCommentsVisible]=useState(true)
const [state, setState]=useState(false)
const [authorized, setAuthorized ] = useRecoilState(Atom_auth);
    const [user_name, setUser_name ] = useRecoilState(Atom_user_name);
    const [list, setList]=useState([])


    function showAdmin(e)
    {


       if(adminVisible==false) {
           setLoginVisible(false)
           setInsertVisible(false)
           setCommentsVisible(false)
           setAdminVisible(true);
           e.target.innerText = "Skrýt"
       }
       else
       {
setCommentsVisible(true);
setAdminVisible(false);
e.target.innerText="Správa uživatelů";



       }



    }


    function hideInsert()
    {
        setInsertVisible(false)
    }

    function changeState()
    {

       setState(!state)
    }


function logout()
{
  setAuthorized(false);
setLoginVisible(false);
setRegisterVisible(false);
setUser_name(null);
    setInsertVisible(false);

}


    function getComments(){

        axios.get(url + '/getComments').then((res)=>{

            let data=res.data;
            data.sort(function(x,y){

                if(x.shift<y.shift)
                {
                    return -1;
                }
                if(x.shift > y.shift)
                {
                    return 1;
                }

                return 0;


            })

            setList(data)

        })
    }


    useEffect(()=>{

        getComments()

    }, [state])














    return (
    <div className={'col-12 row justify-content-center '}>
        {authorized == true ?
            <div className={'col-12 row justify-content-between align-items-center '}>
                <div className={'col-1  text-center button_blue'}>{user_name}</div>
                <div  onClick={(e)=>showAdmin(e)} className={'col-2 button text-center'}>Správa uživatelů</div>

                 <div onClick={()=>setInsertVisible(true)}  className={'col-2 text-center button'} id={"insert_button"}>Vložit příspěvek</div>

                <div onClick={()=>logout()}  className={' col-2 text-center button '}>Odhlásit se</div>

            </div>


            :
            <div className={'col-12 d-flex mt-2 '}>
                <div className={'text-center button_blue '} onClick={() => {setLoginVisible(true); setRegisterVisible(false)}}>Přihlásit</div>
                <div className={'text-center button_blue'} onClick={() => {setRegisterVisible(true); setLoginVisible(false)}}>Registrovat</div>


            </div>
        }

        {loginVisible==true && authorized==false ?
            <Login />
            :
            null
        }


        {registerVisible==true && authorized==false ?
            <Register fromAdmin={false} />
            :
            null
        }

        {insertVisible==true ?

            <div className={'col-8 row justify-content-center '}>
                <Insert parent_id={0} isReaction={false} hideInsert={hideInsert} changeState={changeState} />
            </div>
            :
            null

        }

        {adminVisible==true ?

        <Admin />
        :
            null
        }

        {commentsVisible==true ?
        <div className={'col-8 row justify-content-center '}>



        <Comments changeState={changeState} list={list} />
        </div>
            :
            null
        }

    </div>
  )
}

export default App
