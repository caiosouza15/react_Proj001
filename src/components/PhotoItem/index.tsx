import { Link } from "react-router-dom";
import { Photo } from '../../types/Photo'

type Props = {
    data: Photo
}
export const PhotoItem = ({ data }: Props) => {
    return (
        <div 
        className="flex p-5 flex-row " >
            <Link to={`/photo/${data.id}`} >
                <img src={data.thumbnailUrl} alt={data.title} />
            </Link>
        </div>
    );
}