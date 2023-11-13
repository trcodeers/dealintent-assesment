import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import TaskForm from '../components/TakForm'

const Home: NextPage = () => {
 
  const [displayForm, setDisplayForm] = useState(false)
  
  const onAddTask = (data: any) =>{
    console.log(data)
  }

  const onCacelForm = () =>{
    setDisplayForm(false)
  }

  const onClickAddTask = () =>{
    setDisplayForm(true)
  }

  return (
    <div>
      
      {!displayForm && <div style={{ display: 'flex', justifyContent: 'center', }}>
        <button onClick={() => setDisplayForm(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add Task
      </button>
      </div>}

      {
        displayForm && 
          <TaskForm
            onAddTask={onAddTask}
            onCacelForm={onCacelForm}
          />
      }

    </div>
  )
}

export default Home
