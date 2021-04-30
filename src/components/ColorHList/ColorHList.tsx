import { useTranslation } from "react-i18next";

import Material from '../../modelTypes/Material'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import lens_icon from './lens_icon.png';

type Props = {
    brand: string,
    materials: Material[]
    titleTerm: string,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'start',
            overflow: 'hidden',
            height: 132,
        },
        headerTitle: {
            margin: theme.spacing(1),
        },
        tileImg: {
            width: '100%',
        },
        gridList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
        title: {
            color: theme.palette.primary.light,
        },
        titleBar: {
            background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
        optionsContainer: {
            borderRadius: theme.spacing(1),
            backgroundColor: theme.palette.background.paper,
            textAlign: 'left',
        },
        lensIconHolder: {
            width: '132px',
            height: '132px',
            borderRadius: '60px',
        },
        lensIcon: {
            maxWidth: '100%',
            maxHeight: '100%',
            display: 'inline-block',
            margin: '0 auto',
            verticalAlign: 'middle',
        }
    }),
);

function ColorBlock({material}: {material: Material}) {
    const classes = useStyles();

    if (material.type === 'glas') {
        return <div className={classes.lensIconHolder} style={{backgroundColor: material.parameters.hexValue}}>
            <img src={lens_icon} alt='lens' className={classes.lensIcon} />  
        </div>
    } else {
        return <div style= {{
            width: '100%',
            height: '100%',
            backgroundColor: material.parameters.hexValue
        }} />    
    }
}

function ColorHList({ brand, materials, titleTerm }: Props) {
    const classes = useStyles();

    const { t, i18n: { language } } = useTranslation();

    return <div className={classes.optionsContainer}>
        <Typography variant="h6" className={classes.headerTitle}>
            {t(titleTerm, { brand: brand })}:
        </Typography>
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={3.5}>
                {materials.map((mat) => (
                    <GridListTile key={mat.identifier} style={{ width: '132px', height: '100%' }}>
                        {
                            mat.image ?
                                <img className={classes.tileImg} src={mat.image} alt={mat.identifier} />
                                :
                                <ColorBlock material={mat} />
                        }
                        <GridListTileBar
                            title={(mat.localizedNames && mat.localizedNames[language]) || mat.identifier}
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
                            }}
                        // actionIcon={
                        //     <IconButton aria-label={`star ${tile.title}`}>
                        //         <StarBorderIcon className={classes.title} />
                        //     </IconButton>
                        // }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    </div>
}

export default ColorHList;
