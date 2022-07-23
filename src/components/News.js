import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
    static defaultProps = {
        pageSize: 10,
        country: 'in',
        category: 'science'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    //constructor is a method used to initialize an object’s state in a class. Remember, within the constructor, we will call the super method. This is required because we extend react component class, and a call has to be made to the base class constructor.
    constructor() {
        super();//this is used to call the parent constructor of the component class
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
    }
    async updateNews() {
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize={this.props.pageSize}`
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30)
        let parsedData = await data.json();
        console.log(parsedData);
        this.props.setProgress(70)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100)
    }

    async componentDidMount() {
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=77763179e2e348e790b520edcd4639ab&page=1&pageSize=${this.props.pageSize}`
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({ articles: parsedData.articles, 
        //     totalResults:parsedData.totalResults,
        //     loading:false});

        this.updateNews();
    }

    handlePrevClick = async () => {
        // console.log("Previous");
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=77763179e2e348e790b520edcd4639ab&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);

        // this.setState({ page: this.state.page-1,
        //     articles: parsedData.articles,
        //     loading: false});
        this.setState({ page: this.state.page - 1 });
        this.updateNews();


    }
    handleNextClick = async () => {
        console.log("Next");
        // if(!(this.state.page+1> Math.ceil(this.state.totalResults /this.props.pageSize))){
        //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=77763179e2e348e790b520edcd4639ab&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
        //     this.setState({loading:true});
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     console.log(parsedData);

        //     this.setState({ page: this.state.page+1,
        //         articles: parsedData.articles,
        //         loading: false});
        this.setState({ page: this.state.page + 1 });
        this.updateNews();

    }
    fetchMoreData= async()=>{
        this.setState({page:this.state.page+1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize={this.props.pageSize}`
        // this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
    
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),// concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.
            totalResults: parsedData.totalResults,
            loading: false
        });
    }
    


    render() {
        return (
            <>
                <h1>NewsDaddy-Top Headlines</h1>
                 {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!== this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className='container'>

                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4 my-3" key={element.url}>
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                    </div>
                    </div>
                    </InfiniteScroll>
                    {/* <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div> */}
                
                    </>

            
        )
    }
}
export default News