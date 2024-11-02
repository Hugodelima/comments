import { useEffect, useState } from 'react'
import './App.css'

function App() {
 
  interface Commentary {
    author: string
    comment: string
    date: string
  }

  const [author, setAuthor] = useState("")
  const [comment, setComment] = useState("")

  const [comments, setComments] = useState<Commentary[]>([])


  useEffect(() => {
    const savedComments = localStorage.getItem('comments')
    if (savedComments) {
      const commentsJSON = JSON.parse(savedComments)
      setComments(commentsJSON)
    }
  },[])

  
  function dateNow(){

    const dateNow = new Date()
    const timeZone =  {timeZone: 'America/Cuiaba', hour12:false}
    const timeBrasil = dateNow.toLocaleString('pt-BR', timeZone)
    return timeBrasil
  }

  function handleRegister(eventForm: { preventDefault: () => void }){

    eventForm.preventDefault()

    if (!author || !comment){
      alert("Por favor, preencha todos os campos")
      return;
    } 

    const newComment : Commentary = {
      author,
      comment,
      date: dateNow()
    }

    const updateComments = [...comments, newComment]
    setComments(updateComments)
    localStorage.setItem('comments', JSON.stringify(updateComments))
    emptyForm()
  }


  function emptyForm(){
    setAuthor("")
    setComment("")
  }
  return (
    <>
      <form className='form_input'>
        <label>Nome do Autor: </label><br/>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='Digite aqui o nome do autor'/><br/>

        <label>Comentário: </label><br/>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Coloque aqui seu comentário'/><br/>
        
        <button onClick={handleRegister}>Comentar</button>
      </form>
      <div className='show_comment'>
        {comments.map((item, index) =>(
          <div key={index} className='comments'>
            <p>Autor: {item.author}</p>
            <p>Comentario: {item.comment}</p>
            <p>Data: {item.date}</p>
            <hr/>
          </div>
          ))
        }
        {comments.length > 0 ? <p className='destak'>Total de Comentários: {comments.length}</p> : null}
      </div>
    </>
  )
}

export default App


//Filipe melhor analista N1
