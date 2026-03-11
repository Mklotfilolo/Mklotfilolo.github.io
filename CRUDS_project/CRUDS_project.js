/* animation to the website */


window.addEventListener('load',()=>{
    let welcomeCard=document.getElementsByClassName('welcomeCard')[0];
    let welcomeWord=document.getElementsByClassName('welcomeWord')[0];
    setTimeout(()=>{
        welcomeWord.style.opacity='1';
        welcomeWord.style.transform='translateY(0)';
    },300);
    setTimeout(()=>{
        welcomeCard.style.transform='translateY(-100%)'
    },2000);
    
});




/* systme */


let title=document.getElementsByClassName('title')[0];
let price=document.getElementsByClassName('price')[0];
let taxs=document.getElementsByClassName('taxs')[0];
let ads=document.getElementsByClassName('ads')[0];
let discount=document.getElementsByClassName('discount')[0];
let total=document.getElementsByClassName('total')[0];
let count=document.getElementsByClassName('count')[0];
let category=document.getElementsByClassName('category')[0];
let creatButton=document.getElementsByClassName('creatButton')[0];
let tbody=document.getElementsByClassName('tbody')[0];
let deleteAll=document.getElementsByClassName('deleteAll')[0];
//creat locale storage key 


let dataProdcts=[];
if(!localStorage.productsList){
    localStorage.setItem('productsList',JSON.stringify(dataProdcts));
}
else {
    if(localStorage.productsList!=''){
    dataProdcts=JSON.parse(localStorage.productsList);
}
 
}

// get total price

let getTotal= function(){
    if(price.value!=''){
         let resulte= (+price.value+ +taxs.value + +ads.value )- +discount.value;
        total.innerHTML= resulte;
        total.style.background='rgb(3, 209, 13)';
    }
    
    else{
        total.style.background='rgb(182, 2, 50)';
        total.innerHTML='';
    }
}

// create producte



creatButton.onclick= function(){
    if(title.value=='' || price.value==''||category.value=='none' ){
        alert('Please fill in required fields ( title, price ,category) .');
        return;
    }
    let newProducteObject={
        title:title.value,
        price:price.value,
        taxs:taxs.value ||'0',
        ads:ads.value ||'0',
        discount:discount.value ||'0',
        total:total.innerHTML,
        count:count.value ||'1',
        category:category.value,
    }
    if(newProducteObject.count>1){
        for(let i=0;i<newProducteObject.count;i++){
             dataProdcts.push(newProducteObject);
        }
    }else{
        dataProdcts.push(newProducteObject);
    }
   
    console.log(dataProdcts);
    localStorage.setItem('productsList',JSON.stringify(dataProdcts)); 
    clearDataInputs();
    showProducts();
}
 
// cleare data in inputs
function  clearDataInputs(){
    title.value='';
    price.value='';
    taxs.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    total.style.background='rgb(182, 2, 50)';
    category.value='none';
    count.value='';
}

// read data of products


function showProducts(){
    let datashow='';
    for(let i=0;i<dataProdcts.length;i++){
        datashow +=
        '<tr>'+
        '<td>'+( i+1) +'</td>'+
    '<td>' + dataProdcts[i].title + '</td>' +
    '<td>' + dataProdcts[i].price + '</td>' +
    '<td>' + dataProdcts[i].taxs + '</td>' +
    '<td>' + dataProdcts[i].ads + '</td>' +
    '<td>' + dataProdcts[i].discount + '</td>' +
    '<td>' + dataProdcts[i].total + '</td>' +
    '<td>' + dataProdcts[i].count + '</td>' +
    '<td>' + dataProdcts[i].category + '</td>'+
    "<td> <button onclick='updateData("+  i +")' class='buttonUpdate'> Update </button> </td>"+
    "<td> <button class='buttonDelete'onclick='deleteProduct("+ i +")'> Delete </button></td>"
    +'</tr>';
    };

    if(dataProdcts.length>0){
        deleteAll.innerHTML=' <button onclick="deleteAllF()">Delete all ('+ dataProdcts.length +' )</button>';
    }else if(dataProdcts.length==0)  {
        deleteAll.innerHTML=' ';
    }
    
    
    tbody.innerHTML= datashow;
}
showProducts();


// delete product
 function deleteProduct(i){
    dataProdcts.splice(i,1);
    localStorage.setItem('productsList',JSON.stringify(dataProdcts) );
    showProducts();
 }
// delete all products
function deleteAllF(){
    localStorage.clear()
    dataProdcts.splice(0);
    deleteAll.style.display='none';

    showProducts();
}

// update information of prudects 
 function updateData(i) {
    title.value=dataProdcts.title[i];
    price.value=dataProdcts.price[i];
    ads.value=dataProdcts.ads[i];
    discount.value=dataProdcts.discount[i];
    getTotal();
    category.value=dataProdcts.category[i];
    
 }




