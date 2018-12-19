import React, { Component } from 'react';
import InputMoment from 'input-moment';
import moment from 'moment';
import '../../node_modules/input-moment/dist/input-moment.css'
import { FaCalendarAlt } from 'react-icons/fa';

class DateTimePicker extends Component {

    constructor(props){
        super(props);
        this.state  = {
            m: moment(),
            renderPicker: false
          };
    }
    
      handleChange = m => {
        this.setState({ 
            m
         });
      };
    
      handleSave = () => {
        console.log('saved', this.state.m.format('llll'));
        this.props.selection(this.state.m.format());
        this.setState({
            renderPicker: false
        })
      };
    
      renderDateTimePicker(){
          console.log(this.state.renderPicker)
          if(this.state.renderPicker){
            return (
                <InputMoment
                    moment={this.state.m}
                    onChange={this.handleChange}
                    minStep={5}
                    onSave={this.handleSave}
                />
            );
            }
      }

      showDateTimePicker(){
          console.log("clicked")
          this.setState({
              renderPicker: !this.state.renderPicker
          })
          console.log("clicked")
      }
      render() {
          console.log("rendered")
        return (
            <form>
              <div className="input">
                <input style={datePickerStyle.input} type="text" placeholder="Test" value={this.state.m.format('llll')} readOnly />
                <FaCalendarAlt color='#2E7CF6' size='1.5em' onClick={this.showDateTimePicker.bind(this)}/>
            </div>
              {this.renderDateTimePicker()}
            </form>
            
        );
      }

}

const datePickerStyle = {
    input: {
        padding: '0.4rem',
        width: '25rem',
        borderColor: '1px solid #FFFFFF'
    }
}
export default DateTimePicker;