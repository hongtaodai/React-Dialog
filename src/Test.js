import React, { Component } from 'react'
import ReactDialog from './ReactDialog'
// import ReactDialog from '../dist/ReactDialog'
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
            <div style={{textAlign:"center"}}>
                <button style={{width:200,height:50}} onClick={()=>{this.show()}}>弹出对话框</button>                                    
                    <ReactDialog 
                        visible={this.state.visible}
                        component={BodyContent}
                        showFull={true}
                        hideCancel={false}
                        area={[500,300]}
                    />
            </div>
        )
    }
}
