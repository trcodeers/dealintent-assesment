import { MdDelete } from "react-icons/md";


const KanbanCard = ({ item, index, onDelete, status }: any) =>{

    return(
        <div className="w-45 h-36 rounded overflow-hidden shadow-lg bg-red-50 relative">
      
            <div className="px-2 py-2 text-center">
                <div className="font-bold text-l mb-2 text-center">
                {item.name}
                </div>
        
                <p className="text-gray-700 text-base">
                {item.description}
                </p>
            </div>
                
            <div className="bg-green-200 w-32 text-gray-500 rounded-lg text-center text-xs absolute bottom-0 left-1 mb-1">
                {item.date}
            </div>

            <div className="absolute bottom-0 right-0 mb-1 mr-2">
                <div className="flex flex-row justify-center">
                    <div onClick={() => onDelete(item, index, status)} className="inline-block text-red-500 bg-green-100 rounded-full px-2 py-1 text-gray-700">
                        <MdDelete />
                    </div>
                </div>
            </div>
 
        </div>
    )
}

export default KanbanCard;