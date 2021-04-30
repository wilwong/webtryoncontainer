import { useTranslation } from "react-i18next";

import Model from '../../modelTypes/Model'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
    brand: string,
    models: Model[]
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
      maxHeight: 600,
    },
  }));


function ModelList( { brand, models }: Props) {
    const classes = useStyles();

    const { t, i18n: { language } } = useTranslation();

    return <div className={classes.root}>
        <Typography variant="h6">
            {t("models.title")}:
        </Typography>
        <GridList cellHeight={180} className={classes.gridList} cols={1}>
            {models.map((model) => (
                <GridListTile key={model.name} cols={1} style={{ height: '150px' }}>
                    <img className={classes.tileImg} src={model.image} alt={model.name} />
                    <GridListTileBar
                        title={(model.localizedNames && model.localizedNames[language]) || model.name}
                        subtitle={<span>{t('model.subtitle', {brand: brand})}</span>}
                        // actionIcon={
                        //     <IconButton aria-label={`info about ${tile.title}`}>
                        //         <InfoIcon />
                        //     </IconButton>
                        // }
                    />
                </GridListTile>
            ))}
        </GridList>
    </div>
}

export default ModelList;
