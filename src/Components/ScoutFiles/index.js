import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';

//引入公用部分
import CommonLayout from '../Content/Index'

import FileContent from './fileContent/index';

import '../../styles/scoutFile.less';


export default class ScoutFile extends React.Component{

	constructor(props) {
		super(props);
		this.state={
			showContent:false
		}
	}

	//显示档案内容
	openFile = () =>{
		this.setState({showContent:true})
	}

	render(){
		const {showContent} =this.state;
		return (
				<CommonLayout>
					<QueueAnim type = 'left'>
					{
						showContent ==false ?
						<Row key = '1'>
							<Col xl={6} lg={8} md={6} sm={0} xs={0}></Col>
							<Col xl={12} lg={8} md={12} sm={24} xs={24}>
								<div className='fileCover' onClick={this.openFile} >  
								</div>
							</Col>
							<Col xl={6} lg={8} md={6} sm={0} xs={0}></Col>
						</Row> : <FileContent />
					}				
					</QueueAnim>
				</CommonLayout>
		)
	}
}