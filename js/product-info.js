/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
    'use strict';
  
    const getStoredTheme = () => localStorage.getItem('theme');
    const setStoredTheme = theme => localStorage.setItem('theme', theme);
  
    const getPreferredTheme = () => {
      const storedTheme = getStoredTheme();
      if (storedTheme) {
        return storedTheme;
      }
  
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  
    const setTheme = theme => {
      if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-bs-theme', theme);
      }
    }
  
    setTheme(getPreferredTheme());
  
    const showActiveTheme = (theme, focus = false) => {
      const themeSwitcher = document.querySelector('#bd-theme');
  
      if (!themeSwitcher) {
        return;
      }
  
      const themeSwitcherText = document.querySelector('#bd-theme-text');
      const activeThemeIcon = document.querySelector('.theme-icon-active use');
      const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);
      const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href');
  
      document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
        element.classList.remove('active');
        element.setAttribute('aria-pressed', 'false');
      });
  
      btnToActive.classList.add('active');
      btnToActive.setAttribute('aria-pressed', 'true');
      activeThemeIcon.setAttribute('href', svgOfActiveBtn);
      const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
      themeSwitcher.setAttribute('aria-label', themeSwitcherLabel);
  
      if (focus) {
        themeSwitcher.focus();
      }
    }
  
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== 'light' && storedTheme !== 'dark') {
        setTheme(getPreferredTheme());
      }
    });
  
    window.addEventListener('DOMContentLoaded', () => {
      showActiveTheme(getPreferredTheme());
  
      document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value');
          setStoredTheme(theme);
          setTheme(theme);
          showActiveTheme(theme, true);
        });
      });
    });
  })();
  
  /*Aca termina dark and light*/




document.addEventListener("DOMContentLoaded", async () => {
  
  const productID = localStorage.getItem("Product");
  const productInfo = document.getElementById("product-info");
  const respondeID = await getJSONData(
      PRODUCT_INFO_URL + productID + EXT_TYPE
      // Aprovecho que ya estan los datos en init y 
      // pido que me de el url de productos y el tipo de extension 
  ); 

      let product = respondeID.data;
          // Pido los datos del json en este caso los datos de productos

          productInfo.innerHTML = `
          <div id="name">
          <h1 class="titulo">${product.name}<h1>
          </div>
        
          <div class="info"> 
          <div id="imageBg" class="ImageBg">
          </div>
          <div class="image" id="image">
          </div>
          <div id="informacion">
          
          <p class="title">
          <span style="font-weight: bold;">
          </span> ${product.description}
          </p>
          <p class="title">
          <span style="font-weight: bold;">
          Categoría</span><br> ${product.category}
          </p>
          <p class="title">
          <span style="font-weight: bold;">
          Cantidad de vendidos</span><br> ${product.soldCount}</p>
          <p class="title" id="precioProducto">

          ${product.currency}:${product.cost}
          </p>
              <div class="botonCarrito">
                  <button class="btnCarro">
                  Añadir al carrito
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                  </svg>
                  </button>
              </div>
          </div>
        </div>
      </div>
      `
      const imageContainer = document.getElementById("image");
      const imagenes = product.images;
      

      //Aca me carga cada imagen del indice
      imagenes.forEach((image, index) => {
          let indiceImage = 0;
          let img = document.createElement("img");
          img.src = image;
          img.id = `image-${index}`;
          img.classList.add("image-grid");
          imageContainer.appendChild(img);

          // Creo un evento que al hacer click me muestre el contenido interno
          // de cada producto
          img.addEventListener("click", () =>{
              indiceImage = index;
              showImage();
          });
      });

      // Hacer una solicitud a la API
const Comments_URL = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;
fetch(Comments_URL)
    .then(response => response.json())
    .then(comments => {
        // Iterar a través de los comentarios y mostrarlos en la página
        const comentariosDiv = document.getElementById('comment-list');
        comments.forEach(comentario => {
            const comentarioElement = document.createElement('li');
            // intentar hacer los score a star const stars = nombre_function(comentario.score)
            
            comentarioElement.innerHTML = `
                <p><strong>${comentario.user}</strong> ${comentario.dateTime} - ${comentario.score}</p>
                <p><strong>Comentario:</strong> ${comentario.description}</p>
               
            `;
            comentariosDiv.appendChild(comentarioElement);
        });
    })
    .catch(error => {
        console.error('Error al obtener comentarios:', error);
    });
    
}) 


// cambio de estrellas al hacer click en ellas
var starLabels = document.querySelectorAll('.stars label');
var selectedRating = document.getElementById('selected-rating');
var ratingInput = document.getElementById('rating');

starLabels.forEach((label, index) => {
    label.addEventListener('click', () => {
        // Cambiar la clase para mostrar la estrella llena o vacía
        for (let i = 0; i < starLabels.length; i++) {
            if (i <= index) {
                starLabels[i].classList.add('fas', 'fa-star-filled');
                starLabels[i].classList.remove('fa-star-empty');
            } else {
                starLabels[i].classList.add('fa-star-empty');
                starLabels[i].classList.remove('fas', 'fa-star-filled');
            }
        }

        // Actualizar el valor 
        ratingInput.value = index + 1;

        // Actualizar el número de estrellas seleccionadas
        selectedRating.textContent = index + 1;
    });
});

// envío del formulario al servidor
document.getElementById('comment-form').addEventListener('submit', function(event) {
event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener los valores del comentario y la puntuación
    var comment = document.getElementById('comment').value;
    var rating = ratingInput.value;

    
    let message = '';
    if (rating >= 5) {
        message = '¡Extraordinario!';
    }else if (rating >= 4) {
        message = '¡Excelente Producto!';
    } else if (rating >= 3) {
        message = 'Buen producto';
    } else if (rating >= 2) {
        message = 'Aceptable';
    } else if (rating >= 1) {
        message = 'Malo';
    }

// Mostrar el mensaje
document.getElementById('message').textContent = message;

const user = localStorage.getItem('user');
// Comprobar si el nombre de usuario existe en localStorage
if (user) {
  // Crear un nuevo comentario con la puntuación
  const newComment = document.createElement('div');
  newComment.classList.add('comentario');
  newComment.innerHTML = `
    <strong>${user}</strong> - ${new Date().toLocaleString()}<br>
    Puntuación: ${rating} ${message}<br>
    Comentario:${comment}
  `;

  // Agrega el nuevo comentario a la lista de comentarios existentes
  const comentariosDiv = document.getElementById('comentarios');
  comentariosDiv.appendChild(newComment);

} else {  // Usuario no registrado
    alert('Debes estar registrado para realizar comentarios');
  
}

// Limpia el formulario después del envío 
document.getElementById('comment').value = '';
ratingInput.value = '0';
selectedRating.textContent = '0';
starLabels.forEach(label => {
    label.classList.remove('fa-star');
    label.classList.add('fa-star-empty');
});
})

