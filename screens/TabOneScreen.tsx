import React , { useState, useEffect }  from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
//import { Text, View,  } from '../components/Themed';
import { Accelerometer, Gyroscope, Magnetometer,Barometer } from 'expo-sensors';

export default function TabOneScreen() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,    
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(16);
  };


  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        console.log(accelerometerData),
        console.log(accelerometerData.x*180.0/(Math.PI));
        console.log(accelerometerData.y*180.0/(Math.PI));
        console.log(accelerometerData.z*180.0/(Math.PI)); 
        setData(accelerometerData);
      })
    );

    setSubscription(
      Gyroscope.addListener(gyro => {

      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const { x, y, z } = data;
  const svgNS = "http://www.w3.org/2000/svg";


function drawCenterLine(x1, y1, x2, y2, svg) {
  var centreLineHorizontal = document.createElementNS(svgNS, "line");
  centreLineHorizontal.setAttributeNS(null, "x1", x1);
  centreLineHorizontal.setAttributeNS(null, "y1", y1);
  centreLineHorizontal.setAttributeNS(null, "x2", x2);
  centreLineHorizontal.setAttributeNS(null, "y2", y2);
  centreLineHorizontal.setAttributeNS(null, "stroke", "grey");
  centreLineHorizontal.setAttributeNS(null, "stroke-width", 1);
  centreLineHorizontal.setAttributeNS(null, "stroke-opacity", 0.5);
  svg.appendChild(centreLineHorizontal);
}

function drawCardinalDirection(x, y, displayText, svg) {
  var direction = document.createElementNS(svgNS, "text");
  direction.setAttributeNS(null, "x", x);
  direction.setAttributeNS(null, "y", y);
  direction.setAttributeNS(null, "font-size", "20px");
  direction.setAttributeNS(null, "font-family", "Helvetica");
  direction.setAttributeNS(null, "fill", "white");
  var textNode = document.createTextNode(displayText);
  direction.appendChild(textNode);
  svg.appendChild(direction);
}
  return (
    <View style={styles.container}>
      <View>
      <svg id="compass" ref={svg => {


                if (svg == null) {
                    //when closing expandable row, svg is null thwn we get error
                    //to avoid this, if svg ref is null then do nothing and return
                    return;
                }

                //get size of current svg
                var H= svg.height.baseVal.value
                var W= svg.width.baseVal.value

                var newpath = document.createElementNS('http://www.w3.org/2000/svg',"path"); 
                newpath.setAttributeNS(null,"id", "pathIdD");  
                newpath.setAttributeNS(null,"d", "M"+(W/2)+","+(H/2)+" L"+((W/2)-80)+","+(H/2)+" A10,10 1 0,1 "+((W/2)+80)+","+(H/2)+" z");  
//                newpath.setAttributeNS(null,"d", "M115,115 L115,5 A110,110 1 0,1 190,35 z");  
                newpath.setAttributeNS(null,"stroke", "#65AED1");  
                newpath.setAttributeNS(null,"stroke-width", 3);  
                newpath.setAttributeNS(null,"opacity", 1);  
                newpath.setAttributeNS(null,"fill", "#65AED1");
                //transform: rotate(180 - rqrd. angle);
                //newpath.setAttributeNS(null, "transform", "rotate(" + -90  + ","+ (W/2)+", "+(H/2)+")");
                svg.appendChild(newpath);


                var newpath2 = document.createElementNS('http://www.w3.org/2000/svg',"path"); 
                newpath2.setAttributeNS(null,"id", "pathIdD");  
                newpath2.setAttributeNS(null,"d", "M"+(W/2)+","+(H/2)+" L"+((W/2)-80)+","+(H/2)+" A10,10 1 0,1 "+((W/2)+80)+","+(H/2)+" z");  
//                newpath.setAttributeNS(null,"d", "M115,115 L115,5 A110,110 1 0,1 190,35 z");  
                newpath2.setAttributeNS(null,"stroke", "#3D2922");  
                newpath2.setAttributeNS(null,"stroke-width", 3);  
                newpath2.setAttributeNS(null,"opacity", 1);  
                newpath2.setAttributeNS(null,"fill", "#3D2922");
                //transform: rotate(180 - rqrd. angle);
                newpath2.setAttributeNS(null, "transform", "rotate(" + 180  + ","+ (W/2)+", "+(H/2)+")");
                svg.appendChild(newpath2);



                //To do calculate triangle rotation
                var pointer = document.createElementNS(svgNS, "polygon");
                var pointCoordinate = W/2+",0 "+((W/2)+5)+",12 "+((W/2)-5)+",12";
                pointer.setAttributeNS(null, "points", pointCoordinate );
                pointer.setAttributeNS(null, "fill", "red");
                pointer.setAttributeNS(null, "transform", "rotate(" + 30  + ","+ W/2+", "+H/2+")");
                svg.appendChild(pointer);


                var c = document.createElementNS(svgNS, "circle");
                c.setAttributeNS(null, "cx", W/2 );
                c.setAttributeNS(null, "cy", H/2 );
                c.setAttributeNS(null, "r", 20);
                c.setAttributeNS(null, "fill", "white");
                c.setAttributeNS(null, "fill-opacity", 0.1);
                svg.appendChild(c);
                drawCenterLine(W/2, 100, W/2, 200, svg);
                drawCenterLine(100, H/2, 200, H/2, svg);
                drawCardinalDirection(143, 72, "N", svg);
                drawCardinalDirection(228, 158, "E", svg);
                drawCardinalDirection(143, 242, "S", svg);
                drawCardinalDirection(58, 158, "W", svg);

                let w, y2;
                for (var i = 0; i < 360; i += 2) {
                    // draw degree lines
                    var s = "grey";
                    if (i == 0 || i % 30 == 0) {
                        w = 3;
                        s = "white";
                        y2 = 50;
                    } else {
                        w = 1;
                        y2 = 45;
                    }

                    var l1 = document.createElementNS(svgNS, "line");
                    l1.setAttributeNS(null, "x1", 150);
                    l1.setAttributeNS(null, "y1", 30);
                    l1.setAttributeNS(null, "x2", 150);
                    l1.setAttributeNS(null, "y2", y2);
                    l1.setAttributeNS(null, "stroke", s);
                    l1.setAttributeNS(null, "stroke-width", w);
                    l1.setAttributeNS(null, "transform", "rotate(" + i + ", 150, 150)");
                    svg.appendChild(l1);

                    // draw degree value every 30 degrees
                    if (i % 30 == 0) {
                        var t1 = document.createElementNS(svgNS, "text");
                        if (i > 100) {
                            t1.setAttributeNS(null, "x", 140);
                        } else if (i > 0) {
                            t1.setAttributeNS(null, "x", 144);
                        } else {
                            t1.setAttributeNS(null, "x", 147);
                        }
                        t1.setAttributeNS(null, "y", 24);
                        t1.setAttributeNS(null, "font-size", "11px");
                        t1.setAttributeNS(null, "font-family", "Helvetica");
                        t1.setAttributeNS(null, "fill", "grey");
                        t1.setAttributeNS(null, "style", "letter-spacing:1.0");
                        t1.setAttributeNS(null, "transform", "rotate(" + i + ", 150, 150)");
                        var textNode = document.createTextNode(i);
                        t1.appendChild(textNode);
                        svg.appendChild(t1);
                    }
                }

            }} width="300" height="300" xmlns="http://www.w3.org/2000/svg">
            </svg>

      </View>
      <View>
        <View>
          <View style={styles.squareSky} />
          <View style={styles.squareGround} />
        </View>
        <View  style={styles.planeLeft}>   
            <View style={styles.planeRight} />
        </View>
      </View>
     <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
      <Text style={styles.text}>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      <Text style={styles.text}>Euler Angle </Text>
      <Text style={styles.text}>
        roll: {round(Math.atan(x/z)*180.0/(Math.PI))} Pitch: {round(Math.atan(y/z)*180.0/(Math.PI))} alpha: {round(z*180.0/(Math.PI))}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}
const styles = StyleSheet.create({
  squareSky: {
    width: 300,
    height: 150,
    backgroundColor: '#65AED1',
  },
  squareGround: {
    width: 300,
    height: 150,
    backgroundColor: '#3D2922',
  },
  plane:{
  width: 65,
  height: 2,
  backgroundColor: '#E65A1C',
  borderBottomColor: '#E65A1C',
  bottom: '50%'
  },
  planeLeft:{
    width: 55,
    height: 2,
  backgroundColor: '#E65A1C',
  borderBottomColor: '#E65A1C',
  left: 75,
  bottom: '50%'
  },
  planeRight:{
    height: 2,
  backgroundColor: '#E65A1C',
  borderBottomColor: '#E65A1C',
  left: 100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    textAlign: 'center',
    color:'blue'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
});
