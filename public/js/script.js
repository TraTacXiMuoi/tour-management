// Slider Tour Detail
var swiperSliderThumb = new Swiper(".swiperSliderThumb", {
  spaceBetween: 10,
  slidesPerView: 4,
});

var swiperSliderMain = new Swiper(".swiperSliderMain", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiperSliderThumb,
  },
});
// End Slider Tour Detail