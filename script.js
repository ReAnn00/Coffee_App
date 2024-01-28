// Get points element
let allPointsElement = document.getElementById("points");
let allPointsValue = Number(allPointsElement.getAttribute("data-value"));
console.log(allPointsValue);

// Get card-points element
let cartPointsElement = document.getElementById("card-points");
let cartPoints = Number(cartPointsElement.getAttribute("data-value"));
console.log(cartPoints);

// Shopping-cart
let shoppingCart = document.getElementById("shopping-cart");
let cartItems = Number(shoppingCart.getAttribute("data-value"));
console.log(cartItems);

let cart = document.querySelector("#menu .items");

// Update points and cart items function
function updatePointsAndCart() {
  if (allPointsValue >= cartPoints) {
    allPointsValue -= cartPoints;
    cartItems += 1;

    // Update points element
    allPointsElement.textContent = allPointsValue;
    shoppingCart.textContent = cartItems;

    // You can update the cart display or perform any other necessary actions here
    console.log(
      "Used coupon. Updated points: " +
        allPointsValue +
        ", Cart items: " +
        cartItems
    );

    if (cartItems === 0) {
      cart.style.display = "none";
    } else {
      cart.style.display = "flex";
    }
  } else {
    showAlert("Not enough points to use the coupon.", 'error');
  }
}

let useCouponButton = document.querySelector(".card-footer .button button");

// Add click event to the "UŻYJ KUPONU" button
useCouponButton.addEventListener("click", function () {
  // Sprawdź, czy moc kawy została wybrana
  let selectedCoffeeElement = document.querySelector(
    '.button-container button i.gg-coffee[selected="true"]'
  );

  if (!selectedCoffeeElement) {
    showAlert("Wybierz moc kawy przed użyciem kuponu.", 'warning');
    return;
  }

  if (allPointsValue >= cartPoints) {
    // Check if there are enough points to use a coupon
    updatePointsAndCart();
  } else {
    showAlert("Nie masz wystarczająco punktów do użycia kuponu.", 'error');
  }
});

let coffeeButtons = document.querySelectorAll('.button-container button i.gg-coffee');
let coffeeElements = document.querySelectorAll('.button-container button i.gg-coffee');

// Add event handlers for each coffee button
coffeeButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    // Get the button's parent (i.e. <button>)
    let parentButton = button.closest('button');

    // Get the value of the data-power attribute
    let dataPower = parseInt(button.getAttribute('data-power'), 10);

    // Set the "selected" attribute and background color for the appropriate number of i.gg-coffee elements
    coffeeElements.forEach(function (coffeeElement, index) {
      let isSelected = index < dataPower;
      coffeeElement.setAttribute('selected', isSelected ? 'true' : 'false');
      coffeeElement.style.backgroundColor = isSelected ? '#312722' : 'transparent';
    });
  });
});

// Define showAlert function after the other code
function showAlert(message, type = 'info') {
  Swal.fire({
    icon: type,
    title: '',
    text: message,
    confirmButtonText: 'OK',
    confirmButtonColor: '#D74D00',
  });
}
