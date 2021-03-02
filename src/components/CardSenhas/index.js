import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function CardSenhas({ dados }) {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    console.log(dados)

    if(dados.lenght !== 0){

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {dados[0].nome}
                    </Typography>
                <Typography variant="h5" component="h2">
                {/* {dados[1].senha} */}
                    </Typography>
                <Typography className={classes.pos} color="textSecondary">
                {/* {dados[0].senha} */}
                    </Typography>
                <Typography variant="body2" component="p">
                      <br />
                      {/* {dados[0].categoria} */}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
    }else{
        return(
            <>
                <Typography variant="body2" component="p">
                Error
                </Typography>
            </>
        )
    }
}