document.addEventListener('DOMContentLoaded', (event) => {
  //create a Post
  let createButton = document.getElementById('create-post')
  createButton.addEventListener('click', createPost)
  makeBlogEntries()
} )


function makeBlogEntries(event){
  //delete any existing entries
  removeEntriesFromDOM()
  // let contentArea = document.getElementById('blog-content')
  //populate existing entries
  axios.get('/blogtable').then((response) => {
    //console.log(response)
    let blogData = response.data
    blogData.forEach((entry, index) => {
      //get element to append main content to:
      //content is appended to contentArea depending on which link is selected.
      //defaults to first link
      let contentArea = document.getElementById('blog-content')

      //get element to append titles for nav to:
      let nav = document.getElementById('title-links')

      //create buttons for edit/delete
      let editButton = document.createElement('button')
      editButton.setAttribute('class', "btn btn-outline-primary" )
      editButton.setAttribute('id', entry.id)
      editButton.innerText = 'Edit'
      editButton.addEventListener('click', editPost)
      let deleteButton = document.createElement('button')
      deleteButton.setAttribute('class', "btn btn-outline-primary" )
      deleteButton.setAttribute('id', entry.id)
      deleteButton.innerText = 'Delete'
      deleteButton.addEventListener('click', deletePost)

      //create new link for title
      let newLink = document.createElement('li')
      newLink.setAttribute('class', 'list-group-item')
      newLink.innerText = entry.title
      newLink.addEventListener('click', (event) =>{
        //START event listener--------------------------------------------------
        event.preventDefault()
        //first, remove active from active link
        let links = document.getElementsByTagName('li')
        for (let i = 0; i< links.length; i++){
          // console.log("links[i]", links[i])
          links[i].setAttribute('class', 'list-group-item')
        }
        //set active class on selected link
        let currentLink = event.target
        currentLink.setAttribute('class', 'list-group-item active')
        //remove current children
        while (contentArea.firstChild){
          contentArea.removeChild(contentArea.firstChild)
        }
        //show desired content
        let title = document.createElement('h1')
        title.innerText = entry.title
        let body = document.createElement('h2')
        body.innerText = entry.content
        //append elements to content Area
        contentArea.appendChild(title)
        contentArea.appendChild(body)
        contentArea.appendChild(editButton)
        contentArea.appendChild(deleteButton)
        //END event listener----------------------------------------------------
      })

      //if index === 0 add the title and body to the content area
      if(index === 0){
        newLink.setAttribute('class', 'list-group-item active')
        let defaultTitle = document.createElement('h1')
        defaultTitle.innerText = entry.title
        let defaultBody = document.createElement('h2')
        defaultBody.innerText = entry.content
        contentArea.appendChild(defaultTitle)
        contentArea.appendChild(defaultBody)
        contentArea.appendChild(editButton)
        contentArea.appendChild(deleteButton)
      }

      //append link to list of links
      nav.appendChild(newLink)

    })
  })
}

function createPost(event){
  let form = document.getElementById('create-form')
  form.hidden = false
  let submit = document.getElementById('submit-button')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log("SUBMIT")
    //add info from form to database
    let formElements = event.target.elements
    console.log("formElements: ", formElements)
    let data = {
      title: formElements[0].value,
      content: formElements[1].value
    }
    console.log('data:', data)
    axios.post('/blogTable', data).then((results) => {
      console.log(results)
      removeEntriesFromDOM()
      makeBlogEntries()
      form.hidden = true
    })
  })

}

function removeEntriesFromDOM(){
  //remove current children
  let content = document.getElementById('blog-content')
  let contentChildren = content.children
  console.log("content children", contentChildren)
  while(content.firstChild){
    content.removeChild(content.firstChild)
  }
  let titles = document.getElementById('title-links')
  while(titles.firstChild){
    titles.removeChild(titles.firstChild)
  }
}

function editPost(event){
  console.log("EDIT")
  let idToEdit = event.target.id
  console.log("idToEdit: ", idToEdit)
  let form = document.getElementById('create-form')
  form.hidden = false
  let submit = document.getElementById('submit-button')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log("SUBMIT")
    //add info from form to database
    let formElements = event.target.elements
    console.log("formElements: ", formElements)
    let data = {
      title: formElements[0].value,
      content: formElements[1].value
    }
    console.log('data:', data)
    axios.put(`/blogtable/${idToEdit}`, data)
      .then((results) => {
        console.log(results)
        removeEntriesFromDOM()
        makeBlogEntries()
        form.hidden = true
      })
  })

}

function deletePost(event){
  console.log("DELETE")
  console.log('id to delete: ', event.target.id)
  let idToDel = event.target.id
  axios.delete(`/blogtable/${idToDel}`)
    .then((results) => {
      console.log(results)
      makeBlogEntries()
    })

}
