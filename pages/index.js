import { React, Fragment, useState, useEffect } from 'react';
import Head from 'next/head'
import { Container } from '@material-ui/core'
import DadosUsuario from '../src/components/login'
import { validarLogin, validarSenha } from '../src/models/cadastro'
import ValidacoesCadastro from "../src/context/ValidacoesCadastro"
import api from '../src/api/api'
import AddUser from '../src/components/AddUser'
import NavBar from '../src/components/NavBar';
import 'fontsource-roboto';

import { useRouter } from 'next/router';

export default function Home() {

  const [dados, setDados] = useState({});
  const [index, setIndex] = useState(0);
  const router = useRouter();

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
        console.log('sucesso no login', resp.data.id);
        router.push(`/senhas?login=${resp.data.id}`);
      }else{
        console.log('falha no login')
      }
    }
  }

  return (
    <>
      <Head>
        <title>Passwd Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Fragment>

      <NavBar changePage={changePage} getUserLogged={()=>{}}></NavBar>
      <Container component="article" maxWidth="sm">
        <ValidacoesCadastro.Provider value={{login: validarLogin, senha: validarSenha}}>
          {getPage(index)}
        </ValidacoesCadastro.Provider>
      </Container>
      </Fragment>
    </>
  )

  function getPage(index){
    switch (index) {
      case 0:
        return <DadosUsuario aoEnviar={collectDados}></DadosUsuario>;
        break;
      case 1:
        return <AddUser aoEnviar={changePage}></AddUser>
        break;
      default:
        break;
    }
  }

}
