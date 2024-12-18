import { FaStar } from "react-icons/fa";
import RatingStars from "./RatingStars";
import { useState } from "react";

export default function CommentAndRateForm({rate = 0, comment = "Hay de lai nhan xet cho phim", closeForm}) {
    const [currentRating, setCurrentRating] = useState(rate);
    const [errorRating, setErrorRating] = useState(false);
    const [currentComment, setCurrentComment] = useState(comment);
    const [hover, setHover] = useState(null);
    const handleSubmitForm = () => {
        setErrorRating(currentRating===0)
        console.log(currentComment);
        console.log(currentRating)
        closeForm();
    }
    const handleCloseForm = () => {
        setCurrentComment(comment)
        setCurrentRating(rate)
        setErrorRating(false)
        closeForm();
    }
    return (
        <div className='bg-gray-500 px-10 py-2 rounded-lg flex flex-col justify-center items-center gap-y-2'>
            {errorRating && <p className="text-xs italic text-red-500">Vui lòng đánh giá bằng sao cho phim từ 1 đến 5 sao</p>}
            <div className='flex items-center gap-x-1'>
                {[...Array(5)].map((item, index) => {
                    return <label>
                        <input type="radio" onClick={()=>setCurrentRating(index+1)} className="hidden"></input>
                        <FaStar 
                            size={30} 
                            color={`${index+1 <= (hover || currentRating) ? "yellow":"gray"}`}
                            onMouseEnter={() => setHover(index+1)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                })}         
            </div>
            <div className='flex gap-x-3 w-[80%]'>
                <textarea 
                    className="p-2 rounded-lg w-full h-32 items-start bg-gray-200 text-gray-800"    
                    defaultValue={comment} 
                    onChange={(e)=>setCurrentComment(e.target.value)}>
                </textarea>
            </div>
            <div className="flex gap-x-10">
                <button className={`justify-center items-center bg-green-600 p-2 font-semibold text-xl rounded-lg hover:bg-green-700 transition-all`}
                    onClick={handleSubmitForm}>
                    Đăng
                </button>
                <button className={`justify-center items-center bg-red-500 p-2 font-semibold text-xl rounded-lg hover:bg-red-700 transition-all`}
                    onClick={handleCloseForm}>
                    Hủy
                </button>
            </div>
        </div>
    )
}