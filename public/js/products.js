window.onload = function(){
    let prodcuto = document.querySelector(' #product')
    let botonComprar = document.querySelector(' #comprar')
    console.log("Script running")
    prodcuto.addEventListener('submit',(e)=>{
        e.preventDefault;
        console.log('Estoy comprando')
    })

}