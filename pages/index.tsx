import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import TaskForm from '../components/TakForm'

const Home: NextPage = () => {
 
  const [itemsTodo, setItemsTodo] = useState<Array<any>>([
    { id: '1', name: 'Name 1', description: 'This is a description 1 of name 1' },
    { id: '2', name: 'Name 2', description: 'This is a description 2 of name 2' },
    { id: '3', name: 'Name 3', description: 'This is a description 3 of name 3' },
  ]);
  const [displayForm, setDisplayForm] = useState<boolean>(false)
  

  useEffect(() =>{
console.log(itemsTodo)
  }, [itemsTodo])

  const onAddTask = (data: any) =>{
    console.log(data)
    const newTask = { id: (itemsTodo.length + 1).toString(), ...data }
    setItemsTodo([ newTask, ...itemsTodo ])
  }

  const onCacelForm = () =>{
    setDisplayForm(false)
  }


  return (
    <div>
      
       <div style={{ display: 'flex', justifyContent: 'center', }}>
    
       {!displayForm &&  <button onClick={() => setDisplayForm(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add Task
          </button>
        }
      {
        displayForm && 
          <TaskForm
            onAddTask={onAddTask}
            onCacelForm={onCacelForm}
          />
      }
      </div>



    </div>
  )
}

export default Home
