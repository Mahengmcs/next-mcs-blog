import React, {Component} from 'react';
import Head from 'next/head';

const MyHead = (props)=>{
    return (
        <Head>

        <meta charSet="utf-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1"/>
        <meta name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
        <meta name="renderer" content="webkit"/>
        <meta httpEquiv="description" content="马传参"/>
        <meta name="Keywords" content="马传参, 个人网站,个人博客,  web前端"/>
        <meta name="Description" content="马传参的个人网站，马传参的技术作品，马传参的生活成长"/>
        <meta name="author" content="edison"/>
        <link rel="icon" type="image/png" sizes="32x32" href="https://b-gold-cdn.xitu.io/favicons/v2/favicon-32x32.png" />
        {
            props.router.pathname === '/editorBlog' || props.router.pathname === '/blogDetails' ? 
            <link rel="stylesheet" href="https://unpkg.com/mditor@1.0.5/dist/css/mditor.min.css" />
            : '' 
        }
        
        {
            props.router.pathname === '/editorBlog' ? 
            <script src="https://unpkg.com/mditor@1.0.5/dist/js/mditor.min.js"></script> 
            : '' 
        }
        <title>马传参</title>
    </Head>
    )
}
export default MyHead
