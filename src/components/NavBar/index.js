import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function NavBar({ getUserLogged, changePage }) {
    const classes = useStyles();
    const router = useRouter();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Passwd Manager
          </Typography>
                    {isLogged()}
                </Toolbar>
            </AppBar>
        </div>
    );

    function isLogged() {
        const user = getUserLogged();
        if (user !== undefined) {
            return (
                <>
                    <Typography variant="h6" className={classes.title}> Olá, {user}</Typography>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        console.log("sair");
                        router.push(`/`);
                        // changePage(0);
                    }}>
                        <Button type="submit" color="secondary">Sair</Button>
                    </form>
                </>
            )
        } else {
            return (
                <form onSubmit={(e) => {
                    console.log("login")
                    e.preventDefault();
                    changePage(1);
                }}>
                    <Button type="submit" color="inherit">Login</Button>
                </form>
            )
        }
    }

}
