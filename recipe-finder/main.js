const SEARCH_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const RANDOM_API_URL = 'https://www.themealdb.com/api/json/v1/1/random.php'

const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const resultsGrid = document.getElementById('results-grid')
const messageAerea = document.getElementById('message-area')
const randomButton = document.getElementById('random-button')
const modal = document.getElementById('recipe-modal')
const modalContent = document.getElementById('recipe-details-content')
const modalCloseButton = document.getElementById('modal-close-btn')

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = searchInput.value.trim()

    if (searchTerm) {
        searchRecipes(searchTerm)
    } else {
        showMessage('Please enter a search term', true)
    }
})

async function searchRecipes(query) {
    showMessage(`Searching for "${query}"...`, false, true)

    resultsGrid.innerHTML = ''

    try {
        const response = await fetch(`${SEARCH_API_URL}${query}`)
        if (!response.ok) throw Error('Network error')

        const data = await response.json()
        clearMessage()

        if (data.meals) {
            displayRecipes(data.meals)
        } else {
            showMessage(`No recipes found for "${query}"`)
        }
    } catch (error) {
        showMessage('Something went wrong, Please try again.', true)
    }
}

function showMessage(message, isError = false, isLoading = false) {
    messageAerea.textContent = message

    if (isError) messageAerea.classList.add('error')
    if (isLoading) messageAerea.classList.add('loading')
}

function clearMessage() {
    messageAerea.textContent = ''
    messageAerea.classList = 'message'
}

function displayRecipes(recipes) {
    if (!recipes || recipes.length === 0) {
        showMessage('No recipes to display')
        return
    }

    recipes.forEach((recipe) => {
        const recipeDiv = document.createElement('div')
        recipeDiv.classList.add('recipe-item')

        recipeDiv.innerHTML = `
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" loading="lazy" />
        <h3>${recipe.strMeal}</h3>
        `

        resultsGrid.appendChild(recipeDiv)
    })
}

randomButton.addEventListener('click', getRandomRecipe)

async function getRandomRecipe(e) {
    showMessage('Fetching a random recipe...', false, true)
    resultsGrid.innerHTML = ''

    try {
        const response = await fetch(RANDOM_API_URL)

        if (!response.ok) throw new Error('Something went wrong')
        const data = await response.json()

        clearMessage()

        if (data.meals && data.meals.length > 0) {
            displayRecipes(data.meals)
        } else {
            showMessage(
                'Could not fetch a random recipe, Please try again.',
                true
            )
        }
    } catch (error) {
        showMessage(
            'Failed to fetch a random recipe. Please your connection and try again.',
            true
        )
    }
}

function showModal() {
    modal.classList.remove('hidden')
    document.body.style.overflow = 'hidden'
}

function closeModal() {
    modal.classList.add('hidden')
    document.body.style.overflow = ''
}

resultsGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.recipe-item')

    if (card) {
        getRecipeDetails(1232)
    }
})

async function getRecipeDetails(id) {
    showModal()
}

modalCloseButton.addEventListener('click', closeModal)
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal()
    }
})
