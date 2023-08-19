//Github stuff
const profile = document.getElementById('profile')
const projects = document.getElementById('projects')
const cloneRepo = document.getElementById('cloneRepo')

//Modal
const backdrop = document.querySelector('.backdrop')

//Mails
const userName = document.getElementById('userName')
const companyName = document.getElementById('companyName')
const mailAddress = document.getElementById('mailAddress')
const mailMessage = document.getElementById('mailMessage')
const mailButton = document.getElementById('mailButton')

const starsSelect = document.getElementById('starsSelect')

const loader = document.getElementById("preloader")

const closePreLoader = () => {
  loader.style.display = "none"
}

window.addEventListener("load", () => {
  setTimeout(closePreLoader, 2000)
})

//Arrays
let repos = []

const loadProfile = (data) => {
  const stacks = data.bio.split("|")
  console.log(stacks)

  let html = ''
  html += '<div class="profile-info">'

  html += `
    <label class="title">Profile</label>
    <img src="${data.avatar_url}"/>
    <h1>${data.name}</h1>
    <span>
      <i class="fa-solid fa-location-dot"></i>
      <h1>${data.location}</h1>
      <img style="width: 32px" src="src/brazil.png"/>
    </span>
    <h3>${stacks[0]}</h3>
    <h3>Stacks:</h3>
  `

  html += '<div class="arrows">'

  html += '<span class="arrow arrow-left"> < </span>'

  html += '<ul id="stacks" class="stacks">'
  
  for(let i = 1; i < stacks.length; i++) {
    let icons = stacks[i].trim().toLowerCase().replace('.', '')

    if (icons === 'html')
      icons = 'html5'

    if (icons === 'css')
      icons = 'css3'

    if (icons === 'javascript')
      icons = 'js'

    if (icons === 'reactjs')
      icons = 'react'

    if (icons === 'api')
      icons = 'node'

    icons = "fa" + "-" + icons
    //
    html += `
    <li>
      <div class="icon">
        <i class="fa-brands ${icons}"></i>
      </div>
      <span>
        ${stacks[i]}
      </span>
    </li>
    `
  }

  html += '</ul>'

  html += '<span class="arrow arrow-right"> > </span>'

  html += '</div>'

  html += '</div>'

  profile.innerHTML = html

  scroolStacks()
 
}

const copyLink = async (link) => {
  console.log(link)
  navigator.clipboard.writeText(link)
  alert(
    `
      Copiado para área de tranferência!\n
      Link: ${link}
      Abra um terminal git e digite:\n
      git clone "${link}"
    `
  )
}

const toggleModal = (id) => {
  console.log(id)
  // console.log(arrProjects)
  let node = document.getElementById(id)
  let cloneNode = node.cloneNode(true)
  let backdrop = document.querySelector(".backdrop")
  let modal = document.querySelector(".modal")

  backdrop.classList.remove('hide')
  document.body.style.overflow = 'hidden'

  backdrop.addEventListener('click', (e) => {
    if(e.target.className != 'modal') {
      backdrop.classList.add('hide')
      document.body.style.overflow = 'auto'
    }
  })

  let btnShowMore = cloneNode.children[2].children[0]
  btnShowMore.remove()

  let lang = cloneNode.children[0].children[3]
  lang.remove()

  let cardTitle = cloneNode.children[0]
  let cardBody = cloneNode.children[1]
  let cardFooter = cloneNode.children[2]

  console.log(repos)

  console.log(cardTitle)

  let project = repos.filter((repo) => repo.id === id)

  let url = project[0].html_url
  let live = `https://${project[0].owner.login}.github.io/${project[0].name}`
  let haspages = project[0].has_pages
  let description = project[0].description
  let langUrl = project[0].languages_url
  let languages = []

  const loadLang = async () => {
    const req = await fetch(langUrl)
    const data = await req.json()
    console.log(data)
    renderL(Object.keys(data))
  }

  loadLang()

  const bgColor = (color) => {
    if (color === 'javascript')
      return '#eab308'

    if (color === 'html')
      return '#f43f5e'

    if (color === 'css')
      return '#0ea5e9'

    if (color === 'vue')
      return '#10b981'
  }

  const renderL = (languages) => {
    let html = ''
    
    if (languages) {
      html += '<div class="languages">'

      for (let l in languages) {
        let color = languages[l].toLowerCase()
        let language = languages[l]

        html += `
          <li style="background: ${bgColor(color)}">
            ${language}
          </li>
        `
      }

      html += '</div>'
      cardTitle.innerHTML += html 
    }
  }

  if (description) {
    cardBody.innerHTML += `
      <p>${description}</p>
    `
  } else {
    cardBody.innerHTML += `
      <p>Projeto sem descrição 😬</p>`
  }
  
  console.log(languages)



  cardFooter.innerHTML += `
    <div class="btn-group">
      <a href="${url}" target="_blank">
        <button 
          class="btn btn-github"
        >
          Github
        </button>
      </a>
      <a href="${live}" target="_blank">
        <button 
          ${!haspages ? 
              'class="btn-disabled"' 
            : 'class="btn btn-live"'}
          ${!haspages && 'disabled'}
        >
          Live Project
        </button>
      </a>
    <div>
  `
 
  modal.innerHTML = ""
  modal.innerHTML += `
    <span 
      id="modal-close" 
      class="close-icon"
      click="modalClose()"
    >
      <i class="fa fa-times"></i>
    </span>  
  `
  modal.appendChild(cloneNode)
}

