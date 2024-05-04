import './Cards.css'
import './CardMobile.css'
import reply from '../../images/icon-reply.svg'
import editFoto from '../../images/icon-edit.svg'
import del from '../../images/icon-delete.svg'
import plus from '../../images/icon-plus.svg'
import minus from '../../images/icon-minus.svg'
import { useState } from 'react'
import foto from '../../images/avatars/image-juliusomo.png'
import '../Input/Input.css'
import { addMessages, deleteMessages, updateMessages } from '../../redux/apiCalls'
import { useDispatch } from "react-redux";
import { formatDistanceToNow } from 'date-fns';

const Cards = ({item, ultimoId}) => {
const [isReplying, setIsReplying] = useState(false)
const [isDelete, setIsDelete] = useState(false)
const [edit, setEdit] = useState(false)
const [input, setInput] = useState("")
const [inputUpdate, setInputUpdate] = useState("")
const dispatch = useDispatch();

const onClick = () => {
    if(isReplying === false){
        setIsReplying(true)
    }else{
        setIsReplying(false)
    }
}

const handleClick = async (e) => {
    e.preventDefault();
    try {
      const messages = {id: item.id, text: input, username: "juliusomo", img: "https://firebasestorage.googleapis.com/v0/b/practica-6c473.appspot.com/o/image-juliusomo.png?alt=media&token=6f533a33-a211-4425-9779-5291bbee6830", reply: true, replyTo: item.username, current: true, idReply: item.id};
      setIsReplying(false)
      await addMessages(messages, dispatch);
      window.location.reload()
    } catch (err) {
      console.log("error");
    }
};

const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedMessages = {
        ...item, 
        text: inputUpdate, 
      };
      setEdit(false)
      await updateMessages(item._id, updatedMessages, dispatch);
      window.location.reload()
    } catch (err) {
      console.log("error");
    }
};

const handleDelete = async (e) => {
    e.preventDefault()
    try{
      await deleteMessages(item._id, dispatch);
      window.location.reload()
    } catch (err) {
      console.log("error");
    }
};

const plusClick = async (e) => {
    e.preventDefault();
    console.log('first')
    try {
      const updatedMessages = {
        ...item, 
        count: item.count + 1, 
      };
      await updateMessages(item._id, updatedMessages, dispatch);
      window.location.reload()
    } catch (err) {
      console.log("error");
    }
};

const minusClick = async () => {
    try {
      const updatedMessages = {
        ...item, 
        count: item.count > 1 ? item.count - 1 : item.count, 
      };
      await updateMessages(item._id, updatedMessages, dispatch);
      window.location.reload()
    } catch (err) {
      console.log("error");
    }
};


const replyToText = "@" + item.replyTo
    return(
        <>
            <div className={item.reply === true ? `CardsReply` : `Cards`}>
                <div className={item.reply === true ? `CardsBackReply` : `CardsBack`}>
                    <div className='mobileCountReply'>
                        <div className='contbutton'>
                            <button className='clicks' onClick={plusClick}><img src={plus} alt="" /></button>
                            <p className='count'>{item.count}</p>
                            <button className='clicks' onClick={minusClick}><img src={minus} alt="" /></button>
                        </div>
                        <div>
                        {item.current === true ?
                            <div className='actButtonUserMob'>
                                <button className='deleteMob' onClick={() => setIsDelete(true)}><img src={del} alt="" /><p className='textDeleteMob'>Delete</p></button>
                                <button className='editMob' onClick={() => setEdit(true)}><img src={editFoto} alt="" /><p className='textReplyMob'>Edit</p></button>
                            </div> :
                            <button className='replyMob' onClick={onClick}><img src={reply} alt="" /><p className='textReplyMob'>Reply</p></button>
                            }
                        </div>
                    </div>
                    <div className='contUsercont'>
                        <div className='userCont'>
                            <img className='fotoUser' src={item.img} alt="" />
                            <h3 className='user'>{item.username}</h3>
                            {item.current === true ? <div className='you'><p className='textYou'>you</p></div> : <div></div>}
                            <p className='time'>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</p>
                            {item.current === true ?
                            <div className='actButtonUser'>
                                <button className='delete' onClick={() => setIsDelete(true)}><img src={del} alt="" /><p className='textDelete'>Delete</p></button>
                                <button className='edit' onClick={() => setEdit(true)}><img src={editFoto} alt="" /><p className='textReply'>Edit</p></button>
                            </div> :
                            <button className='reply' onClick={onClick}><img src={reply} alt="" /><p className='textReply'>Reply</p></button>
                            }
                        </div>
                        <div className='message'>
                            {edit === true ?
                                <div className='editInputCont'>
                                    <input onChange={(event) => setInputUpdate(event.target.value) } className='inputEdit' defaultValue={item.text} type="text" /> 
                                    <button className='send' onClick={handleEdit}>UPDATE</button>
                                </div>
                                :
                                <p>{item.replyTo && replyToText} {item.text}</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
                {isReplying === true ?
                <div className='inputCard'>
                    <div className='InputRe'>
                        <div className='inputBackRe inputBackCard'>
                            <img className='fotoUser' src={foto} alt="" />
                            <input onChange={(event) => setInput(event.target.value)} className='input' type="text" placeholder='Add a comment...' />
                            <button className='send' onClick = {handleClick}>REPLY</button>
                        </div>
                    </div>
                </div>
                : <div></div>}
                {isDelete === true ? 
               <div className="DeleteOverlay">
                    <div className="DeleteCont">           
                        <h4 className='titleDel'>Delete comment</h4>
                        <p className='textDel'>Are you sure you want to delete this comment? This will remove the commentand cant be undone</p>
                        <div className='buttonYesNo'>
                            <button className='no' onClick={() => setIsDelete(false)}>No, Cancel</button>
                            <button className='yes' onClick={handleDelete}>Yes, Delete</button>
                        </div>
                    </div>
                </div>
                : <div></div>}
        </>
    )
}

export default Cards