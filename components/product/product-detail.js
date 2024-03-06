import Image from "next/image";
import Link from "next/link";

import classes from "./product-detail.module.css";

function ProductDetail({ props }) {
  console.log("props");
  console.log(props.images);

  return (
    <article className={classes.product}>
      <section className={classes.image_container}>
        <ul className={classes.img}>
          {props.images.map((img) => (
            <li className={classes.img}>
              <Image src={img.image} fill />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <div className={classes.headerText}>
          <h2>{props.title}</h2>
          <p>{props.brand}</p>
        </div>
      </section>
    </article>
  );
}

export default ProductDetail;
