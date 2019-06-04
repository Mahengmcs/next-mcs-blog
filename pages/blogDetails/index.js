/*
 * @Description: 
 * @Author: edison
 * @Date: 2019-01-25 15:37:44
 * @LastEditors: edison
 * @LastEditTime: 2019-05-30 17:46:23
 */
import './index.less'
import React from 'react'
import {MarkCatalog} from '../../until/markCatalog'
class BlogDetails extends React.Component {
    state = {
        input: ''
    }
    componentDidMount() {
        setTimeout(()=>{
            new MarkCatalog('markdown-box')
        },100)
        this.setState({
            input: JSON.parse(JSON.stringify(localStorage.getItem('editorMarkdown')))
        })
    }
    render() {
        return (
            <div className='blogDetailsBox'>
                <div className="markdown-box">
                    <div className="markdown-content">
                        <div className="markdown-body" dangerouslySetInnerHTML = {{ __html:this.state.input }}>
                        </div>
                    </div>
                    <div className="markCatalogbox">
                        <aside id="markCatalog" className="side">
                        </aside>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default BlogDetails