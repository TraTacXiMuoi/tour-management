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

// Cart
const cart = localStorage.getItem("cart");
// Khởi tạo giỏ hàng
if(!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
}

// Thêm tour vào giỏ hàng
const formAddToCart = document.querySelector("[form-add-to-cart]");
if(formAddToCart) {
  formAddToCart.addEventListener("submit", (event) => {
    event.preventDefault();
    const tourId = parseInt(formAddToCart.getAttribute("tour-id"));
    const quantity = parseInt(event.target.elements.quantity.value);

    if(tourId && quantity) {
      const cart = JSON.parse(localStorage.getItem("cart"));

      const existTour = cart.find((item) => item.tourId == tourId);

      if(existTour) {
        existTour.quantity = existTour.quantity + quantity;
      } else {
        const data = {
          tourId: tourId,
          quantity: quantity
        };
        cart.push(data);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    }
  });
}

// End Cart