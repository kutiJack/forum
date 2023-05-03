import axios from 'axios'
import { useRecoilState } from "recoil";
import Atom_auth from "../Atoms/Atom_auth.jsx";
import Atom_user_name from "../Atoms/Atom_user_name.jsx";


const Login=()=>{
    const url= import.meta.env.VITE_APP_URL
    const [authorized, setAuthorized] = useRecoilState(Atom_auth);
    const [user_name, setUser_name ] = useRecoilState(Atom_user_name);


function login()
{
const name=document.getElementById('name').value;
const password=document.getElementById('password').value;

axios.post(url + '/login', {name:name, password:password}).then((res)=>{
console.log('login ', res.data)
    if(res.data=='authorized')
    {
setUser_name(name);
setAuthorized(true)



    }



})



}



    return(
        <div id={'register_container'} className={'mt-4'} >


            <div className={'col-8 row justify-content-center '} id={'register_form'}>

                <div className={'col-4 text-end'}>Jméno:</div>
                <div className={'col-5 '}><input id={'name'} type={'text'} /></div>


                <div className={'col-4 text-end'}>Heslo:</div>
                <div className={'col-5'}><input id={'password'} type={'text'} /></div>

                <div className={'col-4'}></div>
                <div  className={'col-5 '}><div onClick={login} className={'col-3 text-center '} id={'register_button'}>Přihlásit</div></div>


            </div>

        </div>

    )
}

export default Login;
