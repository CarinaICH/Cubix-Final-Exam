import 'zizi-card';

const ziziCardsContainer = document.getElementById('zizi-cards-container');

//add card if search by fruit name
export const addCard = (fruitname, Ffamily, Fcalories, Fsugar) => {

    const family = Ffamily;
    const calories = Fcalories;
    const sugar = Fsugar;

    if(ziziCardsContainer.innerHTML!=''){
        ziziCardsContainer.innerHTML=''
    }
    ziziCardsContainer.innerHTML+= `
    <zizi-card id="zizi"  >
        <h1>${fruitname.toLowerCase()}</h1>
        <div  class="card-content">
            <div> Family:  <span>${family}</span> </div>
            <div> Calories: <span> ${calories} </span> g/100g</div>
            <div> Sugar:   <span>${sugar} </span> g/100g</div>
        </div>
    </zizi-card>
    `
}

//add card if search by min and max calories
export const addCardSearchByCalories = (res) => {
    const response = res

    if(ziziCardsContainer.innerHTML!=''){
        ziziCardsContainer.innerHTML=''
    }
    //if empty add the results of the search
    for(let i = 0; i < response.length; i++){
        ziziCardsContainer.innerHTML+= `
            <zizi-card id="zizi"  >
                <h1>${response[i].name.toLowerCase()}</h1>
                <div  class="card-content">
                    <div> Calories: <span> ${response[i].nutritions.calories} </span>g/100g</div>
                </div>
            </zizi-card>
            `
    }
}