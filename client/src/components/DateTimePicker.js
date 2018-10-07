import React, { Component } from 'react';

class DateTimePicker extends Component {

    constructor(props){
        super(props);
        this.datetimepicker = React.createRef();
    }
    handleDateSelection(){

    }

    componentDidMount(){
        this.datetimepicker.current.datetimepicker();
    }
    
    render(){
        return(
            <div class="container">
            <div class="row">
                <div class='col-sm-6'>
                    <div class="form-group">
                        <div class='input-group date' refs={this.datetimepicker} id='datetimepicker1'>
                            <input type='text' class="form-control" />
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
         
        );
    }

}

export default DateTimePicker;