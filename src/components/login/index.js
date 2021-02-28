import React, { useState, useContext } from "react"
import { TextField, Button, Typography } from "@material-ui/core"
import ValidacoesCadastro from "../../context/ValidacoesCadastro"
import useErros from "../../hooks/useErros"

function DadosUsuario({ aoEnviar }) {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [addUser, setAddUser] = useState(true);
  const validacoes = useContext(ValidacoesCadastro);
  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  return (
    <>
    <Typography variant="h3" component="h2" align="center" >Login</Typography>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if(possoEnviar()){
          aoEnviar({ login, senha });
        }
      }}
    >
      <TextField
        value={login}
        onChange={(event) => {
          setLogin(event.target.value);
        }}
        // onBlur={validarCampos}
        // error={!erros.login.valido}
        helperText={erros.login.texto}
        id="login"
        name="login"
        label="login"
        type="login"
        required
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        value={senha}
        onChange={(event) => {
          setSenha(event.target.value);
        }}
        onBlur={validarCampos}
        error={!erros.senha.valido}
        helperText={erros.senha.texto}
        id="senha"
        name="senha"
        label="senha"
        type="password"
        required
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Entrar
      </Button>
    </form>
    <form onSubmit={(event)=>{
      event.preventDefault();
        aoEnviar({ addUser });
    }}>
      <Button type="submit" variant="contained" color="secondary">
        Criar User
      </Button>
    </form>
    </>
  );
}

export default DadosUsuario;
