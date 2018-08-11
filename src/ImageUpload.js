import React, { Component } from 'react';

class ImageUpload extends Component {
    constructor(props) {
      super(props);
      this.state = {
        filesArr: [
            {
                file: null,
                url: ''
            }
        ]
      };
      this._handleImageChange = this._handleImageChange.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      // TODO: do something with -> this.state.file
    }
  
    _handleImageChange(e) {
      e.preventDefault();
      let files = e.target.files;
      let filesArr = [];
      for (let i = 0; i < files.length; i++) {
          let fileItem = {
            file: files[i],
            url: URL.createObjectURL(e.target.files[i])
          };
          filesArr.push(fileItem);
      }  
      this.setState({
        filesArr
      });

    }
  
    render() {
      let {filesArr} = this.state;
      const showImgs = () => {
        return filesArr.map((value, key) => {
            return <img src={value.url} key={key} width="200px"/>
        });
      }
  
      return (
        <div>
          <form onSubmit={this._handleSubmit}>
            <input type="file" onChange={this._handleImageChange} multiple/>
            {/* <button type="submit" onClick={this._handleSubmit}>Upload Image</button> */}
          </form>
          {showImgs()}
        </div>
      )
    }
  
  }
  
  export default ImageUpload;