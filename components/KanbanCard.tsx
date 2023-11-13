


const KanbanCard = ({ name, description }: any) =>{

    return(
        <div className="w-56 h-44 rounded overflow-hidden shadow-lg bg-red-50">
      
        <div className="px-2 py-2 text-center">
            <div className="font-bold text-l mb-2 text-center">
              {name}
            </div>
    
            <p className="text-gray-700 text-base">
              {description}
            </p>
        </div>
    </div>
    )
}

export default KanbanCard;