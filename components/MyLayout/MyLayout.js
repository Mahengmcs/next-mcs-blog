/*
 * @Description: 
 * @Author: edison
 * @Date: 2019-01-17 14:00:45
 * @LastEditors: edison
 * @LastEditTime: 2019-05-29 10:58:03
 */

import MyHeader from '../MyHeader/MyHeader'
import Head from '../Head/Head'
import { BackTop } from 'antd';
const MyLayout = (props) => {
    return (
        <div>
            <Head router={props.router} />
            <div>
                <BackTop />
            </div>
            {
                props.router.pathname !== '/editorBlog' ? <MyHeader /> : '' 
            }
            {props.children}
            
        </div>
    )
}
export default MyLayout