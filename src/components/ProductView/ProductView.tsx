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
    subfolder: string
}

function ProductView( { brand, subfolder }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const domain = 'https://tryon.looc.io';

    const [appData, setAppData] = React.useState<AppData | undefined>(undefined);
    const [lenses, setlenses] = React.useState<Material[] | undefined>(undefined);
    const [colors, setColors] = React.useState<Material[] | undefined>(undefined);

    React.useEffect(() => {
        const fetch = async (brand: string) => {
            const appData = await cmsGet(brand, 'app-data') as AppData
            setlenses(appData.materials.filter(mat => mat.type === 'glas'))
            setColors(appData.materials.filter(mat => mat.type === 'plastic'))
            setAppData(appData)
        }

        document.title = `${brand} - ${t("tryon")}`
        fetch(brand)
    }, [t, brand])

    const SendMessage = (type: string, identifier: string) => {
        const iframe = document.getElementById('Try-On-Frame') as HTMLIFrameElement
        iframe.contentWindow?.postMessage({ type: type, id: identifier}, domain)
    }

    const onFrameTapped = (identifier: string) => {
        console.log("Frame tapped: " + identifier)
        SendMessage('f', identifier)
    }

    const onPlasticTapped = (identifier: string) => {
        console.log("Plastic tapped: " + identifier)
        SendMessage('p', identifier)
    }

    const onGlasTapped = (identifier: string) => {
        console.log("Glas tapped: " + identifier)
        SendMessage('l', identifier)
    }

    return <Grid container spacing={3}>
        {/* <Grid item xs={12}>
            <Typography variant="h3">
                {t("title", { brand: brand })}
            </Typography>
        </Grid> */}
        <Grid item xs={12} lg={6}>
            <div className={classes.tryOnContainer}>
                {appData?.models ?
                    appData?.models.length > 0 ? 
                    <iframe
                        id="Try-On-Frame"
                        allow="camera"
                        className={classes.tryonIframe}
                        title="Web-TryOn"
                        src={`${domain}/${subfolder}/index.html?f=${appData?.models[0].name}&c=${appData?.models[0].category}`}
                    />
                    : 
                    <> No Glasses published yet, go to <a href="https://cms.looc.io">cms.looc.io </a> and publish some frames .</>
                    :
                    <CircularProgress />
                }
            </div>
        </Grid>
        <Grid xs={12} lg={6}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    {
                        appData ?
                            <ModelList brand={brand} models={appData.models} frameTapped={onFrameTapped} />
                            :
                            <CircularProgress />
                    }
                </Paper>
            </Grid>
            <Grid item xs={12}>
                {
                    colors ?
                        <ColorHList
                            brand={brand}
                            materials={colors}
                            titleTerm="plasticcolors.title"
                            matTapped={onPlasticTapped}
                        />
                        :
                        <CircularProgress />
                }
            </Grid>
            <Grid item xs={12}>
                {
                    lenses ?
                        <ColorHList
                            brand={brand}
                            materials={lenses}
                            titleTerm="lenses.title"
                            matTapped={onGlasTapped}
                        />
                        :
                        <CircularProgress />
                }
            </Grid>
        </Grid>
    </Grid>

}

export default ProductView;
