import { Button, Typography } from "@material-ui/core";
import api from "../../api/api"
import { useState, useContext, useEffect } from 'react'


export default function ListaSenhas({ aoEnviar }) {

    const [senhas, setSenhas] = useState([]);

    const listaSenhasApi = async (userId) => {
        let resp = await api.get('/senhas')
            .catch((err) => console.log("Api get senha error: ", err));
        if (resp && resp.data) {
            setSenhas(resp.data);
            console.log('api get senha return', resp.data)
        }
    };

    useEffect(() =>{
        listaSenhasApi(2);
    }, [])

    return <>
        <Typography variant="h3" component="h2" align="center" >Lista de senhas</Typography>

        <ul>
            {senhas.map((element) => (
                <li key={element}>
                    <span>{element.nome} </span>
                    <span>{element.senha} </span>
                    <span>{element.login} </span>
                    <span>{element.categoria}</span>
                </li>
            ))}
        </ul>

        <form onSubmit={(e) => {
                e.preventDefault();
                aoEnviar(2);
            }
        }>
            <Button type="submit" variant="contained" color="primary">
                Nova senha
            </Button>
        </form>
    </>
}