import React from 'react';
import { useTranslation } from "react-i18next";

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import './ProductView.css'

import ModelList from "../ModelList/ModelList"

import AppData from '../../modelTypes/AppData'
import Material from '../../modelTypes/Material'
import { cmsGet } from '../../API'
import ColorHList from '../ColorHList/ColorHList';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    tryOnContainer: {
        position: 'relative',
        paddingTop: '75%',
        width: '100%',
    },
    tryonIframe: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        border: 'none',
        borderRadius: theme.spacing(1),
        overflow: 'hidden'
    }
}));


type Props = {
    brand: string
}

function ProductView( { brand }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    const [appData, setAppData] = React.useState<AppData | undefined>(undefined);
    const [glasses, setGlasses] = React.useState<Material[] | undefined>(undefined);
    const [colors, setColors] = React.useState<Material[] | undefined>(undefined);

    React.useEffect(() => {
        const fetch = async (brand: string) => {
            const appData = await cmsGet(brand, 'app-data') as AppData
            setGlasses(appData.materials.filter(mat => mat.type === 'glas'))
            setColors(appData.materials.filter(mat => mat.type === 'plastic'))
            setAppData(appData)
        }

        document.title = `${brand} - ${t("tryon")}`
        fetch(brand)
    }, [t, brand])

    return <Grid container spacing={3}>
        <Grid item xs={12}>
            <Typography variant="h3">
                {t("title", { brand: brand })}
            </Typography>
        </Grid>
        <Grid item xs={9}>
            <div className={classes.tryOnContainer}>
                <iframe
                    allow="camera"
                    className={classes.tryonIframe}
                    title="Web-TryOn"
                    src="https://test.looc.io/forest/index.html"
                />
            </div>
        </Grid>
        <Grid item xs={3}>
            <Paper className={classes.paper}>
                {
                    appData ?
                        <ModelList brand={brand} models={appData.models} />
                        :
                        <CircularProgress />
                }
            </Paper>
        </Grid>
        <Grid item xs={6}>
            {
                colors ?
                    <ColorHList brand={brand} materials={colors} titleTerm="plasticcolors.title"/>
                    :
                    <CircularProgress />
            }
        </Grid>
        <Grid item xs={6}>
            {
                glasses ?
                    <ColorHList brand={brand} materials={glasses} titleTerm="lenses.title"/>
                    :
                    <CircularProgress />
            }
        </Grid>
    </Grid>
}

export default ProductView;
