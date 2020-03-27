import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'

import api from '../../services/api'

import './styles.css'

export default function Profile(){
  const ongName = localStorage.getItem('ongName')
  const ongId = localStorage.getItem('ongId')

  const [incidents, setIncidents] = useState([])
  const history = useHistory()

  useEffect(()=>{
      api.get('profile', {
        headers:{
          Authorization: ongId
        }
      }).then( response => {
        setIncidents(response.data)
      })
  }, [ongId])

  async function handleDeleteIncidente(id){
    try {
      await api.delete(`incidents/${id}`, {
        headers:{
          Authorization: ongId
        }
      })

      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (error) {
      alert('Erro ao deletar cado, tente novamente.')
    }
  }

  function handleLogout(){
    localStorage.clear()
    history.push('/')
  }

  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span> Bem vida, {ongName} </span>
        <Link  className='button' to='/incidents/new'>
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>  
          <FiPower  size={18} color="#e02041"/>
        </button>
      </header>
      <h1> Cados cadastrados </h1>
      <ul>
        { incidents.map((incident) => (
          <li key={incident.id}>
            <strong> Caso:  </strong>
            <p> {incident.title} </p>

            <strong> Descrição: </strong>
            <p> { incident.description } </p>

            <strong> Valor: </strong>
            <p>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button onClick={() => handleDeleteIncidente(incident.id) } type="button"> 
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        )) }
       
      </ul>
    </div>
  )
}