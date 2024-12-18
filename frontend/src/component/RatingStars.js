import { FaStar } from "react-icons/fa"

export default function RatingStars({rate = 0}) {
    return <div className="flex gap-x-1">
        {[...Array(5)].map((item, index) => {
            return <FaStar key={index} size={12} color={`${index < rate ? "yellow":"gray"} `}/>
        })}
    </div>
}