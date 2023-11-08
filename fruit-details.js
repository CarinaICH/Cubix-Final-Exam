export const getFruitInfos = async (fruitName) => {
        const response = await fetch(`https://www.fruityvice.com/api/fruit/${fruitName}`);
        const body = await response.json();
        return body
}

export const getFruitsByCalories = async (minC, maxC) => {
    //if max value is not 0, fetch data with that
    //min can be 0
    if(maxC > 0){
        const response = await fetch(`https://fruityvice.com/api/fruit/calories?min=${minC}&max=${maxC}`);
        const body = await response.json();
        return body
    }
    //if min and max is 0 fetch every fruit
    else {
        const response = await fetch(`https://fruityvice.com/api/fruit/calories?min=${minC}`);
        const body = await response.json();
        return body
    }
}

const fruitNameDiv = document.getElementById('fruit-name-div');
const minMaxCaloriesDiv = document.getElementById('min-max-calories');
const fruitNameRadioButton = document.getElementById('fruit-name-radio');
const caloriesRadioButton = document.getElementById('calories-radio');

export const onFruitNameRadioChange = () => {
    fruitNameRadioButton.classList.add("checked");
    caloriesRadioButton.classList.remove("checked");

    const fruitNameInput = document.getElementById('fruit-name-input').required = true;  

    minMaxCaloriesDiv.style.display = 'none';
    fruitNameDiv.style.display='block';
}

export const onCaloriesRadioChange = () => { 
    caloriesRadioButton.classList.add("checked");
    fruitNameRadioButton.classList.remove("checked");

    const fruitNameInput = document.getElementById('fruit-name-input').required = false;

    fruitNameDiv.style.display='none';
    minMaxCaloriesDiv.style.display = 'block';
}