const modalClose = () => {
  backdrop.classList.remove('hide')
  document.body.style.overflow = 'hidden' 
}

const getStars = (star) => {
  if (star !== undefined) {
    if (star === '5star')
    return '⭐⭐⭐⭐⭐'

    if (star === '4star')
      return '⭐⭐⭐⭐'

    if (star === '3star')
      return '⭐⭐⭐'

    if (star === '2star')
      return '⭐⭐'

    if (star === '1star')
      return '⭐'
  } else {
    return '--'
  }

}

const starsOrder = (stars) => {    

  //filter array by stars value (works on re-render)
  repos.sort((a, b) => b.stars < a.topics ? 1 : -1)

  let newStars = ''

  if (stars !== '--') {
    let starsNo = stars.substring(0, 1)
    let starsString = stars.substring(1, 6)

    if (parseInt(starsNo) !== 1)
      newStars = starsNo + ' ' + starsString + 's'
    else
      newStars = starsNo + ' ' + starsString
  } else {
    newStars = stars
  }

  let countStars = document.getElementById('countStars')
  countStars.textContent = newStars
}

const loadProjects = async(data) => {
  console.log(data)
  const url = data.repos_url
  const pages = '?&per_page=50'
  const response = await fetch(url + pages)
  repos = await response.json()

  //order by star
  repos.sort((a, b) => b.topics > a.topics ? 1 : -1)

  let html = ''

  html += `
    <label class="title">Projects</label> 
  `

  html += `
    <div id="stars-container" class="select-box">
      <label>Level: </label>
      <select id="starsSelect" disabled>
        <option value="5star">⭐⭐⭐⭐⭐</option>
        <option value="4star">⭐⭐⭐⭐</option>
        <option value="3star">⭐⭐⭐</option>
        <option value="2star">⭐⭐</option>
        <option value="1star">⭐</option>
      </select>
    </div>
    <span class="countStars">
      <label>
        <strong>Filter By:</strong>
      </label>
      <label id="countStars">
        5 stars
      </label>
    </span>
  `

    html += '<div class="project-list">'

  for (let i in repos){
    let projectName = repos[i].name
    let projectImage = 'https://i.ibb.co/GFvs7qq/default.png'
    let cloneUrl = repos[i].clone_url

    if (projectName === 'AgendaJS')
      projectImage = "https://i.ibb.co/FXhDVGr/AgendaJS.png"

    if (projectName === 'flexblog')
      projectImage = "https://i.ibb.co/FJ4sHnr/flexblog.png"

    if (projectName === 'javascriptform')
      projectImage = "https://i.ibb.co/RQGfdD8/javascriptform.png"

    if (projectName === 'JSCalendar')     
      projectImage = "https://i.ibb.co/dGhNKt2/JSCalendar.png"

    if (projectName === 'love-calculator')
      projectImage = "https://i.ibb.co/hcNdHJ5/love-calculator.png"

    if (projectName === 'pizzariaJS')
      projectImage = "https://i.ibb.co/ZcQ46nH/pizzariaJS.png"

    if (projectName === 'pokegenerator')
      projectImage = "https://i.ibb.co/3cX3S6G/pokegenerator.png"

    if (projectName === 'randommeal')
      projectImage = "https://i.ibb.co/K01WLCw/randommeal.png"

    if (projectName === 'ramdompet')
      projectImage = "https://i.ibb.co/6PVSQdF/randompet.png"

    if (projectName === 'reactmonsters')
      projectImage = "https://i.ibb.co/D9bFWN1/reactmonsters.png"

    if (projectName === 'simple-portfolio')
      projectImage = "https://i.ibb.co/x5gsqQv/simple-portfolio.png"

    if (projectName === 'userapi')
      projectImage = "https://i.ibb.co/XL7hf8V/userapi.png"

    if (projectName === 'vuesouls')
      projectImage = "https://i.ibb.co/qrYn3k0/vuesouls.png"

    if (projectName === 'vuesouls')
    projectImage = "https://i.ibb.co/qrYn3k0/vuesouls.png"

    if (projectName === 'beautysalon')
    projectImage = "https://i.ibb.co/7jGkP09/beautysalon.png"

    console.log(repos[i])

    html += `
      <div id="${repos[i].id}" class="card">
        <div class="card-title">
          <h1>${projectName}</h1>
          <div class="project-status">
            <span class="project-visibility">
              <div class="circle"></div>
              <h5>${repos[i].visibility}</h5>
            </span>
            <span 
              id="cloneRepo" 
              onclick="copyLink('${cloneUrl}')"
            >
              <label>Clone Repo</label> 
              <i class="fa-brands fa-git-alt"></i>
            </span>
          </div>
          <span>
            Level: ${getStars(repos[i].topics[0])}
          </span>
          <span class="winnerLang">
            Linguagem mais utilizada: 
            <h5>
              ${repos[i].language}
            </h5>
            <i class="fa fa-trophy"></i>
          </span>
        </div>
        <div class="card-body">
          <a href="${projectImage}" target="_blank">
            <img src="${projectImage}"/>
          </a>
        </div>
        <div class="card-footer">
          <button 
            class="btn btn-primary" 
            id="showMore" 
            onclick="toggleModal(${repos[i].id})"
          >
            Ver Mais
          </button>
        </div>
      </div>
    ` 
  }

  html += '</div>'

  projects.innerHTML = html

  let starsSelect = document.getElementById('starsSelect')

  starsSelect.addEventListener('change', (e) => {
    let value = e.target.selectedOptions[0].value
    starsOrder(value)
  })

  starsSelect.addEventListener('click', (e) => {
    alert('Essa funcionalidade está sendo implementada!')
  })
  
}

