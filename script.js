const profile = document.getElementById('profile')
const projects = document.getElementById('projects')

const loadProfile = (data) => {
  const stacks = data.bio.split("|")
  console.log(stacks)

  let html = ''
  html += '<div class="profile-info">'

  html += `
    <label class="title">Profile</label>
    <img src="${data.avatar_url}"/>
    <h1>${data.name}</h1>
    <h3>Git: ${data.html_url}<h3>
    <span>
      <i class="fa-solid fa-location-dot"></i>
      <h1>${data.location}</h1>
      <img style="width: 32px" src="src/brazil.png"/>
    </span>
    <h3>${stacks[0]}</h3>
    <h3>Stacks:</h3>
  `

  html += '<ul class="stacks">'
  
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

  html += '</div>'

  profile.innerHTML = html
 
}

const loadProjects = async(data) => {
  console.log(data)
  const url = data.repos_url
  const response = await fetch(url)
  const repos = await response.json()

  let html = ''

  html += '<div class="projects">'

  html += `
   <label class="title">Projects</label> 
  `

  for (let i in repos){
    let projectName = repos[i].name
    let projectImage = 'https://i.ibb.co/GFvs7qq/default.png'

    if (projectName === 'AgendaJS')
      projectImage = "https://i.ibb.co/FXhDVGr/AgendaJS.png"

    if (projectName === 'flexblog')
      projectImage = "https://i.ibb.co/FJ4sHnr/flexblog.png"

    if (projectName === 'javacriptform')
      projectImage = "https://i.ibb.co/RQGfdD8/javascriptform.png"

    if (projectImage === 'JSCalendar')     
      projectImage === "https://i.ibb.co/dGhNKt2/JSCalendar.png"

    if (projectName === 'love-calculator')
      projectImage = "https://i.ibb.co/hcNdHJ5/love-calculator.png"

    if (projectName === 'pizzaria-JS')
      projectImage = "https://i.ibb.co/ZcQ46nH/pizzaria-JS.png"

    if (projectName === 'pokegenarator')
      projectImage = "https://i.ibb.co/3cX3S6G/pokegenerator.png"

    if (projectName === 'randommeal')
      projectImage = "https://i.ibb.co/K01WLCw/randommeal.png"

    if (projectName === 'randompet')
      projectImage = "https://i.ibb.co/6PVSQdF/randompet.png"

    if (projectName === 'reactmonsters')
      projectImage = "https://i.ibb.co/D9bFWN1/reactmonsters.png"

    if (projectName === 'simple-portfolio')
      projectImage = "https://i.ibb.co/x5gsqQv/simple-portfolio.png"

    if (projectName === 'userapi')
      projectImage = "https://i.ibb.co/XL7hf8V/userapi.png"

    if (projectName === 'vuesouls')
      projectImage = "https://i.ibb.co/qrYn3k0/vuesouls.png"

    html += `
      <div class="card">
        <div class="card-title">
          <h1>${projectName}</h1>
        </div>
        <div class="card-body">
          <img src="${projectImage}"/>
        </div>
      </div>
    ` 
  }

  html += '</div>'

  projects.innerHTML = html
  
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

githubApi()

