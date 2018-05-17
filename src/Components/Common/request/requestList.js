import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Collapse, Input, Button, Rate, List, Divider, Tag, Modal, Spin } from 'antd';

import { httpAjax, addressUrl } from '../../../Util/httpAjax';

import ReplyClue from './relayRequest';
import RateCom from './rate';
const Panel = Collapse.Panel;
export default class RequestList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showAppraise: false,
			showReply: false,
			requestSource: [],
			replyRecord: '',
			loading: false
		}
	}
	componentWillMount() {
		this.getRequestSource();
		//console.log("this.record", this.props.showType)
	}

	//回复评论
	relayRequestClue = (record) => {
		this.setState({ showReply: true, replyRecord: record })
	}

	//评价
	appraiseRequest = (record) => {
		this.setState({ showAppraise: true })
	}

	//取消评价
	handleCancle = () => {
		this.setState({ showReply: false, showAppraise: false })
	}

	getRequestSource = () => {
		this.setState({ loading: true });
		const { showType, record } = this.props;
		const ajbh = sessionStorage.getItem("ajbh"); //this.props.record.ajbh //"A4403085000002007010001" //
		let reqUrl = "";
		if (showType === "scoutPlat") {
			reqUrl = addressUrl + `/demand/getDemandByCase?ajbh=${ajbh}`;
			//reqUrl = addressUrl + `/demand/getDemandByCase?ajbh=A4403085000002007010001`;
		} else {
			reqUrl = addressUrl + `/reply/getDemandInteractionContent?referenceId=${record.id}&type=DEMAND`;
		}
		httpAjax("get", reqUrl).then(res => {
			if (res.code === '200') {
				this.setState({ requestSource: res.data, loading: false })
			}
		})
	}

	mapReplyType = (type) => {
		if (type === "CLUE") {
			return '反馈线索'
		} else if (type === "RESP") {
			return '回复'
		}
	}
	//提交评价
	submitAppraise = () => {
		this.setState({ showAppraise: false })
	}
	render() {
		const { showReply, showAppraise, requestSource, replyRecord, loading } = this.state;
		const { showType } = this.props;
		return (
			<div>

				{
					showType === 'scoutPlat' ?
						<Collapse defaultActiveKey={['0']}  >
							{
								requestSource && requestSource.map((item, index) => {
									return <Panel header={
										<div >
											<div>
												<Tag color="#87d068">需求{index + 1}</Tag>
												<span style={{ color: 'red' }}>主题：{item.xqmc}；</span>
												<span> 主办人：{item.lrrymc} ；</span>
												<span> 创建时间 ：{item.lrsj}</span>
											</div>
											<div>主要描述：{item.xqnr}</div>
										</div>
									} key={index}>
										<div >
											<div style={{ textAlign: 'right' }}>
												<Button type='primary' onClick={() => this.feedbackClue(item)} size='small'>反馈线索</Button>
												<Button type='primary' onClick={() => this.relayRequestClue(item)} size='small' style={{ marginLeft: '20px' }}>回复</Button>
											</div>
											<Divider dashed />
											{/* 回复列表   */}
											<List
												dataSource={item.contentList}
												locale={{ emptyText: '加载中' }}
												renderItem={(ele, index) => (
													<List.Item   >
														<List.Item.Meta
															title={
																<div >
																	<span >{ele.fromUserName} &nbsp;</span>
																	<span >{ele.date}  &nbsp;</span>
																	<span style={{ color: 'orange' }}> {this.mapReplyType(ele.type)}</span>
																</div>
															}
															description={
																(ele.toUserName) ? (`${ele.fromUserName}  回复 ${ele.toUserName}：${ele.content}`) : ele.content
															}
														/>
														<div>
															<Button onClick={() => this.relayRequestClue(ele)} size='small' style={{ marginRight: '10px' }}>回复</Button>
															<Button onClick={() => this.appraiseRequest(ele)} size='small'> 评价 </Button>
														</div>
													</List.Item>
												)}
											/>
										</div>
									</Panel>
								})
							}
						</Collapse>
						: <div style={{ background: '#e5e5e5', padding: '10px', marginTop: '10px' }}>
							<h3>回复列表</h3>
							< List dataSource={requestSource}
								renderItem={(ele, index) => (
									<List.Item   >
										<List.Item.Meta
											title={
												<div >
													<span >{ele.fromUserName} &nbsp;</span>
													<span >{ele.date}  &nbsp;</span>
													<span style={{ color: 'orange' }}> {this.mapReplyType(ele.type)}</span>
												</div>
											}
											description={
												(ele.toUserName) ? (`${ele.fromUserName}  回复 ${ele.toUserName}：${ele.content}`) : ele.content
											}
										/>
										<div>
											<Button onClick={() => this.relayRequestClue(ele)} size='small' style={{ marginRight: '10px' }}>回复</Button>
											<Button onClick={() => this.appraiseRequest(ele)} size='small'> 评价 </Button>
										</div>
									</List.Item>
								)}
							/>
						</div>
				}
				{/*   								locale={{ emptyText: '加载中' }} */}
				{/* 侦查工作平台详细展示对应需求 */}


				{/* 回复线索 */}
				<Modal title='回复线索' visible={showReply} onCancel={this.handleCancle} footer={null}>
					<ReplyClue handleCancle={this.handleCancle} replyRecord={replyRecord} getRequestSource={this.getRequestSource} />
				</Modal>
				{/* 评价 */}
				<Modal title='评价' visible={showAppraise} onCancel={this.handleCancle} footer={null}>
					<RateCom handleCancle={this.handleCancle} />
				</Modal>
			</div>
		)
	}
}
