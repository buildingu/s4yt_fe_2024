import { useState } from "react";
import { connect } from "react-redux";

import s from "./styles.module.css";

interface Props<TItem = any> extends Omit<React.ComponentProps<"div">, "children"> {
  children: (props: { item: TItem, i: number }) => React.ReactNode;
  "aria-label": string;
  items: TItem[];
  numPerSlide: number;
}

// TODO: Change to carousel?
const Pagination = <TItem,>({ children, className, items, numPerSlide, ...props }: Props<TItem>) => {
  const [currentSlide, setCurrentSlide] = useState(1),
    totalSlides = Math.ceil(items.length / numPerSlide);

  // const goToSlide = (page: number) => {
  //   if (page >= 1 && page <= totalSlides) {
  //     setCurrentSlide(page);
  //   }
  // };
  // const nextSlide = () => {
  //   goToSlide(currentSlide + 1);
  // };
  // const prevSlide = () => {
  //   goToSlide(currentSlide - 1);
  // };

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
          .map((item, i) => children({ item, i }))}
      </div>

      {items.length > numPerSlide && (
        // TODO: Check aria.
        <div role="group" id="indicators" className={s.controls}>
          {/* {currentPage > 1 && ( */}
          <button
            className="fade"
            aria-label="Previous page"
            onClick={() =>
              setCurrentSlide(
                (prev) => ((prev - 2 + totalSlides) % totalSlides) + 1
              )
            }
          />
          {/* )} */}
          {numPerSlide > 1 && (
            <p className={s.indicator}>
              {/* {`Page ${currentSlide} of ${totalSlides}`} */}
              {`Slide ${currentSlide} of ${totalSlides}`}
            </p>
          )}
          {/* {currentPage < numPerSlide && ( */}
          <button
            className="fade"
            aria-label="Next page"
            onClick={() => setCurrentSlide((prev) => (prev % totalSlides) + 1)}
          />
          {/* )} */}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
export default Pagination;
