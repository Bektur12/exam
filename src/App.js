import Form from "./component/Form"
import { useEffect, useState } from "react"
import './App.css'
import Portal from "./component/Portal"
function App() {
  const [isActive, setIsActive] = useState(false)
  const [idModal, setIdModal] = useState(null)
  const [CarIt, setCarIt] = useState([])


  async function getPosts() {
    const data = await fetch('https://fetchmyproject-default-rtdb.europe-west1.firebasedatabase.app/car.json')
    const resultDate = await data.json()
    const loading = []
    for (let key in resultDate) {
      loading.push({
        id: key,
        value: resultDate[key].value,
      })
    }
    setCarIt(loading)
  }
  useEffect(() => {
    getPosts()
  }, [])
  async function postTodo(data) {
    try {
      const response = await fetch(
        'https://fetchmyproject-default-rtdb.europe-west1.firebasedatabase.app/car.json',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )
      const result = await response.json()
      if (result.name) {
        setCarIt([...CarIt, data])
        

      }
    } catch (err) {
      console.log(err); 
    }
  }

  const onDeleteHandler = (id) => {
    setIdModal(id)
    setIsActive(true)
  }
  const CloseModal = () => {
    setIsActive(false)
  }

  return (
    <div className='App'>
      <Form fetchZapros={postTodo} />
      {CarIt.map((item) =>
        <div className='Container' key={item.id}>
          <li className='listLi' >{item.value}</li>
          <button onClick={() => onDeleteHandler(item.id)}>delete</button>
        </div>
      )}
      {isActive && <Portal getPosts={getPosts} idModal={idModal} CarIt={CarIt} setCarIt={setCarIt} CloseModal={CloseModal} />}
    </div>
  )
}
export default App
