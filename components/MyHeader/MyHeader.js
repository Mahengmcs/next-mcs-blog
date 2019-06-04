/*
 * @Description: 
 * @Author: edison
 * @Date: 2019-01-17 14:39:12
 * @LastEditors: edison
 * @LastEditTime: 2019-05-29 10:56:10
 */

import React, { Component } from 'react';
import Link from 'next/link'
import { Input, Avatar, Badge } from 'antd';


const Search = Input.Search;
import './index.less'



const linkList = [
    {title: '首页',href: '/'},
    {title: '写文章',href: '/editorBlog'},
]
class MyHeader extends Component {
    constructor() {
        super()
        this.state = {
            
            linkActive: 0
        }
    }
    linkClick(index) {
        this.setState({
            linkActive: index
        })
    }
    render() {
        
        const list = linkList.map((item,index) => (                            
            <li onClick={this.linkClick.bind(this, index)} key={index}>
                <Link href={item.href}>
                    <a target={item.href == '/editorBlog' ? '_blank' : '_self'} className={index == this.state.linkActive ? 'active' : ''}>{item.title}</a>
                </Link>
            </li>
        ))
        return  <div className="m_header">
                    <header>
                        <div className="m_header_container clearfix">
                            <a className="logo" href="/">
                                <img src="../../static/images/mcs.png" alt=""/>
                            </a>
                            <nav className="main-nav">
                                <ul className="nav-list clearfix">
                                    {list}
                                </ul>
                                <div className="searchBox clearfix">
                                    <Search
                                        placeholder="input search text"
                                        onSearch={value => console.log(value)}
                                        enterButton
                                        />
                                </div>
                                <div className="avatarBox">
                                    <span style={{ marginRight: 24 }}>
                                        <Badge overflowCount={99} count={100}><Avatar src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIvlkPBCImfjWcpxXkboCIkl7krvFNxgoeV6vFNqkvda7BeeYWPskZcJWbSUTDWuHqI0b9qEs0SvQ/132" icon="user" /></Badge>
                                    </span>
                                </div>
                            </nav> 
                        </div>
                    </header>
                </div>
    }
}

 export default MyHeader