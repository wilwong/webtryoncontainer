import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from "react-i18next";

import AppData from '../modelTypes/AppData'

import { cmsGet } from '../API'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


type Props = {
    brand: string
}

function ProductView( { brand }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    const [appData, setAppData] = React.useState<AppData | undefined>(undefined);

    React.useEffect(() => {
        const fetch = async (brand: string) => {
            setAppData(await cmsGet(brand, 'app-data'))
        }

        document.title = `${brand} - ${t("tryon")}`
        fetch(brand)
    }, [t, brand])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>xs=12</Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
        </Grid>
    );
}

export default ProductView;
