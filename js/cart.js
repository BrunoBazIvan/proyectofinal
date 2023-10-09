// URL de la API
const URL_userID = "https://japceibal.github.io/emercado-api/user_cart/25801.json";



// Realiza una solicitud Fetch a la API
fetch(URL_userID)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La solicitud no fue exitosa');
                }
                return response.json();
            })
            .then(data => {
                // Procesa los datos y muestra en pantalla
                const articles = data.articles;
                const cartData = document.getElementById("cart-data");
                cartData.innerHTML = "";
                for (const article of articles) {
                    cartData.innerHTML +=
                    `<div class="container text-center">
                    <div class="row">
                        <div class="col-3">
                        <img src="${article.image}" class="img-thumbnail width=1px alt="${article.name}"</div>
                        <div class ="col">${article.name}</div>
                        <div class="col-6"
                            <label for="cantidad"></label>
                            <input type="number" value="${article.count}" min="1" step="1" id="cantidad"></div>
                         <div class ="col-3">
                            ${article.unitCost} ${article.currency}
                        </div>
                        </div>
                            </div>
                    `;
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });