import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Badge, Icon, Menu, Dropdown, Tooltip, Button } from 'antd';

import { httpAjax, addressUrl } from '../../Util/httpAjax';
import '../../styles/content/header.less';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }
    }

    componentWillMount() {       
        const user=JSON.parse(sessionStorage.getItem("user"));
        this.setState({user:user})
    }
    //退出
    logout = () => {
        console.log("props", this.props)
        const reqUrl = addressUrl + '/user/logout';
        httpAjax("get", reqUrl).then(res => {
            if (res.code === '200') {
                this.props.history.push('/')
            }
        })
    }
    render() {
        //const user = this.props.user;
        const { user } = this.state;
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a href="">退出</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="">修改</a>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to='/systemSet'>个人中心</Link>
                </Menu.Item>
            </Menu>
        );
        return (
            <Row className='header'>
                <Col xl={6} lg={8} md={8} sm={8} xs={6} className='logo'>
                    {/*<img src={logo} alt=""/>*/}
                    <div></div>
                </Col>
                <Col xl={12} lg={8} md={8} sm={8} xs={6} className='slogan' >
                    <h3>新时代  新侦查 新挑战</h3>
                </Col>
                <Col xl={6} lg={8} md={8} sm={8} xs={6}>
                    <Row>
                        <Col xl={4} lg={3} md={3} sm={2} xs={2}>
                            <Badge count={5}>
                                <Icon type="mail" size='big' />
                            </Badge>
                        </Col>
                        <Col xl={4} lg={3} md={3} sm={2} xs={2}>
                            <Badge count={5}>
                                <Icon type="message" />
                            </Badge>
                        </Col>
                        <Col xl={16} lg={18} md={16} sm={18} xs={18}>
                            {/* <Dropdown overlay={menu} trigger={['click']}>
								<div style={{cursor: 'pointer'}}>
									<span>{user.name}  {user.account}</span> <Icon type="caret-down" />									
								</div>
                            </Dropdown>*/}
                            {/* <Tooltip title="退出">

                            </Tooltip> */}
                            <span>{user.name}  {user.account}</span>
                            <Icon type="logout" onClick={this.logout} style = {{marginLeft:'10px',cursor:'pointer'}} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}
export default withRouter(connect(mapStateToProps)(Header));