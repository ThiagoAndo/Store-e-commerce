import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { useState } from "react";
// Style of this component is on global.css
function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

export default function DetailSlider({ img }) {
  const [loading, setLoading] = useState(true);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
  });
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 1,
      slides: {
        perView: 3,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  return (
    <div className="slider-cont">
      <div ref={sliderRef} className="keen-slider">
        {img.map((i, idx) => (
          <div key={i.image} className="keen-slider__slide number-slide">
            <Image
              width={250}
              height={200}
              src={i.image}
              alt={"Product image"}
              priority={true}
              onLoad={() =>{
                if(idx === 2 || idx ===img.length-1)setLoading(false) ;
              }
              }
              className={loading ? `${"suspense"}` : null}
            />
          </div>
        ))}
      </div>

      <div ref={thumbnailRef} className="keen-slider thumbnail">
        {img.map((i) => (
          <div key={i.image} className="keen-slider__slide number-slide">
            <Image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              src={i.image}
              alt={"Product image"}
              priority={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
