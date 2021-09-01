const errDiv = document.getElementById('error');

document.getElementById('submit-btn').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('contain').innerHTML = ''; //ager content sorate
 document.getElementById('show-details').innerHTML ="" //single details gula sorate
document.getElementById('spinner').classList.remove('d-none')
  const inputText = document.getElementById('input-value');
  const inputValue = inputText.value;
  if (inputValue === '') {
    errDiv.innerText = 'Search field cannot be empty.';
    document.getElementById('spinner').classList.add('d-none');
    return
  } else {
    setUrl(inputValue);
    errDiv.innerHTML = '';
  }
  inputText.value = '';
});

const setUrl = (input) => {
  if (input.length === 1) {
    displayData(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`
    );
  } else {
    displayData(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`
    );
  }
};

const displayData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (data.drinks == null) {
    errDiv.innerText = `no product found`;
    document.getElementById('spinner').classList.add('d-none');
  } else {
    showDataDisplay(data.drinks);
  }
};

const showDataDisplay = (foods) => {
  document.getElementById('spinner').classList.add('d-none');
  const contain = document.getElementById('contain');
  foods.forEach((food) => {
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
         <div class="card p-2 text-center">
         <img src="${food.strDrinkThumb}">
         <h5 class="p-1">${food.strDrink}</h5>
         <button class='btn btn-warning ' onclick ="details(${food.idDrink})">Food details </button>
         </div>
        `;
    contain.appendChild(div);
  });
};

const details = async (id) => {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data =await res.json()
  showDetails(data.drinks[0]);
};


const showDetails =(data)=>{
 const showdata = document.getElementById('show-details')
showdata.innerHTML = `
<div  class="">
  <div class="card text-center mx-auto mb-2" style="max-width: 28rem" >
  <img src=" ${data.strDrinkThumb}">
  <div class="card-body">
    <h5 class="card-title">${data.strDrink}</h5>
    <p class="card-text">${data.strInstructions}</p>
    <p> ${data.strCategory}</p>
  </div>
</div>
</div>

 `;
}
