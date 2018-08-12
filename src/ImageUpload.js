import React, { Component } from 'react';

class ImageUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listPreviewFiles: []
		};
	}

	addImage = (e) => {
		e.preventDefault();
        const files = e.target.files;
        let { listPreviewFiles } = this.state;
        console.log(files);
		Object.keys(files).map((value, key) => {
			var temp = { file: e.target.files[key], path: URL.createObjectURL(e.target.files[key]) };
			listPreviewFiles.push(temp);
		});

		this.setState({
			listPreviewFiles
		});
	}

	removeImage = (e, value) => {
		e.preventDefault();
		let { listPreviewFiles } = this.state;
        listPreviewFiles = listPreviewFiles.filter(x => x.path !== value.path);
		this.setState({
			listPreviewFiles
		});
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        const { listPreviewFiles } = this.state;
        let input = {};
        for (let i = 0; i < listPreviewFiles.length; i++) {
            let { file } = listPreviewFiles[i];
            input[i] = file;
        }
        console.log(input);
    }

	render() {

		let { listPreviewFiles } = this.state;
		const showImgs = () => {
			return listPreviewFiles.map((value, key) => {
				return <img onClick={(e) => this.removeImage(e, value)} src={value.path} key={key} width="200px" />
			});
		}

		return (
			<div>
				<form onSubmit={this._handleSubmit}>
					<input type="file" onChange={(e) => this.addImage(e)} multiple />
					<button type="submit" onClick={(e) => this.onSubmit(e)}>Upload Image</button>
				</form>
				{showImgs()}
			</div>
		)
	}

}

export default ImageUpload;