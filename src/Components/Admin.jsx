import axios from 'axios'
import {useState, useEffect} from 'react';
import Register from "./Register";

const Admin=()=>{
    const url= import.meta.env.VITE_APP_URL
const [students, setStudents]=useState([]);
    const [state, setState]=useState(false)



    function changeState()
    {
        setState(!state);
    }


function getUsers()
{
axios.get(url + '/getUsers').then((res)=>{

setStudents(res.data)



})


}


function deleteUser(e)
{
//const id = e.target.nextSibling.getAttribute('id');
const user_id = e.target.parentNode.childNodes[0].getAttribute('id');

axios.post(url + '/deleteUser', {user_id:user_id}).then((res)=>{

if(res.data=='OK')
{
setState(!state);




}

})


}

useEffect(()=>{
    getUsers();

}, [state])


    return(
        <div className={'container col-12 row justify-content-center mt-4'}>
        <div className={'col-10 row row-cols-3 '}>

            {
                students ?
                    students.map((item)=>{
                        return(
                            <div className={'col-4 row user-container' }>
                            <div id={item.id} className={'text-center user-name-field'}>{item.name}</div>
                                <div onClick={(e)=>deleteUser(e)} className={'user-delete-field'}>Odstranit</div>
                            </div>
                        )
                    })
                    : null
            }




        </div>

   <div style={{fontWeight:"bold"}} className={'col-5 text-start mt-4 '}>Přidat uživatele</div>
    <Register changeState={changeState} fromAdmin={true}/>



        </div>
    )

}

export default Admin;

