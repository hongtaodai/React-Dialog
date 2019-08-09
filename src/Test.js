import React, { Component } from 'react'
import ReactDialog from './ReactDialog'
import BodyContent from './BodyContent'

export default class Test extends Component {
    state={
        visible:false
    }
    show=()=>{
        this.setState({visible:true})
    }
    render() {
        return (
            <div>
                <button onClick={()=>{this.show()}}>弹出对话框</button>                                    
                    <ReactDialog 
                        visible={this.state.visible}
                        component={BodyContent}
                        area={[500,300]}
                    />
            </div>
        )
    }
}
