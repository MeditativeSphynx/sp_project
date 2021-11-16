var searchBtn = document.querySelector('button')
var searchInput = document.querySelector('input')
var resultsDIV = document.querySelector('#results')
var activationCodeLabel = document.querySelector('#activation-code-label')
var sourceLabel = document.querySelector('#source-label')
var siblingUL = document.querySelector('#sibling-code-list')
var loadMoreBtn = document.querySelector('#load-more-btn')
var searchValidation = document.querySelector('#search-validation')
var activationCodeItems = 'undefined'

// Search button event to GET the data from the API
searchBtn.addEventListener('click', function() {
    var ACTIVATION_CODE = searchInput.value
    var isValid = validateSearch()
    if (isValid) {
        purgeSiblings()
        $.get(`https://fyb-activation.samaritanspurse.org/api/fyb/${ACTIVATION_CODE}/siblings`, function(data) {
            if (data !== undefined) {
                formatResults(data)
            } else {
                throwInvaldation()
            }
        })
    }
})

// Load More Button Click Event
loadMoreBtn.addEventListener('click', function() {
    var maxItems = 5
    var siblingHiddenIL = document.querySelectorAll('#sibling-code-list > li.hidden')
    if (siblingHiddenIL.length > 0) {
        siblingHiddenIL.forEach((item, index) => {
            if (index < maxItems) {
                item.classList.remove('hidden')
            }
        })
    } else {
        alert('No more sibling codes to display.')
    }
})

/* Onclick event for sibling code list items.
 *
 * When an list item is clicked, that code will be placed within the search
 * input field. As an indication that the input field was filled in, it will 
 * then scroll the search input field into view.
 */
function activationCodeItemsEvent(e) {
    e.preventDefault()
    var code = e.target.getAttribute('data-code')
    console.log('clicked', e.target.getAttribute('data-code'))
    searchInput.value = code
    searchInput.scrollIntoView()
}

// Creates and formats the data within the sibling code list.
function formatResults(data) {
    activationCodeLabel.innerHTML = data.activationCode
    sourceLabel.innerHTML = data.source

    for (var i = 0; i < data.siblingCodes.length; i++) {
        var sibCodeLI = document.createElement('LI')
        var sibCodeDIV = document.createElement('DIV')
        var sibCodeA = document.createElement('A')
        var sibSourceP = document.createElement('P')
        
        sibSourceP.innerHTML = data.siblingCodes[i].source
        sibCodeDIV.classList.add('item-card')

        if (i > 4) {
            sibCodeLI.classList = "hidden"
        }

        sibCodeA.innerHTML = data.siblingCodes[i].activationCode
        sibCodeA.setAttribute('href', `#${data.siblingCodes[i].activationCode}`)
        sibCodeA.setAttribute('onclick', 'activationCodeItemsEvent(event)')
        sibCodeA.setAttribute('data-code', data.siblingCodes[i].activationCode)
        sibCodeA.classList.add('activation-code-item')

        sibCodeDIV.appendChild(sibCodeA)
        sibCodeDIV.appendChild(sibSourceP)

        sibCodeLI.appendChild(sibCodeDIV)
        siblingUL.appendChild(sibCodeLI)
    }

    resultsDIV.classList.remove('hidden')
    activationCodeItems = document.querySelectorAll('#activation-code-item')
}

// Purges the sibling list.
function purgeSiblings() {
    siblingUL.innerHTML = ''
}

function validateSearch() {
    var re = /^[A-Za-z0-9]+$/
    if (searchInput.value.match(re) && searchInput.value.length < 10) {
        if (searchValidation.style.display !== 'none') {
            searchValidation.style.display = 'none'
        }
        return true
    } else {
        throwInvaldation()
        return false
    }
}

function throwInvaldation() {
    searchValidation.classList.remove('hidden')
    searchValidation.style.display = 'block'
}
