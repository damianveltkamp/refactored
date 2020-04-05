import fetch from 'node-fetch'

export async function getForkers(FETCHURL) {
  try {

    const data = await fetch(`${FETCHURL}/forks`)
      .then(res => {
        return res.json()
      })
      .then(jsonData => {
        const constructedEntries = jsonData.map(entry => {
          return constructForkerObject(entry)
        })
        return constructedEntries
      })
      .catch(err => {
        console.log('Error ', err)
      })
    const promisedData = await Promise.all(data)
    return promisedData

  } catch(error) {
    console.log(error)
  }
}

export async function getCommits(baseUrl,users) {
  try {

    const usersWithCommits = users.map(user => {
      const { gitusername, repository } = user
      const userWithCommits = fetch(`${baseUrl}/${gitusername}/${repository}/commits?author=${gitusername}`)
        .then(res => {
          return res.json()
        })
        .then(jsonData => {
          user.commits = jsonData
          return user
        })
        .catch(err => {
          console.log('Error ', err)
        })
      return userWithCommits
    })
    const promisedData = Promise.all(usersWithCommits)
    return promisedData

  } catch(error) {
    console.log(error);
  }
}

async function constructForkerObject(entry) {
	const forker = new Object()
	forker.gitusername = entry.owner.login
	forker.repository = entry.name
	return forker
}

