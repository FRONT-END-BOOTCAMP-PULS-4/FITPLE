import React from 'react';
import { Carousel } from 'antd';
import styles from './Banner.module.scss';

const Banner: React.FC = () => (
  <Carousel autoplay autoplaySpeed={2000} className={styles.banner}>
    <div className={styles.imageBox}>
      <img src='/images/banner1.png' />
    </div>
    <div className={styles.imageBox}>
      <img src='/images/banner2.png' />
    </div>
    <div className={styles.imageBox}>
      <img src='/images/banner3.png' />
    </div>
    <div className={styles.imageBox}>
      <img src='/images/banner4.png' />
    </div>
  </Carousel>
);

export default Banner;