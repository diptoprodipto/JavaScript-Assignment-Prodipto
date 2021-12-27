//======================== Date Picker ==================================//

let input = document.getElementById('input-id');
let hdpkr = new HotelDatepicker(input);



input.addEventListener('afterClose', function () {
    let date = document.getElementById('input-id').value
    let dateVal = date.split(" ");
    const checkin = dateVal[0];
    const checkout = dateVal[2];
    document.getElementById("checkin").innerHTML = "Checkin: "+checkin
    document.getElementById("checkout").innerHTML = "Checkout: "+checkout
}, false);



//======================== Price Slider ==================================//

const rangeInput = document.querySelectorAll(".range-input input"),
priceInput = document.querySelectorAll(".price-input input"),
range = document.querySelector(".slider .progress");
let priceGap = 1000;

priceInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);
        
        if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            }else{
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

        if((maxVal - minVal) < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});

const priceRangeSubmission = () =>{
    document.getElementById("priceRange").innerHTML = "Price range: "+document.getElementById("minRange").value+" - "+document.getElementById("maxRange").value
}


//===================== Guest Number ============================//

const increaseValue = () => {
    let value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;
}
  
const decreaseValue = () => {
    let value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    document.getElementById('number').value = value;
}

const guestValueSubmission = () => {
    document.getElementById('guest').innerHTML = "Guests: "+document.getElementById('number').value
}


//==================================== Search location =============================//

const search = document.getElementById('search')
const matchList = document.getElementById('result')

const showResults = (searchText) => {
    
    fetch("https://www.vacationhomerentals.com/content/srp/saut?s=Las%20vegas", { 
        "method": "GET",
        "mode": "no-cors",
    }).then(function(response) {

        if(response.body === null){
            const data = [{"id":503358,"Name":"Province of Ragusa, Sicily, Italy","Count":51,"SlashName":"italy\/sicily\/province-of-ragusa-vacation-rentals\/g100503358"},{"id":416298,"Name":"Jerusalem, Jerusalem District, Israel","Count":4,"SlashName":"Israel\/Jerusalem-vacation-rentals\/g2579\/"},{"id":407700,"Name":"Jerusalem District, Israel","Count":4,"SlashName":"israel\/jerusalem-district-vacation-rentals\/g100407700"},{"id":686343,"Name":"Marausa, Trapani, Italy","Count":2,"SlashName":"sicily\/province-of-trapani\/trapani\/marausa-vacation-rentals\/g100686343"},{"id":414003,"Name":"Husafell, West Region, Iceland","Count":2,"SlashName":"iceland\/west-region\/husafell-vacation-rentals\/g100414003"},{"id":414006,"Name":"Husavik, Northeast Region, Iceland","Count":2,"SlashName":"iceland\/northeast-region\/husavik-vacation-rentals\/g100414006"},{"id":574074,"Name":"Llanddeusant, Anglesey, United Kingdom","Count":1,"SlashName":"wales\/north-wales\/anglesey\/llanddeusant-vacation-rentals\/g100574074"}]

            let matches = data.filter(searched => {
                const regex = new RegExp(`^${searchText}`, 'gi')
                return searched.Name.match(regex) || searched.SlashName.match(regex)
            })

            if(searchText.length === 0){
                matches = []
                matchList.innerHTML = ''
            }

            outputHtml(matches)
        }
    })
}

const insertVal = event => {
    search.value = event.target.innerText
    matchList.innerHTML = ''
    document.getElementById("searchVal").innerHTML = "Search: "+search.value
}

const outputHtml = (matches) => {
    if(matches.length > 0){
        const html = matches.map(
            match => `

            <div class="card card-body">
                
                <p name="match" onclick="insertVal(event)" style="font-size: 14px; display: inline-block"><i class="fa fa-map-marker" style="display: inline-block"></i> ${match.Name}</p>

            </div>

            `
        ).join('');

        matchList.innerHTML = html
    }
}



search.addEventListener('input', () => showResults(search.value))