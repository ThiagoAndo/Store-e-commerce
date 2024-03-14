import { useState, useEffect } from "react";
import { StarRatingDiv } from "./StarRatingStyles";
import star from "@/assets/star.svg";
import Image from "next/image";

export default function StarRating({ props }) {
  const [rating, setRating] = useState();
  const [hover, setHover] = useState();
  const [israting, setIsRating] = useState(false);

  useEffect(() => {
    if (props.type === "score") {
      setRating(props.score);
    } else {
      setIsRating(true);
      setRating(null);
      setHover(null);
    }
  }, []);

  return (
    <StarRatingDiv>
      {[...Array(5)].map((Star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => israting && setRating(ratingValue)}
            />
            <Image
              src={star}
              size={50}
              onMouseEnter={() => israting && setHover(ratingValue)}
              onMouseLeave={() => israting && setHover(null)}
              className={
                ratingValue <= (hover || rating) ? "activeStar" : "star"
              }
            />
          </label>
        );
      })}
    </StarRatingDiv>
  );
}
