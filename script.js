let texto = document.querySelectorAll(".portifolio-texto");
let backup = [];
let IndexGeral = 0;

texto.forEach((element) => {
  backup.push(element.innerHTML);
  element.innerHTML = "";
});

function colocarRemoverClasses(el, action, ...classes) {
  let cardJobs = document.querySelector(el);
  classes.forEach((classe) => {
    cardJobs.classList[action](classe);
  });
}

function escreverTexto(element, texto, indexText) {
  return new Promise((resolve, reject) => {
    if (indexText < texto.length) {
      element.innerHTML += texto.charAt(indexText);
      indexText++;
      setTimeout(() => escreverTexto(element, texto, indexText).then(resolve), 70);
    } else {
      resolve();
    }
    
    if(indexText == texto.length -1 & IndexGeral == backup.length){
      console.log(indexText)
      colocarRemoverClasses(".text-apresentacao", "add", "scale-out");
      setTimeout(()=>{
        colocarRemoverClasses(".portifolio-trabalhos", "remove", "d-none");
        animacao(".title-card", "scale-in", 500)
        colocarRemoverClasses(".text-apresentacao", "add", "d-none");
      }, 1000)
      
    };
  });
}

async function escreverTextos() {
  for (let i = 0; i < backup.length; i++) {
    IndexGeral++
    await escreverTexto(texto[i], backup[i], 0);
    
  }
}

escreverTextos();


async function animacao (clas, animation, temp) {
  let elementos = document.querySelectorAll(clas);
  for(let i = 0; i < elementos.length; i++) {
    await new Promise((resolve) => {
      setTimeout(() => {
        elementos[i].classList.remove("d-none");
        elementos[i].classList.add(animation);
        console.log(elementos.length)
        if(i == elementos.length -1){
          colocarRemoverClasses("#footer-portifolio", "remove", "portifolio-footer", "position-fixed")
          console.log(i)
          
        }
        resolve();
      }, temp);
    });
  }
}
