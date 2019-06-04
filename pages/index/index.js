import {
    List, message, Avatar, Spin,
  } from 'antd';
  import reqwest from 'reqwest';
  import Link from 'next/link'
  import InfiniteScroll from 'react-infinite-scroller';
  const fakeDataUrl = 'https://randomuser.me/api/?results=15&inc=name,gender,email,nat&noinfo';
  import './index.less'
  class BlogList extends React.Component {
    state = {
      data: [],
      loading: false,
      hasMore: true,
    }
    static async getInitialProps() {
        const data = await reqwest({
            url: fakeDataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            
        });
        let blogData = data.results
        return {blogData}
        
    }
    componentDidMount() {
    }
  
    fetchData = (callback) => {
      reqwest({
        url: fakeDataUrl,
        type: 'json',
        method: 'get',
        contentType: 'application/json',
        success: (res) => {
          callback(res);
        },
      });
    }
  
    handleInfiniteOnLoad = () => {
        let data = this.state.data;
        this.setState({
            loading: true,
        });
        this.fetchData((res) => {
            if(res.results.length == 0) {
                return
            }
            data = data.concat(res.results);
            this.setState({
                data,
                loading: false,
            });
        });
    }
  
    render() {
        
        let {blogData = []} = this.props
        blogData = blogData.concat(this.state.data)


        const PostLink = (props) => (
            <li className="comment">
                <Link href={`/blogDetails`}>
                        <div>
                            <img src="https://b-gold-cdn.xitu.io/v3/static/img/comment.4d5744f.svg" alt=""/>
                            <span className="count">30</span>
                        </div>
                </Link>
            </li>
        )
        return (
            <div className="list-container">
                <div className="main-container">
                    <div className="header clearfix">
                        <img className="l" src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIvlkPBCImfjWcpxXkboCIkl7krvFNxgoeV6vFNqkvda7BeeYWPskZcJWbSUTDWuHqI0b9qEs0SvQ/132" alt=""/>
                        <div className="top-right">111</div>
                    </div>
                    <div className="container">
                        <InfiniteScroll
                            initialLoad={false}
                            threshold={250}
                            pageStart={0}
                            loadMore={this.handleInfiniteOnLoad}
                            hasMore={!this.state.loading && this.state.hasMore}
                            useWindow={true}
                        >
                            <List
                                dataSource={blogData}
                                renderItem={item => (
                                    <List.Item key={item.index} className="m-list-item">
                                        <Link href={`/d/${item.index}`}>
                                            <a target="_blank">
                                                <div className="content">
                                                    <p className="authorName">曾川.1小时</p>
                                                    <p className="articleTitle">扔掉Create React App，打造你自己的React生成工具！</p>
                                                    <ul className="icon-box">
                                                        <li className="like">
                                                                <div>
                                                                    <img src="https://b-gold-cdn.xitu.io/v3/static/img/zan.e9d7698.svg" alt=""/>
                                                                    <span className="count">30</span>
                                                                </div>
                                                        </li>
                                                        <PostLink id="1" type="comment" />
                                                    </ul>
                                                </div>
                                            </a>
                                        </Link>
                                    </List.Item>
                                )}
                            >
                                {this.state.loading && this.state.hasMore && (
                                    <div className="demo-loading-container">
                                        <Spin />
                                    </div>
                                )}
                            </List>
                        </InfiniteScroll>
                    </div>
                    <aside className="side">
                            
                    </aside>
                </div>
            </div>
          
      );
    }
  }

  export default BlogList