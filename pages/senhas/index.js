import { React, Fragment, useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import Head from 'next/head'

import NavBar from '../../src/components/NavBar';
import { Container } from '@material-ui/core'
import ListaSenhas from '../../src/components/ListaSenhas';
import AddSenha from '../../src/components/AddSenha';

export default function Senhas() {
    const router = useRouter();
    const [index, setIndex] = useState(0);
    const [userLogin, setUserLogin] = useState('default');

    useEffect(() => {
        setUserLogin(router.query['login'])
    }, [])

    function changePage(idx) {
        setIndex(idx);
    }

    return (
        <>
            <Head>
                <title>Passwd Manager</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Fragment>
                <NavBar changePage={changePage} getUserLogged={() => router.query['loginId']}></NavBar>
                <Container component="article" maxWidth="sm">
                    {getPage(index)}
                </Container>
            </Fragment>
        </>
    )

    function getPage(idx) {
        switch (idx) {
            case 0:
                return <ListaSenhas userLogin={router.query['loginId']} aoEnviar={changePage}></ListaSenhas>;
                break;
            case 1:
                return <AddSenha getCurrentLogin={() => router.query['loginId']} aoEnviar={changePage}></AddSenha>;
                break;

            default:
                break;
        }
    }
}