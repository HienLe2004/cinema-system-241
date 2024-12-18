import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { createDanhGiaByMaP, updateDanhGiaByMaP } from "../api/danhgia.api";
import { format } from "date-fns";

export default function CommentAndRateForm({rate = 0, comment = "Hay de lai nhan xet cho phim", closeForm, myRating, maP}) {
    const [currentRating, setCurrentRating] = useState(rate);
    const [errorRating, setErrorRating] = useState(false);
    const [currentComment, setCurrentComment] = useState(comment);
    const [hover, setHover] = useState(null);
    const [isUpdate, setIsUpdate] = useState();
    const handleSubmitForm = async () => {
        setErrorRating(currentRating===0)
        if (!maP) return;
        if (isUpdate) {
            const {data} = await updateDanhGiaByMaP(maP, {...myRating, BinhLuan: currentComment, DiemSo: currentRating})    
            closeForm({...myRating, BinhLuan: currentComment, DiemSo: currentRating})
        }
        else {
            const customer = JSON.parse(localStorage.getItem("customer"))
            const {data} = await createDanhGiaByMaP(maP, 
                {MaKH: customer.MaKH, BinhLuan: currentComment, DiemSo: currentRating, Ngay: format(new Date(), "yyyy-MM-dd")})
            closeForm({Ten: customer.Ten, MaKH: customer.MaKH, BinhLuan: currentComment, DiemSo: currentRating, Ngay: format(new Date(), "yyyy-MM-dd")})
        }
    }
    const handleCloseForm = () => {
        setCurrentComment(comment)
        setCurrentRating(rate)
        setErrorRating(false)
        closeForm(null);
    }
    useEffect(()=>{
        if (myRating) {
            setIsUpdate(true)
        }
        else{
            setIsUpdate(false)
        }
    },[])
    return (
        <div className='bg-gray-500 px-10 py-2 rounded-lg flex flex-col justify-center items-center gap-y-2'>
            {errorRating && <p className="text-xs italic text-red-500">Vui lòng đánh giá bằng sao cho phim từ 1 đến 5 sao</p>}
            <div className='flex items-center gap-x-1'>
                {[...Array(5)].map((item, index) => {
                    return <label key={index}>
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
                    {myRating ? "Cập nhật" : "Đăng"}
                </button>
                <button className={`justify-center items-center bg-red-500 p-2 font-semibold text-xl rounded-lg hover:bg-red-700 transition-all`}
                    onClick={handleCloseForm}>
                    Hủy
                </button>
            </div>
        </div>
    )
}