const githubData = (data) => {
  loadProfile(data)
  loadProjects(data)
 }

const githubApi = async () => {
  user = 'dezoliveira'
  const response = await fetch(`https://api.github.com/users/${user}`)
  const data = await response.json()
  githubData(data)
}

const scroolStacks = () => {
  const stacks = document.getElementById('stacks')
  const arrows = document.getElementsByClassName('arrow')
  for (let arrow of arrows) {
    arrow.addEventListener('click', (e) => {
      if (arrow.className.includes('left')) {
        stacks.scrollLeft += -50;
        e.preventDefault()
      }

      if (arrow.className.includes('right')) {
        stacks.scrollLeft += 50;
        e.preventDefault()
      }
    })
  }
}

const importantIputs = () => {
  let contact = document.querySelectorAll('#contact label')
  contact.forEach(element => {
    element.style.fontWeight = '700'
    element.innerHTML += '<b>*</b>'
  });
}

const clearForm = () => {
  userName.value = ''
  companyName.value = ''
  mailAddress.value = ''
  mailMessage.value = ''
}

const sendEmail = () => {
  let user = userName.value
  let company = companyName.value
  let mailFrom = mailAddress.value
  let message = mailMessage.value
  let mailTo = "andresoliveira@protonmail.com"

  let body = message

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: 'andresoliveira@protonmail.com',
    Password: '7598DC3DB32C78E8878E631BDCA7016747AF',
    To: mailTo,
    From: 'andresoliveira@protonmail.com',
    Subject: "My Portfolio",
    Body: body
  })
  .then(
    message => alert("Mail sent successfully")
  )
  .then(
    clearForm()
  )
}



mailButton.addEventListener('click', sendEmail)

importantIputs()

githubApi()

