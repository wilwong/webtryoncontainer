import { useTranslation } from "react-i18next";

import Model from '../../modelTypes/Model'

import { Button } from "@material-ui/core";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
    brand: string,
    models: Model[]
    frameTapped: (identifier: string) => void
}


const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: theme.spacing(1),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    tileImg: {
        width: '100%',
    },
    gridList: {
      width: 300,
      height: '100%',
    },
  }));


function ModelList( { brand, models, frameTapped }: Props) {
    const classes = useStyles();

    const { t, i18n: { language } } = useTranslation();

    return <div className={classes.root}>
        <Typography variant="h6">
            {t("models.title")}:
        </Typography>
        <GridList cellHeight={180} className={classes.gridList} cols={1}>
            {models.map((model) => (
                <GridListTile
                    key={model.name}
                    cols={1}
                    style={{height: '100%'}}
                >
                    <Button 
                        key={model.name} 
                        onClick={() => frameTapped(model.name)}
                        style={{padding: '0px 0px'}}
                    >
                        <img className={classes.tileImg} src={model.image} alt={model.name} />
                        <GridListTileBar
                            title={(model.localizedNames && model.localizedNames[language]) || model.name}
                            subtitle={<span>{t('model.subtitle', { brand: brand })}</span>}
                        // actionIcon={
                        //     <IconButton aria-label={`info about ${tile.title}`}>
                        //         <InfoIcon />
                        //     </IconButton>
                        // }
                        />
                    </Button>
                </GridListTile>
            ))}
        </GridList>
    </div>
}

export default ModelList;
