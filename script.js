let profile = document.getElementById('profile')

const githubData = (data) => {
  let stacks = data.bio.split("|")
  let html = ''
  console.log(data)
  html += '<div class="profile-info">'

  html += `
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

  html += '<ul class="stacks">'
  
  for(let i = 1; i < stacks.length; i++) {
    html += `<i class="fa-brands"></i><li>${stacks[i]}</li>`
  }

  html += '</ul>'
  html += '</div>'

  profile.innerHTML = html
}

const githubApi = async () => {
  user = 'dezoliveira'
  const response = await fetch(`https://api.github.com/users/${user}`)
  const data = await response.json()
  githubData(data)
}

githubApi()

