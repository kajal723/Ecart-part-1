
let products = [];

storeData.categories.forEach(function(category) {
    category.subcategories.forEach(function(subcategory) {
        subcategory.products.forEach(function(product) {
            products.push(product);
        });
    });
});

products.sort(function(a, b) {
    return a.price - b.price;
});


function searchProducts() {
    const input = document.getElementById("targetPrice");
    const productList = document.getElementById("productList");

    if (input.value.trim() === "") {
        productList.innerHTML =
            "<p>Please enter a target price.</p>";
        return;
    }

    const targetPrice = Number(input.value);

    if (!Number.isFinite(targetPrice) || targetPrice < 0) {
        productList.innerHTML =
            "<p>Please enter a valid price.</p>";
        return;
    }

   
    let left = 0;
    let right = products.length;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        if (products[mid].price < targetPrice) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    let i = left - 1;
    let j = left;

    let closestProducts = [];

    while (
        closestProducts.length < 3 &&
        (i >= 0 || j < products.length)
    ) {
        if (i < 0) {
            closestProducts.push(products[j]);
            j++;
        } else if (j >= products.length) {
            closestProducts.push(products[i]);
            i--;
        } else {
            let leftDiff = Math.abs(
                products[i].price - targetPrice
            );

            let rightDiff = Math.abs(
                products[j].price - targetPrice
            );

            if (leftDiff <= rightDiff) {
                closestProducts.push(products[i]);
                i--;
            } else {
                closestProducts.push(products[j]);
                j++;
            }
        }
    }

    if (closestProducts.length === 0) {
        productList.innerHTML =
            "<p>No products available.</p>";
        return;
    }

    productList.innerHTML = "";

    closestProducts.forEach(function(product) {
        productList.innerHTML += `
            <div class="product-card">
                <h3>${product.name}</h3>

                <p>Brand: ${product.brand}</p>

                <p class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <p class="rating">
                    ⭐ ${product.rating}
                </p>

                <button onclick="viewProduct('${product.id}')">
                    View Product
                </button>
            </div>
        `;
    });
}

function viewProduct(productId) {
    const product = products.find(function(item) {
        return item.id === productId;
    });

    if (product) {
        alert(
            "Product: " + product.name +
            "\nBrand: " + product.brand +
            "\nPrice: ₹" + product.price.toLocaleString("en-IN") +
            "\nRating: " + product.rating
        );
    }
}

function searchByRange() {
    const minInput = document.getElementById("minPrice");
    const maxInput = document.getElementById("maxPrice");
    const productList = document.getElementById("productList");

    const minPrice = Number(minInput.value);
    const maxPrice = Number(maxInput.value);

    // Validate inputs
    if (
        minInput.value.trim() === "" ||
        maxInput.value.trim() === ""
    ) {
        productList.innerHTML =
            "<p>Please enter both minimum and maximum prices.</p>";
        return;
    }

    if (minPrice < 0 || maxPrice < 0) {
        productList.innerHTML =
            "<p>Prices cannot be negative.</p>";
        return;
    }

    if (minPrice > maxPrice) {
        productList.innerHTML =
            "<p>Minimum price cannot exceed maximum price.</p>";
        return;
    }

    // Find products within the range
    const filteredProducts = products.filter(function(product) {
        return product.price >= minPrice &&
               product.price <= maxPrice;
    });

    // Display results
    productList.innerHTML = "";

    if (filteredProducts.length === 0) {
        productList.innerHTML =
            "<p>No products found in this price range.</p>";
        return;
    }

    filteredProducts.forEach(function(product) {
        productList.innerHTML += `
            <div class="product-card">
                <h3>${product.name}</h3>
                <p>Brand: ${product.brand}</p>
                <p class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>
                <p class="rating">⭐ ${product.rating}</p>

                <button onclick="viewProduct('${product.id}')">
                    View Product
                </button>
            </div>
        `;
    });
}