import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import ColorPicker from 'material-ui-color-picker';
import { SketchPicker } from 'react-color';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './LifeTotal.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
    background: 'p1Color'
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

function LifeTotal(props) {
    const [heading, setHeading] = useState('MUI MTG Life Total App');
    const classes = useStyles();

    const [p1, setP1] = useState(40)
    const [p1Color, setP1Color] = useState('#FFFFFF')
    console.log('p1Color', p1Color);


  return(
    <div>
        <Typography align='center' variant="h3" gutterBottom>{heading}</Typography>


        <div >
            <Card className={classes.root} style={{backgroundColor: p1Color}}>
                <CardContent >
                    
                    <ColorPicker
                        name='color'
                        label='Pick A Color'
                        // defaultValue='#FFFFFF'
                        value={p1Color} 
                        onChange={color => setP1Color(color)}
                    />
                    
                    <Button fullWidth={true} size="large" variant="text" width="400px" onClick={()=>setP1(p1 + 1)} 
                    // onMouseDown={()=>setP1(p1 + 10)}
                    >+</Button>

                    <Typography variant="h5" component="h2" align="center">
                    Player Name
                    </Typography>

                    <Typography variant="h5" component="h2" align="center">
                    {p1}
                    </Typography>

                    <Button fullWidth={true} size="large" onClick={()=>setP1(p1 - 1)}>-</Button>

                </CardContent>
                <CardActions>
                    {/* <Button fullWidth={true} size="small">Player Color</Button> */}
                    
                </CardActions>
            </Card>
        </div>

    </div>
  );
}

export default connect(mapStoreToProps)(LifeTotal);
