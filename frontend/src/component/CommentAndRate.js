import { format } from "date-fns";
import RatingStars from "./RatingStars";

export default function CommentAndRate({name = "Hien", rate = 2, comment = "Hay", date = "01-12-2024"}) {
    return (
        <div className='bg-gray-300 px-10 py-2 rounded-lg flex flex-col'>
            <p className='font-semibold'>{name}</p>
            <div className='flex items-center gap-x-1 ml-3'>
              <RatingStars rate={rate}/>
              <p className='text-xs ml-2 italic font-thin'>{format(new Date(date), "dd-MM-yyyy")}</p>
            </div>
            <div className='flex gap-x-3'>
              <p className='ml-3'>{comment}</p>
            </div>
        </div>
    )
}