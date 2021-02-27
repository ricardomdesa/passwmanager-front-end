import Head from 'next/head'
import styles from '../styles/Home.module.css'
import DadosUsuario from '../src/components/login'
import { Typography } from '@material-ui/core'
import { useState, useEffect } from 'react';
import { validarLogin, validarSenha } from '../src/models/cadastro'
import ValidacoesCadastro from "../src/context/ValidacoesCadastro"
import api from '../src/api/api'
import AddUser from '../src/components/AddUser'
import AddSenha from '../src/components/AddSenha'

export default function Home() {

  const [dados, setDados] = useState({});
  const [users, setUsers] = useState([]);

  function collectDados(dados){
    setDados(dados);
    getUsersByLogin(dados);
  }

  const getUsersByLogin = async (dados) => {
    const resp = await api
    .get("/users/" + dados.login)
    .catch((err) => console.log("Api error: ", err));
    if(resp && resp.data) {
      if (dados.senha == resp.data.senha) {
        setUsers(resp.data);
        console.log('sucesso no login')
      }else{
        console.log('falha no login')
        setUsers({});
      }
    }
  }

  const getUsers = async () => {
    const resp = await api
    .get("/users")
    .catch((err) => console.log("Api error: ", err));
    if(resp && resp.data) setUsers(resp.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Passwd Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography variant="h3" component="h1" align="center" >Login - Passwd Manager</Typography>
      <ValidacoesCadastro.Provider value={{login: validarLogin, senha: validarSenha}}>
        <DadosUsuario aoEnviar={collectDados}/>
        <AddUser></AddUser>
        <AddSenha getCurrentLogin={()=> users.login}></AddSenha>
      </ValidacoesCadastro.Provider>
    </div>
  )


}
