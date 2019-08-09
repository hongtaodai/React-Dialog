/**
 * Created by shark
 */
import React, { Component } from 'react'
import './css/dialog.less'

/**
 * @class ReactDialog
 */
class ReactDialog extends Component {
    constructor(props) {
        super(props)
        const { x, y } = props.position || {}
        this.state = {
            visible: this.props.visible,
            area:this.props.area,
            position: {
                x: x || '30%',
                y: y || 100,
            },
            x: 0,
            y: 0,
            l: 0,
            t: 0,
            isDown: false,
            full: false,
            mini: false
        }
    }
    handleCancel = () => {
        this.setState({ visible: false })
        typeof this.props.Close === 'function' && this.props.Close()
    }
    handleOk = () => {
        // this.setState({ visible: false })
        typeof this.props.OK === 'function' && this.props.OK()
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.visible!==this.props.visible || 
            nextProps.area!==this.props.area
            ) {
            this.setState({ 
                visible:nextProps.visible,
                area:nextProps.area,
                full:false,
                mini:false
            })
        }
        return true
    }

    renderBodyContent({ component, componentProps }) {
        if (component) {
            const ContentComponent = component
            return <ContentComponent {...(typeof componentProps === 'object' ? componentProps : {})}/>
        } else {
            return this.props.children
        }
    }

    onMouseDown = (e) => {
        let re = /<[^>]+>/g; e.target && e.target.innerHTML.match(re) // 正则匹配在什么情况下移动！！！
        let move = document.getElementById('react-dialog');
        this.setState({
            x: e.clientX,
            y: e.clientY,
            l: move.offsetLeft,
            t: move.offsetTop,
            isDown: true
        });
        window.addEventListener('mousemove', this.onMouseMove);
        // 修改样式
        move.style.cursor = 'move';
    }

    onMouseMove = (e) => {
        let move = document.getElementById('react-dialog');
        // 进行判断
        if (!this.state.isDown) {
            return;
        }

        // 获取鼠标移动之后的位置
        let _x = e.clientX;
        let _y = e.clientY;

        // 计算新的left和top
        let newLeft = _x - (this.state.x - this.state.l);
        let newTop = _y - (this.state.y - this.state.t);

        if (newLeft < 0) {
            newLeft = 0;
        } else if (newLeft > document.documentElement.clientWidth - move.offsetWidth) {
            newLeft = document.documentElement.clientWidth - move.offsetWidth;
        }
        if (newTop < 0) {
            newTop = 0;
        } else if (newTop > document.documentElement.clientHeight - move.offsetHeight) {
            newTop = document.documentElement.clientHeight - move.offsetHeight;
        }
        // 设置新的样式(left和top)
        move.style.left = newLeft + 'px';
        move.style.top = newTop + 'px';
    }

    onMouseUp = () => {
        let move = document.getElementById('react-dialog');
        this.setState({
            isDown: false
        });
        move.style.cursor = 'default';
        window.removeEventListener('mousemove', this.onMouseMove);
    }
    removetopleft = () => {
        let move = document.getElementById('react-dialog');
        move.style.left = null;
        move.style.top = null;

    }
    quitfull = (e) => {
        e.stopPropagation()
        this.removetopleft();
        this.setState({
            full:false,
            visible:true,
            mini:false,
            area:this.props.area
        })
    }
    full = (e) => {
        e.stopPropagation()
        this.removetopleft();  
        this.setState({
            full:true,
            visible:true,
            mini:false,
            area:['100%','100%']
        })
    }
    mini = (e) => {
        e.stopPropagation()
        this.setState({
            mini:true,
            visible:false
        })
    }
    showBtns = () => {
        let eles = []
        if(this.props.showFull){
            let btn = this.state.full ? <div className="icon-fullscreen-exit" title="还原" onClick={(e)=>{this.quitfull(e)}}></div> : 
            <div className="icon-fullscreen" title="最大化" onClick={(e)=>{this.full(e)}}></div>
            eles.push(btn)            
            eles.push(<div className="icon-minisize" title="最小化" onClick={(e)=>{this.mini(e)}}></div>)
        }
        return eles
    }
    render() {
        const { styleType, draggable, title, loading, className, component, componentProps } = this.props
        const { visible, area } = this.state
        const { x, y } = visible ? this.state.position : { x: -1000, y: -1000 }
        const componentVisible = visible ? 'flex' : 'none'
        let width = 300;
        let height = 200;
        if(area){
            width = area[0];
            height= area[1];
        }
        return (
            <React.Fragment>
                <div id="box-container" className="box-container" style={{display: componentVisible}}>
                {/* <div className="box-shader"></div> */}
                    <div id="react-dialog" style={{ width,height }}>
                        <div className="box-header" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
                            <div className="box-title">{this.props.title || '信息'}</div>
                        </div>
                        <div className="box-title-icons">
                            <div className="icon-close" title="关闭" onClick={()=>{this.handleCancel()}}></div>  
                            {
                                this.showBtns()
                            }
                        </div>
                        <div className="box-content">
                            {this.renderBodyContent({ component, componentProps })}
                        </div>
                        <div className="box-footer">
                            <div className="btn" onClick={()=>{this.handleOk()}}>{this.props.okText || '确定'}</div>
                            {
                                !this.props.hideCancel ? <div className="btn" onClick={()=>{this.handleCancel()}}>{this.props.cancelText || '取消'}</div> : null
                            }
                            
                        </div>
                    </div>
                </div>
                {
                    this.state.mini ? (
                        <div className="box-minisize">
                            <div className="box-title">{this.props.title || '信息'}</div>
                            <div className="box-title-icons">
                                <div className="icon-close" title="关闭" onClick={()=>{this.handleCancel()}}></div>                            
                                <div className="icon-fullscreen-exit" title="还原" onClick={(e)=>{this.quitfull(e)}}></div> 
                            </div>
                        </div>
                    ) : null
                }
            </React.Fragment>
        )
    }
}

export default ReactDialog