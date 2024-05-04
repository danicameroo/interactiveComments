import Cards from "../Cards/Cards";
import Input from "../Input/Input";
import { useEffect, useState } from "react";
import axios from 'axios';

const Home = () => {
    const [mes, setMes] =  useState([]);
    const [ultimoId, setUltimoId] = useState(null);

    useEffect(() => {
        const getMes = async () => {
          try {
            const res = await axios.get(`https://api-interactive.vercel.app/api/messages`);
            
            setMes(res.data);
            
            const lastId = res.reduce((maxId, item) => {
              return item.id > maxId ? item.id : maxId;
            }, 0);
            setUltimoId(lastId);
            
          } catch (err) {
            console.log(err);
          }
        };
        getMes();
      }, []);


      const sortedMes = mes.sort((a, b) => a.id - b.id);

    return(
        <>
            {sortedMes.map((item) => (
                <Cards item={item} key={item.id} ultimoId={ultimoId} />
            ))}
            <Input mes={mes} />
        </>
    );
};

export default Home;