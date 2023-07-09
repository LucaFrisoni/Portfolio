


let menuIcon = document.querySelector("#menu-icon")
let navbar = document.querySelector(".navbar")

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x")
    navbar.classList.toggle("active")
}


// scroll sections

let sections = document.querySelectorAll("section")
let navLinks = document.querySelectorAll("header nav a")

window.onscroll = () =>{

sections.forEach(sec => {
    let top = window.scrollY
    let offset= sec.offsetTop - 100
    let height = sec.offsetHeight
    let id = sec.getAttribute("id")

    if(top >= offset && top < offset + height){
        navLinks.forEach(links =>{
            links.classList.remove("active")
            document.querySelector('header nav a[href*=' + id + ']').classList.add("active")
        })

        sec.classList.add("show-animate")
    }
else{
    sec.classList.remove("show-animate")
}

})



    let header = document.querySelector("header")

    header.classList.toggle("sticky",window.scrollY > 100)

    menuIcon.classList.remove("bx-x")
    navbar.classList.remove("active")
}




const form = document.getElementById('contact-form');

form.addEventListener('submit', function (e) {
  e.preventDefault(); // Evitar el envío predeterminado del formulario

  // Obtener los valores de los campos del formulario
  const fullName = form.querySelector('input[name="fullName"]').value;
const email = form.querySelector('input[name="email"]').value;
const phoneNumber = form.querySelector('input[name="phoneNumber"]').value;
const subject = form.querySelector('input[name="subject"]').value;
const message = form.querySelector('textarea[name="message"]').value;

// Crear el objeto con los datos del formulario
const formData = {
  fullName: fullName,
  email: email,
  phoneNumber: phoneNumber,
  subject: subject,
  message: message
};

  // Enviar los datos del formulario al servidor mediante una solicitud POST
  fetch('https://deploy-back-portfolio.onrender.com/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (response.ok) {
        // El formulario se envió correctamente
        Swal.fire('Enviado', 'El mail con tus datos se ha enviado exitosamente.Te respondere a la brevedad, muchas gracias por contactarte conmigo!', 'success');
        form.reset();
      } else {
        // Hubo un error al enviar el formulario
        Swal.fire('Error', 'Hubo un error al enviar el formulario. Por favor, inténtalo nuevamente más tarde.', 'error');
      }
    })
    .catch(error => {
      console.error('Error al enviar el formulario:', error);
      Swal.fire('Error', 'Hubo un error al enviar el formulario. Por favor, inténtalo nuevamente más tarde.', 'error');
    });
});