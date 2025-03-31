import { useState, cloneElement } from "react";
import s from "./styles.module.css";

interface Props<TEntry = any> extends Omit<React.ComponentProps<"div">, "children"> {
  children: (props: { entry: TEntry, i: number }) => React.ReactNode;
  "aria-label": string;
  items: TEntry[];
  numPerSlide: number;
  indicator?: React.ReactElement;
}

const Carousel = <TEntry,>({
  children,
  className,
  items,
  numPerSlide,
  indicator,
  ...props
}: Props<TEntry>) => {
  const [currentSlide, setCurrentSlide] = useState(1),
    totalSlides = Math.ceil(items.length / numPerSlide);

  const handlePrev = () => {
    setCurrentSlide(
      (prev) => ((prev - 2 + totalSlides) % totalSlides) + 1
    )
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev % totalSlides) + 1)
  };

  const goToSlide = (index: number) => {
    if (index >= 1 && index <= totalSlides) {
      setCurrentSlide(index);
    }
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-live="polite"
      className={`${s.container}${className ? " " + className : ""}`}
      {...props}
    >
      <div
        role="group"
        aria-label={currentSlide.toString()}
        aria-roledescription="slide"
      >
        {items
          .slice((currentSlide - 1) * numPerSlide, currentSlide * numPerSlide)
          .map((entry, i) => children({ entry, i }))}
      </div>

      {items.length > numPerSlide && (
        <div role="group" id="indicators" className={s.controls}>
          <button
            className="fade"
            aria-label="Previous page"
            onClick={handlePrev}
          />
          {numPerSlide > 1 && (
            <p className={s.indicator}>
              Slide {currentSlide} of {totalSlides}
            </p>
          )}
          {indicator && cloneElement(indicator, { currentSlide, handlePrev, handleNext, goToSlide })}
          <button
            className="fade"
            aria-label="Next page"
            onClick={handleNext}
          />
        </div>
      )}
    </div>
  );
};

export default Carousel;
