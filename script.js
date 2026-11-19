// ===== Menú móvil =====
const menuBoton = document.getElementById("menuBoton");
const nav = document.getElementById("nav");

menuBoton.addEventListener("click", () => {
  const abierto = nav.classList.toggle("abierto");
  menuBoton.setAttribute("aria-expanded", abierto);
});

// Cierra el menú al elegir una opción
nav.querySelectorAll("a").forEach((enlace) => {
  enlace.addEventListener("click", () => {
    nav.classList.remove("abierto");
    menuBoton.setAttribute("aria-expanded", "false");
  });
});

// ===== Formulario de contacto =====
// Nota: no envía datos a ningún servidor, solo valida y muestra un mensaje.
const formulario = document.getElementById("formulario");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault(); // evita que la página se recargue

  const campos = formulario.querySelectorAll("[required]");
  let hayErrores = false;

  campos.forEach((campo) => {
    const vacio = campo.value.trim() === "";
    campo.classList.toggle("invalido", vacio);
    if (vacio) hayErrores = true;
  });

  // Teléfono chileno: acepta +56 9 XXXX XXXX con o sin espacios
  const telefono = formulario.elements["telefono"];
  const soloDigitos = telefono.value.replace(/[\s+\-]/g, "");
  const telefonoValido = /^(56)?9\d{8}$/.test(soloDigitos);
  if (telefono.value.trim() !== "" && !telefonoValido) {
    telefono.classList.add("invalido");
    hayErrores = true;
  }

  if (hayErrores) {
    mensaje.textContent = "Revisa los campos marcados en rojo.";
    mensaje.className = "mensaje error";
    return;
  }

  const nombre = formulario.elements["nombre"].value.trim();
  mensaje.textContent = `Gracias, ${nombre}. Esto es una demo: tu solicitud no fue enviada.`;
  mensaje.className = "mensaje ok";
  formulario.reset();
});
