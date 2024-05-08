import Link from "next/link";
import Image from "next/image";
import classes from "./product-item.module.css";

export default function ProductItem({ title, brand, thumbnail, id }) {
  const link = `product/${id}`;

  return (
    <article className={classes.product}>
      <header>
        <div className={classes.image}>
          <Image src={thumbnail} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>{brand}</p>
        </div>
      </header>
      <div className={classes.content}>
        <div className={classes.actions}>
          <Link href={link}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
