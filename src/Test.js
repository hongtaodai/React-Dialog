import React, { Component } from 'react'
import ReactMovableModal from './ReactMovableModal'
// import ReactMovableModal from '../dist/ReactMovableModal'
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
                    <ReactMovableModal 
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
