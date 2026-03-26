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
let buttonUpdate=document.getElementsByClassName('buttonUpdate')[0];
let deleteAll=document.getElementsByClassName('deleteAll')[0];
let searchProductInput=document.getElementsByClassName('searchIn')[0];
title.focus();


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

// assistant varibles 
let dataProdcts=[];
let mode='create';
let indexUpdate;
let modeOfSearch;
//creat locale storage key 

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
        title:title.value.toLowerCase(),
        price:price.value,
        taxs:taxs.value ||'0',
        ads:ads.value ||'0',
        discount:discount.value ||'0',
        total:total.innerHTML,
        count:count.value ||'1',
        category:category.value.toLowerCase(),
    }
    if(mode==='create'){
        if(newProducteObject.count>1 && newProducteObject.count < 101){
            for(let i=0;i<newProducteObject.count;i++){
                  dataProdcts.push(newProducteObject);
            }
            clearDataInputs();
        }else if(count.value>100){
            alert(' count product showld be under or equal 100 ');
            return;
        }
        else{
            dataProdcts.push(newProducteObject);
        }
    }else if(mode==='update'){
        dataProdcts[indexUpdate]=newProducteObject;
        creatButton.innerHTML='creat';
        count.style.display='block';
        mode='create';
        clearDataInputs();
    }

    localStorage.setItem('productsList',JSON.stringify(dataProdcts)); 
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
    if(!dataProdcts || dataProdcts.length === 0){
        tbody.innerHTML="<tr><td colspan='10' style='text-align: center;font-size:2.5rem;letter-spacing: 1px;font-family:'andalus';'>There are no prodacts to display </td></tr>";
        return;
    }
     
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
    '<td>' + dataProdcts[i].total +' DA </td>' +
    '<td>' + dataProdcts[i].category.toUpperCase() + '</td>'+
    "<td> <button onclick='updateData("+ i +")' class='buttonUpdate'> Update </button> </td>"+
    "<td> <button class='buttonDelete'onclick='deleteProduct("+ i +")'> Delete </button></td>"
    +'</tr>';
    };
    if(dataProdcts.length>0){
        deleteAll.innerHTML=' <button onclick="deleteAllF()">Delete all ('+ dataProdcts.length +' )</button>';
    }else if(dataProdcts.length==0)  {
        deleteAll.innerHTML='';
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
    title.value=dataProdcts[i].title;
    price.value=dataProdcts[i].price;
    ads.value=dataProdcts[i].ads;
    discount.value=dataProdcts[i].discount;
    getTotal();
    category.value=dataProdcts[i].category;
    creatButton.innerHTML='update';
    indexUpdate=i;
    count.style.display='none';
    mode='update';
    scroll({
        top:0,
        behavior:'smooth',
    },100)

 }


// search by category or title Function 
function searchByType(typeOfSearch){
    modeOfSearch=typeOfSearch;
    console.log(modeOfSearch);
    searchProductInput.focus();
    searchProductInput.placeholder=' SEARCH BY '+typeOfSearch.toUpperCase();
    searchProductInput.value='';
    searchProduct();
    showProducts();
}
function  searchProduct(){

    let tableInfo='';
    if(modeOfSearch==='title'){
        for(let i=0;i<dataProdcts.length;i++){
            if(dataProdcts[i].title.includes(searchProductInput.value.toLowerCase())){
                tableInfo+=
                '<tr>'+
        '<td>'+( i+1) +'</td>'+
    '<td>' + dataProdcts[i].title + '</td>' +
    '<td>' + dataProdcts[i].price + '</td>' +
    '<td>' + dataProdcts[i].taxs + '</td>' +
    '<td>' + dataProdcts[i].ads + '</td>' +
    '<td>' + dataProdcts[i].discount + '</td>' +
    '<td>' + dataProdcts[i].total +' DA </td>' +
    '<td>' + dataProdcts[i].category + '</td>'+
    "<td> <button onclick='updateData("+ i +")' class='buttonUpdate'> Update </button> </td>"+
    "<td> <button class='buttonDelete'onclick='deleteProduct("+ i +")'> Delete </button></td>"
    +'</tr>';
            };
            
        }

    }else if(modeOfSearch==='category'){
        for(let i=0;i<dataProdcts.length;i++){
            if(dataProdcts[i].category.includes(searchProductInput.value.toLowerCase())){
                tableInfo+=
                '<tr>'+
        '<td>'+( i+1) +'</td>'+
    '<td>' + dataProdcts[i].title + '</td>' +
    '<td>' + dataProdcts[i].price + '</td>' +
    '<td>' + dataProdcts[i].taxs + '</td>' +
    '<td>' + dataProdcts[i].ads + '</td>' +
    '<td>' + dataProdcts[i].discount + '</td>' +
    '<td>' + dataProdcts[i].total +' DA </td>' +
    '<td>' + dataProdcts[i].category + '</td>'+
    "<td> <button onclick='updateData("+ i +")' class='buttonUpdate'> Update </button> </td>"+
    "<td> <button class='buttonDelete'onclick='deleteProduct("+ i +")'> Delete </button></td>"
    +'</tr>';
            };
            
        }

    }
    tbody.innerHTML= tableInfo;
}


