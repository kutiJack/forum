import axios from 'axios'
import {useNavigate} from "react-router-dom";
import { useRecoilState } from "recoil";
import Atom_user_name from "../Atoms/Atom_user_name.jsx";

const Insert=(props)=>{
    const url= import.meta.env.VITE_APP_URL
    const [user_name,  ] = useRecoilState(Atom_user_name);
    const navigate=useNavigate();
    const changeState=props.changeState;
    const hideInsert=props.hideInsert;
    const isReaction=props.isReaction
const getComments=props.getComments;
const parent_id = props.parent_id;

function insert() {

        const parent_id=props.parent_id;
    const content = document.getElementById('txt').value;

    let link = "";

    if (isReaction == false) {
        link = url + '/insert'
    } else {

        link = url + '/react'


    }

axios.post(link, {parent_id:parent_id,author:user_name, content:content}).then((res)=>{

if(res.data=='OK')
{


//getComments();
changeState();
hideInsert();

}

if(res.data=='failure')
{



}


})



}


    return(

        <div className={'col-6 row'}>

<div className={'col-12 row justify-content-center'}>
    <textarea className={'col-12'} id="txt" name="txt" rows="4" cols="50"></textarea>
    <button className={'col-4 mt-2'} onClick={()=>insert()}>Odeslat</button>

</div>




        </div>


    )


}

export default Insert;
