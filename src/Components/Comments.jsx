
import axios from 'axios'
import '../../resources/css/style.css'
import Atom_user_name from "../Atoms/Atom_user_name.jsx";
import {useRecoilState} from "recoil";
import {useState, useEffect} from 'react'
import Insert from './Insert'

const Comments=(props)=>{
    const url= import.meta.env.VITE_APP_URL
    const [user_name,  ] = useRecoilState(Atom_user_name);
    const [insertVisible, setInsertVisible]=useState(false)
const [parentId, setParentId ]=useState(0)
    const list=props.list;
const changeState=props.changeState;

function hideInsert()
{
    setInsertVisible(false)
}

function showInsert(e)
{
   const parent_id = e.target.parentElement.parentElement.getAttribute('id');
setParentId(parent_id);
setInsertVisible(true)


}



            return <div className={'col-10 row text-cen justify-content-center '}>

                {insertVisible==true ?
                    <Insert hideInsert={hideInsert} changeState={changeState} parent_id={parentId}  isReaction={true}  />
                    :
                    null

                }
                {list.map((item)=>{

                   const shift=item.shift.split('-').length*100;
                    const margin=shift + 'px'
                return <div style={{marginLeft:`${margin}`}}  className={"comment_container"} id={item.id}>
<div className={'comment_author'}>{item.author}</div>
                    <div className={'col-12 comment_content  '} >
                        {item.content}
                            </div>

                    {user_name ?
                        <div className={'col-12 row justify-content-center'}>
                            <div onClick={(e) => showInsert(e)} className={'col-1 comment_react'}>Reagovat</div>
                        </div>
                        :
                        null
                    }
                </div>

            })}



            </div>

}




export default Comments;
