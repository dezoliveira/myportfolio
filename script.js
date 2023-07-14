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
    console.log(repos[i])
    html += `
      <div class="card">
        <div class="card-title">
          <h1>${repos[i].name}</h1>
        </div>
        <div class="card-body">
          <img src="https://i.ibb.co/r3j725k/project12.png"/>
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

