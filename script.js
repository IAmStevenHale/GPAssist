commonWords = [
  'i',
  'word',
  'a',
  'about',
  'after',
  'all',
  'also',
  'an',
  'and',
  'any',
  'as',
  'at',
  'back',
  'be',
  'because',
  'but',
  'by',
  'can',
  'come',
  'could',
  'day',
  'do',
  'even',
  'first',
  'for',
  'from',
  'get',
  'give',
  'go',
  'good',
  'has',
  'have',
  'he',
  'her',
  'him',
  'his',
  'how',
  'if',
  'in',
  'into',
  'is',
  'it',
  'its',
  'just',
  'know',
  'like',
  'look',
  'make',
  'me',
  'most',
  'my',
  'new',
  'no',
  'not',
  'now',
  'of',
  'on',
  'one',
  'only',
  'or',
  'other',
  'our',
  'out',
  'over',
  'people',
  'say',
  'see',
  'she',
  'so',
  'some',
  'take',
  'than',
  'that',
  'the',
  'their',
  'them',
  'then',
  'there',
  'these',
  'they',
  'think',
  'this',
  'time',
  'to',
  'two',
  'up',
  'us',
  'use',
  'want',
  'way',
  'we',
  'well',
  'what',
  'when',
  'which',
  'who',
  'will',
  'with',
  'work',
  'would',
  'year',
  'you',
  'your',
  '~',
  '`',
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '_',
  '-',
  '+',
  '=',
  '{',
  '}',
  '[',
  ']',
  '|',
  ':',
  ';',
  '<',
  ',',
  '>',
  '.',
  '?',
  '/',
  'aboard',
  'about',
  'above',
  'absent',
  'across',
  'after',
  'against',
  'along',
  'alongside',
  'amid',
  'amidst',
  'among',
  'anti',
  'around',
  'as',
  'at',
  'atop',
  'before',
  'behind',
  'below',
  'beneath',
  'beside',
  'besides',
  'between',
  'beyond',
  'but',
  'by',
  'concerning',
  'considering',
  'despite',
  'down',
  'during',
  'except',
  'excepting',
  'excluding',
  'following',
  'for',
  'from',
  'in',
  'infrontof',
  'inside',
  'insteadof',
  'into',
  'like',
  'mid',
  'minus',
  'near',
  'next',
  'of',
  'off',
  'on',
  'onto',
  'ontopof',
  'opposite',
  'outof',
  'outside',
  'over',
  'past',
  'per',
  'plus',
  'regarding',
  'round',
  'save',
  'since',
  'than',
  'through',
  'till',
  'times',
  'to',
  'toward',
  'towards',
  'under',
  'underneath',
  'unlike',
  'until',
  'up',
  'upon',
  'versus',
  'via',
  'with',
  'within',
  'without',
  'all',
  'another',
  'any',
  'anybody',
  'anyone',
  'anything',
  'both',
  'each',
  'eachother',
  'either',
  'everybody',
  'everyone',
  'everything',
  'few',
  'he',
  'her',
  'hers',
  'herself',
  'him',
  'himself',
  'his',
  'i',
  'it',
  'its',
  'itself',
  'little',
  'many',
  'me',
  'mine',
  'more',
  'most',
  'much',
  'my',
  'myself',
  'neither',
  'nobody',
  'none',
  'noone',
  'nothing',
  'one',
  'oneanother',
  'other',
  'others',
  'our',
  'ours',
  'ourselves',
  'several',
  'she',
  'some',
  'somebody',
  'someone',
  'something',
  'that',
  'their',
  'theirs',
  'them',
  'themselves',
  'these',
  'they',
  'this',
  'those',
  'us',
  'we',
  'what',
  'whatever',
  'which',
  'whichever',
  'who',
  'whoever',
  'whom',
  'whomever',
  'whose',
  'you',
  'your',
  'yours',
  'yourself',
  'yourselves',
]

function rakeFilter(notes) {
  let myArray = notes.split(' ')
  let newArray = []
  for (let i = 0; i < myArray.length; i++) {
    if (!commonWords.includes(myArray[i])) {
      newArray.push(myArray[i])
    }
  }
  GPAssist(newArray)
  return newArray
}

function GPAssist(arr) {
  let newArray = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < data.MBS_XML.Data.length; j++) {
      if (data.MBS_XML.Data[j].Description.includes(arr[i])) {
        newArray.push(data.MBS_XML.Data[j])
      }
    }
  }
  let distinctMBS = [...new Set(newArray)]
  addMBSElements(distinctMBS)
  return distinctMBS
}

function addMBSElements(arr) {
  var p = document.createElement('p')
  p.innerHTML = '<strong>MBS Matches: </strong>' + arr.length
  p.id = 'countText'

  document.getElementById('totalCount').appendChild(p)

  for (var i = 0; i < arr.length; i++) {
    // Create DOM element
    var li = document.createElement('li')
    // Set text of element
    li.innerHTML =
      '<strong>' +
      arr[i].ItemNum +
      '</strong><br />' +
      benefitSearch(arr[i]) +
      '<br />' +
      arr[i].Description +
      "<span class='close noselect'>&times;</span>"

    // Append this element to its parent
    document.getElementById('listcontent').appendChild(li)
    addClose()
  }
}

function addClose() {
  var closebtns = document.getElementsByClassName('close')

  for (var i = 0; i < closebtns.length; i++) {
    closebtns[i].addEventListener('click', function () {
      this.parentElement.style.display = 'none'
      recount()
    })
  }
}

function recount() {
  const listContent = document
    .getElementById('listcontent')
    .getElementsByTagName('li')

  let count = 0
  for (var i = 0; i < listContent.length; i++) {
    if (listContent[i].style.display !== 'none') {
      count++
    }
  }

  document.getElementById('countText').innerHTML =
    '<strong>MBS Matches: </strong>' + count
}

function benefitSearch(MBSItem) {
  let benefits = ''
  for (var i = 0; i <= 100; i++) {
    let searchField = 'Benefit' + i
    let found = MBSItem[searchField]
    if (found !== undefined) {
      benefits += '<strong>Benefit ' + i + '%: </strong>' + found + '<br />'
    }
  }
  return benefits
}
