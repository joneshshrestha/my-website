const _CONTENT = [
  'develop AI models',
  'train neural networks',
  'build machine learning systems',
]

// Current sentence being processed
var _PART = 0

// Character number of the current sentence being processed
var _PART_INDEX = 0

// Holds the handle returned from setInterval
var _INTERVAL_VAL

// Element that holds the text
var _ELEMENT = document.querySelector('#text')

// Cursor element
var _CURSOR = document.querySelector('#cursor')

// Implements typing effect
const Type = () => {
  // Get substring with 1 character added
  var text = _CONTENT[_PART].substring(0, _PART_INDEX + 1)
  _ELEMENT.innerHTML = text
  _PART_INDEX++

  // If full sentence has been displayed then start to delete the sentence after some time
  if (text === _CONTENT[_PART]) {
    // Hide the cursor
    _CURSOR.style.display = 'inline-block'

    clearInterval(_INTERVAL_VAL)
    setTimeout(function () {
      _INTERVAL_VAL = setInterval(Delete, 110)
    }, 2000)
  }
}

// Implements deleting effect
const Delete = () => {
  // Get substring with 1 character deleted
  var text = _CONTENT[_PART].substring(0, _PART_INDEX - 1)
  _ELEMENT.innerHTML = text
  _PART_INDEX--

  // If sentence has been deleted then start to display the next sentence
  if (text === '') {
    clearInterval(_INTERVAL_VAL)

    // If current sentence was last then display the first one, else move to the next
    if (_PART == _CONTENT.length - 1) _PART = 0
    else _PART++

    _PART_INDEX = 0

    // Start to display the next sentence after some time
    setTimeout(() => {
      _CURSOR.style.display = 'inline-block'
      _INTERVAL_VAL = setInterval(Type, 110)
    }, 200)
  }
}

// Start the typing effect on load
_INTERVAL_VAL = setInterval(Type, 100)
