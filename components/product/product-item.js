import Link from "next/link";
import Image from "next/image";

import classes from "./product-item.module.css";

export default function ProductItem({
  title,
  description,
  brand,
  thumbnail,
}) {
  return (
    <article className={classes.product}>
      <header>
        <div className={classes.image}>
          <Image src={thumbnail} alt={title} width={50} height={70} />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>{brand}</p>
        </div>
      </header>
      <div className={classes.content}>
        <div className={classes.actions}>
          <Link href={`#`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
