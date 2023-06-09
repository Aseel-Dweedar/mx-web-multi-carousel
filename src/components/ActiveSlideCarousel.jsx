import { createElement, useEffect, useState, useCallback } from "react";
import AliceCarousel from "react-alice-carousel";
import "../ui/ActiveSlideCarousel.scss";
import { commonClasses, activeSlideClasses, statusList } from "./helper";
import { v4 as uuidv4 } from "uuid";

export default function ActiveSlideCarousel(props) {
    const [renderCarousel, setRenderCarousel] = useState(false);

    const [carousel_items, set_carousel_items] = useState([]);
    const [responsive, setResponsive] = useState(null);
    const [uniqueClass, setUniqueClass] = useState("");
    const [currentActiveIdx, setCurrentActiveIdx] = useState(0);
    const [numberOfDisplayedItems, setNumberOfDisplayedItems] = useState(0);
    const [numberOfAllItems, setNumberOfAllItems] = useState(0);

    // get the 'react-alice-carousel' built-in all method and properties
    const [carouselProperties, setCarouselProperties] = useState(null);

    /*
        Fired when reach the end of the slider or when resize the carousel
        => move to the first item
    */
    const resetSlider = () => {
        setCurrentActiveIdx(0);
        setActiveClass(statusList.reset, null, 0);
    };

    /*
       Fired when ge back when step from the first item
       => move to the last item
   */
    const slideToTheEnd = () => {
        carouselProperties?.slideTo(numberOfAllItems - numberOfDisplayedItems + 1);
        setActiveClass(statusList.goLast, null, numberOfAllItems);
        setCurrentActiveIdx(numberOfAllItems);
    };

    /*
        Fired when clicking "previous" button
    */
    const prevClicked = () => {
        if (!currentActiveIdx) {
            // currentActiveIdx === 0, the active item is the first one, move to the last
            slideToTheEnd();
        } else {
            setActiveClass(statusList.prev, carouselProperties?.slidePrev, currentActiveIdx - 1);
            setCurrentActiveIdx(currentActiveIdx - 1);
        }
    };

    /*
        Fired when clicking "Next" button
    */
    const nextClicked = () => {
        if (currentActiveIdx === numberOfAllItems) {
            // the active item is the last one, move to the first
            carouselProperties?.slideTo(0);
            resetSlider();
        } else {
            setActiveClass(statusList.next, carouselProperties?.slideNext, currentActiveIdx + 1);
            setCurrentActiveIdx(currentActiveIdx + 1);
        }
    };

    /*
        Remove previous active item and get the index of the item that we want to set it active
    */
    const removeActiveClass = (status, allItems) => {
        let itemIdxToSetActive = 0;

        for (let i = 0; i < allItems?.length; i++) {
            // get the index of the item that we want to set it active in the "all items" array
            // NOTE: we can't use the state "currentActiveIdx" because "allItems" is containing the cloned item also
            if (
                allItems[i].classList?.contains(commonClasses.active) &&
                !allItems[i]?.parentElement?.classList?.contains("__cloned")
            ) {
                // if next pressed will be the next index, if previous pressed will be the previous index
                itemIdxToSetActive = status === statusList.next ? i + 1 : i - 1;
            }
            allItems[i].classList?.remove(commonClasses.active);
        }

        return itemIdxToSetActive;
    };

    /*
        setting the curren active class, and slide left or right when needed
    */
    const setActiveClass = (status, slideLeftOrRight, actionIdx) => {
        let allItems = document.querySelector(`.${uniqueClass}`)?.querySelectorAll(`.${commonClasses.item}`);
        let itemIdxToSetActive = removeActiveClass(status, allItems);

        // Set current active item
        if (status === statusList.reset) {
            // querySelectorAll ==> the original item and the cloned one
            let firstSlide = document
                .querySelector(`.${uniqueClass}`)
                ?.querySelectorAll(`.${activeSlideClasses.first_item}`);

            // set the active item for the first item in the carousel that is not cloned one
            for (let i = 0; i < firstSlide.length; i++) {
                if (!firstSlide[i]?.parentElement?.classList?.contains("__cloned")) {
                    firstSlide[i]?.classList?.add(commonClasses.active);
                    break;
                }
            }
        } else if (status === statusList.goLast) {
            // querySelectorAll ==> the original item and the cloned one
            let lastSlide = document
                .querySelector(`.${uniqueClass}`)
                ?.querySelectorAll(`.${activeSlideClasses.last_item}`);

            // set the active item for the last item in the carousel that is not cloned one
            for (let i = lastSlide.length - 1; i >= 0; i--) {
                if (!lastSlide[i]?.parentElement?.classList?.contains("__cloned")) {
                    lastSlide[i]?.classList?.add(commonClasses.active);
                    break;
                }
            }
        } else {
            // not containing active means that the next/prev item is not appearing in the screen right now
            // slide when reach to the start/end of the active item
            if (!allItems[itemIdxToSetActive]?.parentElement?.classList?.contains("__active")) {
                slideLeftOrRight();
            }
            allItems[itemIdxToSetActive]?.classList?.add(commonClasses.active);
        }

        // fire the action that related to the new active item
        let actionToFire = props.action?.get(props.data.items?.[actionIdx]);
        onSlideClicked(actionToFire);
    };

    /*
        fired when initialization the carousel
    */
    const onCarouselInit = e => {
        setNumberOfDisplayedItems(e.itemsInSlide);
        setResponsive({ ...props.defaultResponsive });

        let firstItemAction = props.action?.get(props.data.items?.[0]);
        onSlideClicked(firstItemAction);
    };

    /*
        fired when resizing the carousel, carousel will always slide to the first item when resizing -"react-alice-carouse" way of work-
    */
    const onCarouselResize = e => {
        setNumberOfDisplayedItems(e.itemsInSlide);
        carouselProperties?.slideTo(0);
        resetSlider();
    };

    /*
        fired the current active item action if found
    */
    const onSlideClicked = action => {
        if (action?.canExecute) action.execute();
    };

    /*
      set the items when render the widget or update the data
    */
    const setupCarouse = items => {
        let newData = items.map((item, idx) => (
            <div
                key={idx}
                className={`${commonClasses.item} ${
                    idx === 0 ? activeSlideClasses.first_item + " " + commonClasses.active : ""
                } ${idx === props.data.items.length - 1 ? activeSlideClasses.last_item : ""}`}
            >
                {props.content.get(item)}
            </div>
        ));

        setNumberOfAllItems(newData.length - 1);
        set_carousel_items(newData);
    };

    useEffect(() => {
        // This condition is to prevent render the carousel before get the items "This happens at the first widget render"
        if (props.data?.status === "available") {
            setRenderCarousel(true);
        }
    }, [carousel_items]);

    /*
      when getting the item or updated it set the carousel items 
    */
    useEffect(() => {
        if (props.data?.status === "available") {
            setRenderCarousel(false);
            setCurrentActiveIdx(0);
            setupCarouse(props.data.items);
        }
    }, [props.data?.items]);

    useEffect(() => {
        // set a unique class in case of using two different carousel instances in the same document
        setUniqueClass("a-" + uuidv4());
    }, []);

    /*
        set the responsive object after initialize the container so it take the correct dimensions
    */
    const carouselContainer = useCallback(node => {
        if (node) setResponsive({ ...props.defaultResponsive });
    }, []);

    return carousel_items?.length ? (
        <div className={activeSlideClasses.active_slide_container} ref={carouselContainer}>
            <button className={activeSlideClasses.prev_btn} onClick={prevClicked}></button>
            <div className={[uniqueClass, activeSlideClasses.active_slide_wrapper].join(" ")}>
                {responsive && renderCarousel && (
                    <AliceCarousel
                        // get the 'react-alice-carousel' all method and properties so we can override default next and previous buttons behavior
                        ref={el => setCarouselProperties(el)}
                        items={carousel_items}
                        responsive={responsive}
                        infinite={true}
                        autoPlay={false}
                        disableButtonsControls={true}
                        disableDotsControls={true}
                        // increasing the animation Duration more than 100 will crash the sliding in the carousel
                        animationDuration={100}
                        keyboardNavigation={false}
                        mouseTracking={false}
                        touchTracking={false}
                        onInitialized={onCarouselInit}
                        onResized={onCarouselResize}
                    />
                )}
            </div>
            <button className={activeSlideClasses.next_btn} onClick={nextClicked}></button>
        </div>
    ) : (
        <div className={commonClasses.multi_empty_container}></div>
    );
}
