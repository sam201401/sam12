import React, { Component } from "react";
import axios from "axios";

class ScrollComponent extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      loading: false,
      page: 1,
      prevY: 0,
      pages: 1
    };
  }
  componentDidMount() {
    this.getPosts(this.state.page);
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }
  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      const curPage = this.state.page + 1;
      if (curPage > this.state.pages) {
        this.setState({ loading: false });
      }
      else {
        this.getPosts(curPage);
        this.setState({ page: curPage });
      }
    }
    this.setState({ prevY: y });
  }


  getPosts(page) {
    this.setState({ loading: true });
    axios
      .get(
        `https://gorest.co.in/public/v1/posts?page=${page}`
      )
      .then(res => {

        this.setState({ photos: [...this.state.photos, ...res.data.data], pages: res.data.pages });
        this.setState({ loading: false });
      });
  }
  render() {

    // Additional css
    const loadingCSS = {
      height: "100px",
      margin: "30px"
    };

    // To change the loading icon behavior
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

    return (
      <div className="container">
        <div >
          {this.state.photos.map(user => (
            <div key={user.id}>
              <h1 height="100px" width="200px" >{user.title}</h1>
              <p  >{user.body}</p>
            </div>
          ))}
        </div>
        <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <span style={loadingTextCSS}>Loading...</span>
        </div>
      </div>
    );
  }
}

export default ScrollComponent;