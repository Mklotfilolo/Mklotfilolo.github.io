let titleLogo= document.getElementsByClassName('titleLogo')[0];

console.log(titleLogo);
window.addEventListener('load',()=>{
    setTimeout(()=>{
        titleLogo.style.letterSpacing='normal';
    titleLogo.style.opacity='1';
    },1000);
})
let knowWidth= window.innerWidth;
console.log(knowWidth);

if(780>=knowWidth){
    let detialsElement=document.createElement('details');
    let summryElement=document.createElement('summary');
    let navBar=document.getElementsByClassName('navBar')[0];
    let navBarElement= document.getElementsByClassName('navBarElement')[0];
    summryElement.innerHTML='&#9776';
    navBarElement.style.flexDirection='column';
    navBarElement.style.position='fixed';
    navBarElement.style.background='#3a3a07';
    navBarElement.style.padding='10px';
    navBarElement.style.right='30px';
    detialsElement.append(navBarElement);
    detialsElement.appendChild(summryElement);
    navBar.append(detialsElement);

}
