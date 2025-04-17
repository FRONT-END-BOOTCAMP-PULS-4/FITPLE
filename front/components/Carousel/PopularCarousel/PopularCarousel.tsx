import React, { ReactNode, useCallback } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { NextButton, PrevButton, usePrevNextButtons } from './CarouselArrowBtn';
import styles from './page.module.scss';
import Image from 'next/image';

type PropType = {
    slides: ReactNode[]; // 수정: ReactNode 배열로 받음
    options?: EmblaOptionsType;
};

const PopularCarousel: React.FC<PropType> = ({ slides, options }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [AutoScroll({ playOnInit: false })]);

    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

    const onButtonAutoplayClick = useCallback(
        (callback: () => void) => {
            const autoScroll = emblaApi?.plugins()?.autoScroll;
            if (!autoScroll) return;

            const resetOrStop = autoScroll.options.stopOnInteraction === false ? autoScroll.reset : autoScroll.stop;

            resetOrStop();
            callback();
        },
        [emblaApi]
    );

    return (
        <div className={styles.embla}>
            <div className={styles.emblaControls}>
                <Image className={styles.titleImage} src="/images/fire.png" width={20} height={20} alt="fire" />
                <div className={styles.title}>인기글</div>
                <div className={styles.emblaButtons}>
                    <PrevButton onClick={() => onButtonAutoplayClick(onPrevButtonClick)} disabled={prevBtnDisabled} />
                    <NextButton onClick={() => onButtonAutoplayClick(onNextButtonClick)} disabled={nextBtnDisabled} />
                </div>
            </div>
            <div className={styles.emblaViewport} ref={emblaRef}>
                <div className={styles.emblaContainer}>
                    {slides.map((card, index) => (
                        <div className={styles.emblaSlide} key={index}>
                            {card}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularCarousel;
