window.onload = function(){
//add carrito
    let prodcuto = document.querySelector(' #product')
    let botonComprar = document.querySelector(' #comprar')
    console.log("Script running")
    prodcuto.addEventListener('submit',(e)=>{
        e.preventDefault;
        console.log('Estoy comprando')
    })




//filter button

const filter = document.querySelector("#filter");
filterButton.addEventListener('click', (e) => {
const button = document.querySelector("filtro-button")
const filterButton = document.querySelector("#filterButton");
console.log("hola estoy dentro del boton Filtro ");
if(filter.style.display ==="none"){
filter.style.display = "flex";
filter.style.position = "fixed"
filterButton.style.left = "70%"

console.log("funciono")}
else{
    filter.style.display = "none";
    filterButton.style.left = "0"
}

})


}