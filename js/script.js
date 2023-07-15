
//toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () =>{

    if(Array.from(menuIcon.classList).includes('bx-menu')){
        menuIcon.classList.remove('bx-menu')
        menuIcon.classList.add('bx-x');
    }
    else{
        menuIcon.classList.remove('bx-x')
        menuIcon.classList.add('bx-menu');
    }
 
    navbar.classList.toggle('active');
}


//scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top > offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active')
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            })
            //active section for animation
            sec.classList.add('show-animate')
        }else{
            sec.classList.remove('show-animate');
        }
    })
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 300);
    
      menuIcon.classList.remove('bx-x')
      menuIcon.classList.add('bx-menu');
      navbar.classList.remove('active');

      //animation footer

      let footer = document.querySelector('footer');
      footer.classList.toggle('show-animate', (this.innerHeight+this.scrollY >= document.scrollingElement.scrollHeight));
}


