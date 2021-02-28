import { TextField, Button, Typography } from "@material-ui/core";
import ValidacoesCadastro from "../../context/ValidacoesCadastro";
import useErros from "../../hooks/useErros";
import api from "../../api/api"
import { useState, useContext } from 'react'


export default function AddUser({ aoEnviar }) {
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const validacoes = useContext(ValidacoesCadastro);
    const [erros, validarCampos, possoEnviar] = useErros(validacoes);

    const addUserApi = async (login, senha) => {
        let resp = await api.post('/users', {
            login: login,
            senha: senha
        })
            .catch((err) => console.log("Api post error: ", err));
        if (resp && resp.data) {
            console.log('api post return', resp.data)
        }
    };

    return (
        <>
            <Typography variant="h3" component="h2" align="center" >Adicionar Usuario</Typography>
            <form
                onSubmit={() => {
                    if (possoEnviar()) {
                        addUserApi(login, senha);
                        aoEnviar(0);
                    }
                }
                }
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
                    Adicionar
      </Button>
            </form>
        </>
    )
}