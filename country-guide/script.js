const searchBtn = document.getElementById('search-btn')
const countryInp = document.getElementById('country-inp')

countryInp.addEventListener('keypress', (e) => {
    console.log(e)
    if (e.key === 'Enter') {
        getData(countryInp.value)
    }
})
searchBtn.addEventListener('click', () => getData(countryInp.value))
class Add {
    get() {}
}
function getData(countryName) {
    result.innerHTML = '<h2>Loading...</h2>'
    const finalUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`

    fetch(finalUrl)
        .then((response) => response.json())
        .then((data) => {
            result.innerHTML = `
                <img class='flag-img' src='${data[0].flags.svg}'>
                <h2>${data[0].name.common}</h2>
                <div class='wrapper'>
                    <div class='data-wrapper'>
                        <h4>Capital:</h4>
                        <span>${data[0].capital[0]}</span>
                    </div>
                </div>
                <div class='wrapper'>
                    <div class='data-wrapper'>
                        <h4>Continent:</h4>
                        <span>${data[0].continents[0]}</span>
                    </div>
                </div>
                <div class='wrapper'>
                    <div class='data-wrapper'>
                        <h4>Population:</h4>
                        <span>${data[0].population}</span>
                    </div>
                </div>
                <div class='wrapper'>
                    <div class='data-wrapper'>
                        <h4>Currency:</h4>
                        <span>${
                            data[0].currencies[Object.keys(data[0].currencies)]
                                .name
                        } - ${Object.keys(data[0].currencies)[0]}</span>
                    </div>
                </div>
                <div class='wrapper'>
                    <div class='data-wrapper'>
                        <h4>Common Languages:</h4>
                        <span>${Object.values(data[0].languages)
                            .toString()
                            .split(',')
                            .join(', ')}</span>
                    </div>
                </div>
            `
        })
        .catch((error) => {
            if (countryName.length == 0) {
                result.innerHTML = `
                    <h3>The input field connot be empty</h3>
                `
            } else {
                result.innerHTML = `
                    <h3>${error}</h3>
                `
            }
        })
}
