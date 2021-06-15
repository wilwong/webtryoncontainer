import { useTranslation } from "react-i18next";

import Model from '../../modelTypes/Model'

import { Button } from "@material-ui/core";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
    brand: string,
    models: Model[]
    frameTapped: (identifier: string) => void
}


const useStyles = makeStyles((theme) => ({
    root: {
        // borderRadius: theme.spacing(1),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    tileImg: {
        width: '100%',
    },
    optionsContainer: {
        // borderRadius: theme.spacing(1),
        // backgroundColor: theme.palette.background.paper,
        textAlign: 'left',
        paddingBottom: theme.spacing(5)
    },
    gridList: {
        // width: 300,
        // [theme.breakpoints.down('sm')]: {
        //     maxHeight: 420,
        //   },
        //   [theme.breakpoints.up('md')]: {
        //     maxHeight: 620,
        //   },
        //   [theme.breakpoints.up('lg')]: {
        //     maxHeight: 720,
        //   },
        height: '100%',
    },
}));


function ModelList( { brand, models, frameTapped }: Props) {
    const classes = useStyles();

    const { t, i18n: { language } } = useTranslation();

    return <div className={classes.optionsContainer}>
        <Typography variant="h4" align='center'>
            {t("models.title")}:
        </Typography>
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={4}>
                {models.map((model) => (
                    <GridListTile
                        key={model.name}
                        cols={1}
                        style={{
                            height: '100%',
                            // border: '1px solid black',
                            padding: '1em',
                            overflow: 'hidden',
                            borderRadius: '50%'
                        }}
                    >
                        <Button 
                            key={model.name} 
                            onClick={() => frameTapped(model.name)}
                            style={{padding: '0px 0px'}}
                        >
                            <img className={classes.tileImg} 
                            src={model.image} 
                            // alt={model.name} 
                            alt={model.localizedNames[language]}
                            // height={180}
                            />
                            {/* <GridListTileBar
                                title={(model.localizedNames && model.localizedNames[language]) || model.name}
                                subtitle={<span>{t('model.subtitle', { brand: brand })}</span>}
                            actionIcon={
                                <IconButton aria-label={`info about ${tile.title}`}>
                                    <InfoIcon />
                                </IconButton>
                            }
                            /> */}
                        </Button>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    </div>
}

export default ModelList;
