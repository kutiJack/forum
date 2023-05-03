import axios from 'axios'
import '../../resources/css/style.css'
import '../../resources/css/bootstrap/css/bootstrap.min.css'
import { useRecoilState } from "recoil";
import Atom_auth from "../Atoms/Atom_auth.jsx";
import Atom_user_name from "../Atoms/Atom_user_name.jsx";

const Register = (props)=>{

    const url= import.meta.env.VITE_APP_URL
    const [authorized, setAuthorized] = useRecoilState(Atom_auth);
    const [user_name, setUser_name ] = useRecoilState(Atom_user_name);

   const changeState=props.changeState;
const fromAdmin=props.fromAdmin;




function register()
{

    const name=document.getElementById('name').value;
    const password=document.getElementById('password').value;

if(name.length>3 && password.length>5) {

    axios.post(url + '/register', {name: name, password: password}).then((res) => {

      if(res.data=='OK')
      {

          if(fromAdmin==false) {
              setAuthorized(true);
              setUser_name(name);
          }
changeState();

document.getElementById('name').value='';
document.getElementById('password').value=''


      }
      else if (res.data=='exists')
      {
          alert('Toto jméno už existuje...')
      }
      else return;


    })
}

else
{
    alert('Jméno musí mít min. 3 znaky a heslo musí být min. 6 znaků dlouhé!');
}


}


    return (

        <div id={'register_container'} className={'mt-4'} >


<div className={'col-8 row justify-content-center '} id={'register_form'}>

<div className={'col-4 text-end'}>Jméno:</div>
 <div className={'col-5 '}><input id={'name'} type={'text'} /></div>


    <div className={'col-4 text-end'}>Heslo:</div>
    <div className={'col-5'}><input id={'password'} type={'text'} /></div>

    <div className={'col-4'}></div>
    <div  className={'col-5 '}>
        <div onClick={register} className={'col-4 text-center'} id={'register_button'}>Odeslat</div>
    </div>


</div>

        </div>



    )

}


export default Register;
