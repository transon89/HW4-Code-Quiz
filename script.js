let sel
let ctdown
let currentQC
let score
let database = [
  {
    q: 'Sir Isaac Newton, undoubtedly one of the greatest scientists of all time, was renowned for his research on gravity, supposedly from observing that falling apple. However, for which other major scientific advances is he also at least partially responsible?',
    c: {
      1: 'Inventing the reflecting telescope.',
      2: 'Development of Calculus.',
      3: 'All of these.',
      4: 'Proving sunlight is comprised of many colors'
    },
    a: 3
  },

  {
    q: 'This talented physicist and chemist made many discoveries regarding magnetism and electricity during the first half of the nineteenth century. One of the most far-reaching developments was his development of a motor powered by electromagnetic fields. Who is this man who has the unit of capacitance named in his honor?',
    c: {
      1: 'Joseph Priestley',
      2: 'Michael Faraday',
      3: 'Antoine Lavoisier',
      4: 'Gerhardus Bochum'
    },
    a: 2
  },

  {
    q: 'Despite being published in 1859, the theory regarding evolution arising from natural selection remains highly controversial in the public arena in the US today. Which Englishman developed his ideas leading to this theory during his voyages on HMS Beagle?',
    c: {
      1: 'Charles Lyell',
      2: 'Robert Hooke',
      3: ' Charles Darwin',
      4: 'Thomas Malthus'
    },
    a: 3
  },

  {
    q: 'The Russian scientist Dmitri Mendeleev is most famous for organizing what information in 1869?',
    c: {
      1: 'Periodic Table of Elements',
      2: 'Balmer Series',
      3: 'Genetic Square (for peas)',
      4: 'Orbital Hybridization Order'
    },
    a: 1
  },

  {
    q: 'Carl Linnaeus, an 18th century Swedish scientist, is known as the Father of Taxonomy for his biological classification methodology. What important contribution did he make?',
    c: {
      1: 'Systematic naming of living organisms',
      2: 'Discovery of the cell',
      3: 'Identification of bacteria',
      4: 'Resolving photosynthesis in plants)'
    },
    a: 1
  }
]

function main () {
  makeQC(database)
  ctdown = 7500
  document.getElementById('time').textContent = Math.floor(ctdown / 100)
  score = 0
  setInterval(function () {
    document.getElementById('time').textContent = Math.floor(ctdown / 100)
    if (ctdown > 0) {
      ctdown--
    } else {
      jump2score()
    }
  }, 10)
}

function makeQC (obj) {
  console.log('dmsg: makeQC')
  sel = generateSelector(obj)
  loadQC(obj, sel)
  document.getElementById('score').textContent = score
}

function generateSelector (obj) {
  console.log('dmsg: generateSelector')
  var n = obj.length
  return Math.floor(
    (window.crypto.getRandomValues(new Uint32Array(2))[0] / 0xffffffff) * n
  )
}

function loadQC (obj, index) {
  console.log('dmsg: loadQC')
  renderQC(obj[index])
  currentQC = obj.splice(index, 1)
}

function renderQC (obj) {
  console.log('dmsg: renderQC')
  console.dir(Object.keys(obj))
  console.log(obj.q)
  console.dir(document.getElementsByTagName('h3'))
  document.getElementById('question').textContent = obj.q
  console.dir(document.getElementsByTagName('h3'))
  document.getElementById('choice').innerHTML = ''
  for (var key in obj.c) {
    var cDiv = document.createElement('div')
    var cBtn = document.createElement('button')
    cBtn.classList.add('btn', 'btn-primary', 'v-left')
    cBtn.id = key
    console.log(key)
    console.dir(obj.c[key])
    cBtn.textContent = obj.c[key]
    document.getElementById('choice').appendChild(cDiv)
    cDiv.appendChild(cBtn)
    console.dir(cBtn)
  }
}

function jump2score () {
  score += ctdown / 5
  ctdown = 0
  window.localStorage.setItem('score', score)
  console.log(window.localStorage.getItem('score'))
  document.location.href = 'scoreboard.html'
}
main()
document.querySelector('#choice').addEventListener('click', function (e) {
  console.log('dmsg: chka')
  var userSel = Number(e.target.id)
  if (userSel === currentQC[0].a) {
    score += 300
    document.getElementById('score').textContent = score
    document.querySelector('.answer').textContent = 'Correct!'
    if (database.length > 0) {
      makeQC(database)
    } else {
      jump2score()
    }
  } else {
    document.querySelector('.answer').textContent = 'Wrong!'
    if (ctdown > 1500) {
      ctdown -= 1500
    } else {
      ctdown = 0
    }
  }
})