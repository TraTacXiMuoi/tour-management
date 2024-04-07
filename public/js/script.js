// Slider Tour Detail
const swiperSlider = document.querySelector(".swiperSliderThumb");
if(swiperSlider) {
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
}
// End Slider Tour Detail

// Cart
const cart = localStorage.getItem("cart");
// Khởi tạo giỏ hàng
if(!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
}

// Show thông báo thành công
const alertAddCartSusscess = () => {
  const elementAlert = document.querySelector("[alert-add-cart-susscess]");
  if(elementAlert) {
    elementAlert.classList.remove("alert-hidden");

    setTimeout(() => {
      elementAlert.classList.add("alert-hidden");
    }, 3000);
  }
};

// showMiniCart
const showMiniCart = () => {
  const miniCart = document.querySelector("[mini-cart]");
  if(miniCart) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    miniCart.innerHTML = cart.length;
  }
}
showMiniCart();

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

      alertAddCartSusscess();

      showMiniCart();
    }
  });
}

// End Cart

// Lấy data giỏ hàng in ra giao diện
const tableCart = document.querySelector("[table-cart]");
if(tableCart) {
  fetch("/cart/list-json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: localStorage.getItem("cart")
  })
    .then(res => res.json())
    .then(data => {
      const tours = data.tours;
      const htmls = tours.map((item, index) => {
        return `
          <tr>
            <td>${index + 1}</td>
            <td>
              <img
                src="${item.infoTour.images[0]}"
                alt="${item.infoTour.title}"
                width="80px"
              />
            </td>
            <td>
              <a href="/tours/detail/${item.infoTour.slug}">
                ${item.infoTour.title}
              </a>
            </td>
            <td>
              ${item.infoTour.price_special.toLocaleString()}đ
            </td>
            <td>
              <input type="number" name="quantity" value="${item.quantity}" min="1" item-id="${item.tourId}" style="width: 60px;" />
            </td>
            <td>
              ${item.infoTour.total.toLocaleString()}đ
            </td>
            <td>
              <button class="btn btn-sm btn-danger" btn-delete="${item.tourId}">
                Xóa
              </button>
            </td>
          </tr>
        `;
      });

      const tbody = tableCart.querySelector("tbody");
      tbody.innerHTML = htmls.join("");

      // Tổng tiền
      const totalPrice = tours.reduce((sum, item) => sum + item.infoTour.total, 0);
      const elementTotalPrice = document.querySelector("[total-price]");
      elementTotalPrice.innerHTML = totalPrice.toLocaleString();
    })
}
// Hết Lấy data giỏ hàng in ra giao diện