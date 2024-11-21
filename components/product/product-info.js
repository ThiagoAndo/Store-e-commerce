import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { sendCartData, updateCartData } from "@/helpers/cart-actions";
import { cartActions } from "@/store/redux/cart-slice";
import { formatValue } from "@/helpers/functions";
import { useSession } from "next-auth/react";
import StarRating from "../ui/rating/StarRating";
import classes from "./product-info.module.css";

/**
 * ProductInfo Component:
 * Displays detailed information about a product, including its brand, title, description, price,
 * and a rating. Allows the user to add the product to the cart with integration for updating local
 * and server-side cart data.
 */

function ProductInfo({ props }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items); // Access current cart items
  const { data: session } = useSession(); // Access user session data

  // Destructure product details from props
  const { title, brand, description, id } = props;
  let price = props.price - props.price * (props.discountPercentage * 0.01); // Calculate discounted price
  const rating = Math.floor(Math.random() * (5 - 1 + 1)) + 1; // Generate random rating for UI demo

  // Handle adding the product to the cart
  function handleClick() {
    const [prt] = cart.filter((prt) => {
      return prt.id === id; // Check if the product is already in the cart
    });

    // Update local cart state
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );

    // If the user is logged in, update the server-side cart data
    if (session) {
      const name = title;
      if (!prt?.id) {
        // Send new cart data to the server if the product is not already in the cart
        sendCartData({
          id,
          name,
          price,
          quantity: 1,
        });
      } else {
        // Update existing cart data on the server
        updateCartData({
          item_id: id,
          user_id: localStorage.getItem("id"),
          quantity: prt.quantity + 1,
        });
      }
    }
  }

  return (
    <article className={classes.product}>
      {/* Product Header: Brand, Title, and Description */}
      <div className={classes.headerText}>
        <p>Brand: {brand}</p>
        <h2>{title}</h2>
        <div className={classes.description}>
          <p>Description</p>
          <p>{description}</p>
        </div>
      </div>
      {/* Product Pricing and Rating */}
      <div>
        <div className={classes.price}>
          <p>{formatValue(price)}</p> {/* Discounted Price */}
          <p>{formatValue(props.price)}</p> {/* Original Price */}
        </div>
        <div className={classes.rating}>
          <StarRating props={{ type: "score", score: rating }} key={"score"} />
          <p>( {(props.rating * 15).toFixed(0)} )</p> {/* Number of ratings */}
        </div>
      </div>
      {/* Add to Cart Button */}
      <div className={classes.actions}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 150 }}
          onClick={handleClick}
        >
          Add to cart
        </motion.button>
      </div>
    </article>
  );
}

export default ProductInfo;
