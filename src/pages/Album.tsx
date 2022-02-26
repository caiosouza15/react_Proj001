import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { Photo } from '../types/Photo'
import { Album as AlbumType } from '../types/Album';
import { PhotoItem } from '../components/PhotoItem';

export const Album = () => {
    const params = useParams();
    const nav = useNavigate();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<Photo[]>([]);
    const [albumInfo, setAlbumInfo] = useState<AlbumType>({ id: 0, title: '', userId: 0 });

    useEffect(() => {
        if (params.id) {
            loadPhotos(params.id);
            loadAlbumInfo(params.id);
        }
    }, []);

    const loadPhotos = async (id: string) => {
        setLoading(true);
        const photos = await api.getPhotosFromAlbum(id);
        setList(photos);
        setLoading(false);
    }

    const loadAlbumInfo = async (id: string) => {
        const albumInfo = await api.getAlbum(id);
        setAlbumInfo(albumInfo);
    }
    const handleBack = () => {
        nav(-1);
    }
    const nameUp = (text: string) => {        
       const subst = text.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });       
       return subst;       
    }
    console.log(nameUp(albumInfo.title));
    return (
        <>
            {loading && "Carregando..."}
            <div className="flex flex-row-reverse">
                <button 
            onClick={handleBack}
            className="h-8 w-20 bg-slate-300 rounded hover:-translate-y-1 hover:scale-110 hover:bg-teal-300 duration-300"
            >Voltar</button></div>
            <div>                
                <h1 className="text-xl">Album: {nameUp(albumInfo.title)}</h1>                
                </div>
                <hr />              
                <div className="grid grid-cols-5"> 
                {list.map((item, index) => (
                    <PhotoItem
                        key={index}
                        data={item}
                    />
                ))}
            </div>
            
        </>
    );
}