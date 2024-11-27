import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import styles from './styles.module.sass'
interface RatingStarsProps {
    rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }: RatingStarsProps): JSX.Element => {
    return (
        <div className={styles['rating-stars-container']}>
            {[...Array(rating)].map((_, index) => (
                <IoIosStar key={index} color="#FFD700" size={'1.2rem'} />
            ))}
            {[...Array(5 - rating)].map((_, index) => (
                <IoIosStarOutline key={index} color="#FFD700" size={'1.2rem'} />
            ))}
        </div>
    )
}

export default RatingStars