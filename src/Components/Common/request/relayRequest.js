import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, DatePicker ,message} from 'antd';

import { httpAjax, addressUrl, } from '../../../Util/httpAjax';
import { thirdLayout } from '../../../Util/Flexout';
const FormItem = Form.Item;
const { TextArea } = Input;
class ReplyClueForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagColor: '#108ee9',
            tagBack: '#fff',
            requestModal: false
        }
    }
    componentWillMount () {
        //console.log("userInfor",this.props.user)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const userInfor = this.props.user;
        const { replyRecord } = this.props;
        const reqUrl = addressUrl + '/reply/send';
        this.props.form.validateFields((err, value) => {
            if (!err) {
                let options = {};                
                options.fsry = userInfor.account;
                options.fsryxm = userInfor.name;
                options.fsdw = userInfor&&userInfor.department.code;
                options.fsnr = value.fsnr;
                if(replyRecord.type==='RESP' || replyRecord.type==='CLUE'){
                    options.xxlx = replyRecord.type;
                    options.referenceId=replyRecord.replyId;
                    options.hfry=replyRecord.fromUserId;
                    options.hfryxm=replyRecord.fromUserName;
                }else{
                    options.referenceId=replyRecord.id;
                    options.xxlx='DEMAND';
                }
                //console.log("options",options)
                httpAjax("post", reqUrl,options).then(res => {
                    if (res.code === '200') {
                       message.success("回复成功");
                       this.props.handleCancle();
                       this.props.getRequestSource();
                    }else{
                        message.error(res.message);
                        this.props.handleCancle();
                    }
                })
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...thirdLayout} label="回复内容">
                    {getFieldDecorator('fsnr', {
                        //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                    })(
                        <TextArea placeholder='请输入留言内容' />
                    )}
                </FormItem>
                {/* <FormItem {...thirdLayout} label="回复人">
                    {getFieldDecorator('fsryxm', {
                        //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                    })(
                        <Input placeholder='请输入回复人' />
                    )}
                </FormItem> */}
                {/* <FormItem {...thirdLayout} label="回复时间">
                    {getFieldDecorator('time', {
                        //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                    })(
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="请选择回复时间"
                        />
                    )}
                </FormItem> */}
                <div style={{ textAlign: 'center' }}>
                    <Button type='primary' htmlType="submit" style={{ marginRight: '10px' }}>提交</Button>
                    <Button onClick={this.props.handleCancel}>取消</Button>
                </div>
            </Form>
        )
    }
}

function mapStateToProps(state) {
    return {
        user : state.user,
    }
}
const ReplyClue = Form.create()(ReplyClueForm)
export default connect(mapStateToProps)(ReplyClue);