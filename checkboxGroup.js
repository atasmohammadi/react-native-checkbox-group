/**
 * Checkbox group
 * ataomega@gmail.com
 * www.atasmohammadi.net
 * version 1.0
 */
import React, {Component, PropTypes} from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
var { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';

export default class CheckboxGroup extends Component {
  constructor(props){
    super(props);
    this.state = {
      pageWidth: Dimensions.get('window').width,
      pageHeight: Dimensions.get('window').height,
      selected: []
    };
  }

  componentDidMount = () => {
    this.props.checkboxes.map(checkbox=>{
        if(checkbox.selected){
          this._onSelect(checkbox.value)
        }
      }
    )
  }

  getNewDimensions(event){
        var pageHeight = event.nativeEvent.layout.height
        var pageWidth = event.nativeEvent.layout.width
        this.setState({
            pageHeight, pageWidth
        })
    }

  _onSelect = (item) => {
    var selected = this.state.selected
    if(selected.indexOf(item) == -1){
      selected.push(item)
      this.setState({
        selected: selected
      })
    } else {
      selected = selected.filter(i => i != item)
      this.setState({
        selected: selected
      })
    }
    this.props.callback(selected)
  }

  _isSelected = (item) => {
    const selected = this.state.selected
    if(selected.indexOf(item) == -1){
      return false
    }
    return true
  }

  render(){
    const { checkboxes, iconColor, iconSize, labelStyle, checkedIcon, uncheckedIcon, rowStyle, rowDirection } = this.props;

    return(
      <View
        onLayout={(evt)=>{this.getNewDimensions(evt)}}
        style={{
          flex: 1,
          flexDirection: rowDirection,
          padding: 5
        }}
      >
        {checkboxes.map((checkbox, index)=>{
          return(
            <TouchableOpacity
              key={index}
              style={rowStyle}
              onPress={()=>{
                this._onSelect(checkbox.value)
              }}
            >
              {this._isSelected(checkbox.value) ?
                <Icon name={checkedIcon} color={iconColor} size={iconSize}/>
                : <Icon name={uncheckedIcon} color={iconColor} size={iconSize}/>
              }
              <Text style={labelStyle}>{checkbox.label}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    );
  }
}
