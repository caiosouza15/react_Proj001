import { Link } from "react-router-dom";

type Props = {
    id: number;
    title: string;
}
export const AlbumItem = ({ id, title }: Props) => {

    return (
        <div 
        className="flex p-3 border-solid border mb-3 drop-shadow-2xl rounded hover:bg-slate-100">
            <Link to={`/album/${id}`}>
                {title}
            </Link>
        </div>
    );
}