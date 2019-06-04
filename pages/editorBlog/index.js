/*
 * @Description: 
 * @Author: edison
 * @Date: 2019-01-25 15:38:18
 * @LastEditors: edison
 * @LastEditTime: 2019-05-30 14:04:44
 */
// import 'mditor/dist/css/mditor.min.css'
// import Mditor from "mditor"
import React from 'react'
import { Button } from 'antd';
import './index.less'
export default class Editor extends React.Component {
    state = {
        loading: false,
        iconLoading: false,
    }
    componentDidMount(){
        let ele_textarea = document.getElementById('md_editor');
        let mditor =  Mditor.fromTextarea(ele_textarea);
        mditor.value = localStorage.getItem('editorBlog') ? localStorage.getItem('editorBlog') : ''
    }
    issueBlog = () => {
        let markdown = document.getElementsByClassName('markdown-body')[0];
        // this.setState({ loading: true });
        localStorage.setItem('editorBlog', mditor.value)
        localStorage.setItem('editorMarkdown', markdown.innerHTML)
    }
    render() {
        return (
            <div className="container">
                <div className="blogTitle clearfix">
                    <input type="text" placeholder="输入文章标题" />
                    <div className="issue-box" >
                        <Button className="issue-btn" type="primary" loading={this.state.loading} onClick={this.issueBlog}>
                            发布
                        </Button>
                    </div>
                </div>
                <div className="editor-container">
                    <textarea id="md_editor"></textarea>
                </div>
            </div>
        )
    }
} 