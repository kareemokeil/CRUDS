// Get elements
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let search = document.getElementById('search');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create'; 
let tmp;

// Get total
function gettotal() {
    if (price.value !== '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = 'rgb(1, 109, 19)'; // Green background when valid
    } else {
        total.style.backgroundColor = 'rgb(109, 1, 1)'; // Red background when invalid
        total.innerHTML = '';
    }
}

// Create product
let datapro = [];

// Load existing data from localStorage if available
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
}

// Handle submit event
submit.onclick = function() {
    let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    };
    if(title.value !=''
        && price.value !=''
        && category.value !=''){
        if (mood === 'create') {
            // Add multiple items based on count
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push({...newpro}); 
                }
            } else {
                datapro.push({...newpro});
            }
        } else {
            // Update existing item
            datapro[tmp] = newpro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        cleardata();
    }
   
    // Save to localStorage and refresh display
    localStorage.setItem('product', JSON.stringify(datapro));
    cleardata();
    showdata();
};

// Clear input fields and reset total display
function cleardata() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    total.style.backgroundColor = 'rgb(109, 1, 1)';
}

// Display data in the table
function showdata() {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `  
        <tr>
            <td>${i + 1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td>
                <button onclick="updatedata(${i})" id="update">Update</button>
            </td>
            <td>
                <button id="delete" onclick="deletedata(${i})">Delete</button>
            </td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
    
    let btndeleteall = document.getElementById('deleteall');
    if (datapro.length > 0) {
        // Display "Delete All" button with product count
        btndeleteall.innerHTML = `<button id="deleteall" onclick="deleteAll()">Delete All (${datapro.length})</button>`;
    } else {
        btndeleteall.innerHTML = '';
    }
}

// Delete product by index
function deletedata(i) {
    datapro.splice(i, 1);
    localStorage.setItem('product', JSON.stringify(datapro)); 
    showdata();
}

// Delete all products
function deleteAll() {
    datapro = []; 
    localStorage.clear();
    showdata();
}

// Update product data
function updatedata(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    gettotal();
    count.style.display = 'none'; // Hide count during update
    category.value = datapro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth",
    });
}

// Search functionality
let searchmood = 'title';
function getsearchmood(id){
    let search = document.getElementById('search');
    if( id == 'searchtitle'){
        searchmood = 'title';
        search.placeholder = 'search by title';
    } else{
        searchmood = 'category'; 
        search.placeholder = 'search by category';

    }
    search.focus();
    console.log(`Search mode: ${searchmood}`);
}

function searchdata(value){
    let table = '';
    for( let i = 0 ; i < datapro.length; i++){
        if(searchmood === 'title' && datapro[i].title.toLowerCase().includes(value.toLowerCase())){
            table += `
            <tr>
                <td>${i + 1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td>
                    <button onclick="updatedata(${i})" id="update">Update</button>
                </td>
                <td>
                    <button id="delete" onclick="deletedata(${i})">Delete</button>
                </td>
            </tr>`;
        } else if(searchmood === 'category' && datapro[i].category.toLowerCase().includes(value.toLowerCase())){
            table += `
            <tr>
                <td>${i + 1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td>
                    <button onclick="updatedata(${i})" id="update">Update</button>
                </td>
                <td>
                    <button id="delete" onclick="deletedata(${i})">Delete</button>
                </td>
            </tr>`;
        }
    }
    document.getElementById('tbody').innerHTML = table;
}



// Initial display of data
showdata();
