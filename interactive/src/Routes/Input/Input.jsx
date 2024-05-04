import { useEffect, useState } from 'react'
import foto from '../../images/avatars/image-juliusomo.png'
import './Input.css'
import { addMessages } from '../../redux/apiCalls'
import { useDispatch } from "react-redux";
import axios from 'axios';


const Input = ({mes}) => {
    const [input, setInput] = useState("")
    const dispatch = useDispatch();

    const lastId = mes.reduce((maxId, item) => {
        return item.id > maxId ? item.id : maxId;
    }, 0);

    

    const onClick = async (e) => {
        e.preventDefault();
        try {
          const messages = {id: lastId + 1, text: input, username: "juliusomo", img: "https://firebasestorage.googleapis.com/v0/b/practica-6c473.appspot.com/o/image-juliusomo.png?alt=media&token=6f533a33-a211-4425-9779-5291bbee6830", reply: false, current: true};
          await addMessages(messages, dispatch);
          window.location.reload()
        } catch (err) {
          console.log("error");
        }
    };
    
    return(
        <div className='Input'>
            <div className='inputBack inputBackCard'>
                <img className='fotoUser' src={foto} alt="" />
                <input onChange={(event) => setInput(event.target.value)} className='input' type="text" placeholder='Add a comment...' />
                <button className='send' onClick = {onClick}>SEND</button>
            </div>
        </div>
    )
}

export default Input
