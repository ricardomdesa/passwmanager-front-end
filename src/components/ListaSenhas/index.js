import { listaSenhasApi } from "../../api/api"
import React, { useState, useEffect } from 'react'
import CardSenhas from "../CardSenhas";

import { Button, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import 'fontsource-roboto';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    card: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function ListaSenhas({ aoEnviar, userLogin }) {

    const classes = useStyles();

    const [senhas, setSenhas] = useState([]);

    useEffect(() => {
        listaSenhasApi(userLogin, setSenhas);
    }, [])

    return <>
        <Typography variant="h3" component="h3" align="center" color="primary" >Lista de senhas</Typography>

        <form onSubmit={(e) => {
            e.preventDefault();
            aoEnviar(1);
        }
        }>
            <Button type="submit" variant="contained" color="primary" >
                Nova senha
            </Button>
        </form>

        <div className={classes.root}>
            <Grid container spacing={3}>
                {senhas.map((element) => (
                    <Grid item xs>
                        <CardSenhas dados={element} className={classes.card}></CardSenhas>
                    </Grid>
                ))}
            </Grid>
        </div>
    </>
}