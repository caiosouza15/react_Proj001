import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from '../api';
import { Photo as PhotoType } from '../types/Photo';

export const Photo = () => {
    const params = useParams();
    const nav = useNavigate();

    const [loading, setLoading] = useState(false);
    const [photoInfo, setPhotoInfo] = useState<PhotoType>()

    useEffect(() =>{
        if(params.id){
            loadPhoto(params.id)
        }
    }, []);

    const loadPhoto = async (id:string) => {
        setLoading(true);
        const photo = await api.getPhoto(id);
        setPhotoInfo( photo );
        setLoading(false);

    }
    const handleBack = () => {
        nav(-1);
    }
    return(
        <div>
            {loading && "Carregando..."}

            {photoInfo &&
            <>
            <div className="flex flex-row-reverse">
                <button 
                onClick={handleBack}
                className="h-8 w-20 bg-slate-300 rounded hover:-translate-y-1 hover:scale-110 hover:bg-teal-300 duration-300"
                >Voltar</button></div>            
            <p> Titulo: {photoInfo.title}</p>
            <img src={photoInfo.url}  alt={photoInfo.title} />            
            </>
            }
        </div>
    );
}