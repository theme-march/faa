import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export default function MovingImg({ props }) {
  const swiperTestimonialRef = useRef(null);
  return (
    <div className="container">
      <div className="event-sponors">
        <h3 className="event-title">Event Sponsors:</h3>
        <div className="ak-slider ak-slide-event-sponors">
          <Swiper
            loop={true}
            slidesPerView={"auto"}
            modules={[Autoplay]}
            autoplay={{ delay: 800 }}
            onSwiper={(swiper) => {
              swiperTestimonialRef.current = swiper;
            }}
          >
            {props?.map((item) => (
              <SwiperSlide key={item.id}>
                <img
                  src={`/images/event_sponsors/${item?.image}`}
                  className="ak-bg slider-img"
                  alt="Partner"
                />
              </SwiperSlide>
            ))}
            {props?.map((item) => (
              <SwiperSlide key={item.id}>
                <img
                  src={`/images/event_sponsors/${item?.image}`}
                  className="ak-bg slider-img"
                  alt="Partner"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
