import { TextField, Button } from "@material-ui/core";
import ValidacoesCadastro from "../../context/ValidacoesCadastro";
import useErros from "../../hooks/useErros";
import api from "../../api/api"
import { useState, useContext } from 'react'


export default function AddSenha({ getCurrentLogin }) {

    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [login, setLogin] = useState("");
    const [categoria, setCategoria] = useState("");

    const addSenhaApi = async () => {
        let resp = await api.post('/senhas/' + getCurrentLogin(), {
            "nome": nome,
            "login": login,
            "senha": senha,
            "categoria": categoria
        })
            .catch((err) => console.log("Api post senha error: ", err));
        if (resp && resp.data) {
            console.log('api post senha return', resp.data)
        }
    };

    return <>
        <form
            onSubmit={() => {
                // if (possoEnviar()) {
                //     // addSenhaApi(login, senha);
                // }
                addSenhaApi()
                console.log('senha adicionada')
            }
            }
        >
            <TextField
                value={nome}
                onChange={(event) => {
                    setNome(event.target.value);
                }}
                // onBlur={validarCampos}
                // error={!erros.login.valido}
                // helperText={erros.login.texto}
                id="nome"
                name="nome"
                label="nome"
                type="text"
                required
                variant="outlined"
                margin="normal"
                fullWidth
            />
            <TextField
                value={login}
                onChange={(event) => {
                    setLogin(event.target.value);
                }}
                // onBlur={validarCampos}
                // error={!erros.senha.valido}
                // helperText={erros.senha.texto}
                id="login"
                name="login"
                label="login"
                type="text"
                // required
                variant="outlined"
                margin="normal"
                fullWidth
            />
            <TextField
                value={senha}
                onChange={(event) => {
                    setSenha(event.target.value);
                }}
                // onBlur={validarCampos}
                // error={!erros.senha.valido}
                // helperText={erros.senha.texto}
                id="senha"
                name="senha"
                label="senha"
                type="text"
                required
                variant="outlined"
                margin="normal"
                fullWidth
            />
             <TextField
                value={categoria}
                onChange={(event) => {
                    setCategoria(event.target.value);
                }}
                // onBlur={validarCampos}
                // error={!erros.login.valido}
                // helperText={erros.login.texto}
                id="categoria"
                name="categoria"
                label="categoria"
                type="text"
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
}