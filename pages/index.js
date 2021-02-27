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
import ListaSenhas from '../src/components/ListaSenhas';

export default function Home() {

  const [dados, setDados] = useState({});
  const [users, setUsers] = useState([]);
  const [index, setIndex] = useState(3);

  function collectDados(dados){
    setDados(dados);
    if(dados.addUser){
      setIndex(1);
    }else{
      getUsersByLogin(dados);
    }
    
  }

  function changePage(idx){
    setIndex(idx);
  }

  const getUsersByLogin = async (dados) => {
    const resp = await api
    .get("/users/" + dados.login)
    .catch((err) => console.log("Api error: ", err));
    if(resp && resp.data) {
      if (dados.senha == resp.data.senha) {
        setUsers(resp.data);
        console.log('sucesso no login')
        setIndex(2);
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
      <Typography variant="h3" component="h1" align="center" >Passwd Manager</Typography>
      <ValidacoesCadastro.Provider value={{login: validarLogin, senha: validarSenha}}>
        {getPage(index)}
        {/* <DadosUsuario aoEnviar={collectDados}/>
        <AddUser></AddUser>
        <AddSenha getCurrentLogin={()=> users.login}></AddSenha> */}
      </ValidacoesCadastro.Provider>
    </div>
  )

  function getPage(index){
    switch (index) {
      case 0:
        return <DadosUsuario aoEnviar={collectDados}></DadosUsuario>;
        break;
      case 1:
        return <AddUser aoEnviar={changePage}></AddUser>
        break;
      case 2:
        return <AddSenha getCurrentLogin={()=> users.login} aoEnviar={changePage}></AddSenha>;
        break;   
      case 3:
        return <ListaSenhas aoEnviar={changePage}></ListaSenhas> 
      default:
        break;
    }
  }

}
