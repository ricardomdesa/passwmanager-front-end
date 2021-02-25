import Head from 'next/head'
import styles from '../styles/Home.module.css'
import DadosUsuario from '../src/components/login'
import { Typography } from '@material-ui/core'
import { useState } from 'react';
import { validarLogin, validarSenha } from '../src/models/cadastro'
import ValidacoesCadastro from "../src/context/ValidacoesCadastro";

export default function Home() {

  const [dados, setDados] = useState({});

  function collectDados(dados){
    setDados(dados);
    console.log(dados);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Passwd Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography variant="h3" component="h1" align="center" >Login - Passwd Manager</Typography>
      <ValidacoesCadastro.Provider value={{login: validarLogin, senha: validarSenha}}>

        <DadosUsuario aoEnviar={collectDados}/>
      </ValidacoesCadastro.Provider>
    </div>
  )


}
