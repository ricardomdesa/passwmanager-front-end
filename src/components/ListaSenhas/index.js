import { Button, Typography } from "@material-ui/core";
import api from "../../api/api"
import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router';
import CardSenhas from "../CardSenhas";


export default function ListaSenhas({ aoEnviar, userLogin }) {

    const [senhas, setSenhas] = useState([{ 'nome': 'nome1' }]);
    const router = useRouter();


    const listaSenhasApi = async (userId) => {

        let respSenha = await api.get('/senhas/' + userId)
            .catch((err) => console.log("Api get senha error: ", err));
        if (respSenha && respSenha.data) {
            if (respSenha.data.status !== 'Erro') {
                setSenhas(respSenha.data);
                console.log('API get senhas:', respSenha.data);
            }
        } else {
            console.log('Erro ao listar senhas do usuario: ', userId);
        }
    };

    useEffect(() => {
        console.log(userLogin)
        if (userLogin !== undefined) {
            listaSenhasApi(userLogin);
        } else {
            console.log('Usuario nao definido', userLogin);
        }
    }, [])

    return <>
        <Typography variant="h3" component="h2" align="center" >Lista de senhas</Typography>

        {/* <ul>
            {senhas.map((element) => (
                <li key={element}>
                    <span>{element.nome} </span>
                    <span>{element.senha} </span>
                    <span>{element.login} </span>
                    <span>{element.categoria}</span>
                </li>
            ))}
        </ul> */}
        <CardSenhas dados={senhas}></CardSenhas>

        <form onSubmit={(e) => {
            e.preventDefault();
            aoEnviar(1);
        }
        }>
            <Button type="submit" variant="contained" color="primary">
                Nova senha
            </Button>
        </form>
    </>
}