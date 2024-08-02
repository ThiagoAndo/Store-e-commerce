import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import classes from "./product-item.module.css";
import Button from "../ui/button/btn";

export default function ProductItem({ title, brand, thumbnail, id }) {
  const link = `product/${id}`;


  return (
    <article className={classes.product}>
      <header>
        <div className={classes.image}>
          <Image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={thumbnail}
            alt={title}
            fill
            priority={true}
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>{brand}</p>
        </div>
      </header>
      <div className={classes.content}>
        <div className={classes.actions}>
          <Button style={classes.actions}>View Details</Button>
        </div>
      </div>
    </article>
  );
}
