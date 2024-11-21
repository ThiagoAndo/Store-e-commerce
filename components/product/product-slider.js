import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { useState } from "react";

// Style of this component is in global.css

/**
 * ThumbnailPlugin:
 * A plugin for Keen Slider to enable thumbnail navigation for the main slider.
 * Allows thumbnails to control the main slider and syncs the active state between them.
 */
function ThumbnailPlugin(mainRef) {
  return (slider) => {
    // Remove "active" class from all slides
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }

    // Add "active" class to the specified slide
    function addActive(idx) {
      slider.slides[idx].classList.add("active");
    }

    // Attach click events to thumbnail slides for navigation
    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    // Sync thumbnails with the main slider on initialization and animation
    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel); // Set initial active thumbnail
      addClickEvents(); // Add click events to thumbnails
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next)); // Update active thumbnail
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next)); // Sync thumbnails
      });
    });
  };
}

/**
 * DetailSlider Component:
 * A slider component for displaying product images with a thumbnail navigation bar.
 * Uses Keen Slider for smooth animations and thumbnail syncing.
 */
export default function DetailSlider({ img }) {
  const [loading, setLoading] = useState(true); // Tracks image loading state

  // Main slider instance
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0, // Start from the first slide
  });

  // Thumbnail slider instance with the custom ThumbnailPlugin
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 1, // Start from the second slide in the thumbnail view
      slides: {
        perView: 3, // Show 3 slides per view
        spacing: 10, // Add spacing between slides
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  return (
    <div className="slider-cont">
      {/* Main image slider */}
      <div ref={sliderRef} className="keen-slider">
        {img.map((i, idx) => (
          <div key={i.image} className="keen-slider__slide number-slide">
            <Image
              width={250}
              height={200}
              src={i.image}
              alt={"Product image"}
              priority={true} // Optimize image loading
              onLoad={() => {
                if (idx === 2 || idx === img.length - 1) setLoading(false); // Stop suspense when enough images load
              }}
              className={loading ? "suspense" : null} // Apply suspense class while loading
              onError={() =>
                console.error(`Failed to load image Slider: ${i.imag}`)
              }
            />
          </div>
        ))}
      </div>

      {/* Thumbnail slider */}
      <div ref={thumbnailRef} className="keen-slider thumbnail">
        {img.map((i) => (
          <div key={i.image} className="keen-slider__slide number-slide">
            <Image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive image sizes
              fill
              src={i.image}
              alt={"Product image"}
              priority={true} // Optimize thumbnail loading
              onError={() =>
                console.error(`Failed to load image Slider: ${i.imag}`)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
