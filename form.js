import { getFruitInfos,getFruitsByCalories, onFruitNameRadioChange, onCaloriesRadioChange } from './fruit-details';
import { addCard, addCardSearchByCalories } from "./zizi-cards";

const errorMessage = document.getElementById('error-message');
const form = document.getElementById('form');
const submit = document.getElementById('submit');
const loadingContainer = document.getElementById('loading-container');

const fruitNameDiv = document.getElementById('fruit-name-div');
const minAndMaxCaloriesDiv = document.getElementById('min-max-calories');
const fruitNameRadioButton = document.getElementById('fruit-name-radio');
const caloriesRadioButton = document.getElementById('calories-radio');

export const initForm = () => {
    fruitNameRadioButton.addEventListener('change', onFruitNameRadioChange);
    caloriesRadioButton.addEventListener('change', onCaloriesRadioChange);

    form.addEventListener('submit', async e => {
        
        e.preventDefault(); 

        //Show loading indicators when async events happening
        loading();

        //disable submit button while sending request
        submit.disabled = true;

        //if search by fruit name
        if(fruitNameRadioButton.classList.contains('checked')){
            searchByFruitName();
        }
        //if search by calories
        else if(caloriesRadioButton.classList.contains('checked')){
            searchByCalories();
        }
        //if search without selecting
        else {
            showErrorMessage('Please choose an option!');
            submit.disabled = false;
            loadingContainer.removeChild(document.getElementById('lds-ellipsis'));
        }
    })
}

const loading = () => {
    loadingContainer.insertAdjacentHTML('afterbegin', `
        <div id="lds-ellipsis">
        <div><img src="assets/icons8-fruit-48.png" alt="raspberry" /></div>
        <div><img src="assets/icons8-fruit-48.png" alt="raspberry" /></div>
        <div><img src="assets/icons8-fruit-48.png" alt="raspberry" /></div>
        <div><img src="assets/icons8-fruit-48.png" alt="raspberry" /></div>
        </div>` );
}

const searchByFruitName = async () => {
    const fruitNameInputValue = document.getElementById('fruit-name-input').value;
    
    let res = await getFruitInfos(fruitNameInputValue);

    if(res.error =='Not found'){
        fruitNameDiv.style.display='none'
        showErrorMessage(`Choosen fruit (${fruitNameInputValue}) does not exist. Please choose an other!`);
    }
    else if(res.error == "Internal server error"){
        showErrorMessage('Internal server error. Please try later!');
    }
    else{
        addCard(fruitNameInputValue, res.family, res.nutritions.calories, res.nutritions.sugar);
    }
    const fruitNameInput = document.getElementById('fruit-name-input').required = false
    resetElements(fruitNameRadioButton, fruitNameDiv);
}

const searchByCalories = async () => {
    const minCalories = document.getElementById('min-calories').value;
    const maxCalories = document.getElementById('max-calories').value;

    let res = await getFruitsByCalories(minCalories, maxCalories);

    if(res.error == "Internal server error"){
        showErrorMessage('Internal server error. Please try later!');
    }
    else if(res.error == 'No fruits with given nutritional parameter found'){
        showErrorMessage('The maximum calories cannot be less the minimum calories');
    }
    else{
        addCardSearchByCalories(res);
    }
    resetElements(caloriesRadioButton,minAndMaxCaloriesDiv);
}

const showErrorMessage = (message) => {
    errorMessage.style.display = 'block';
    errorMessage.innerText = message;
    setTimeout(() => errorMessage.style.display = 'none', 4000);
}

const resetElements = (radiobutton, div) => {
    form.reset();
    submit.disabled = false;
    loadingContainer.removeChild(document.getElementById('lds-ellipsis'));
    radiobutton.classList.remove("checked");
    div.style.display='none';
}


