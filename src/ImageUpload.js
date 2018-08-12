import React, { Component } from 'react';
import { RequestService } from './utils/request-service';

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
    
    async onSubmit(e) {
        e.preventDefault();
		const { listPreviewFiles } = this.state;

		// Create new Form Data
		var formData = new FormData();
        for (let i = 0; i < listPreviewFiles.length; i++) {
			formData.append('files', listPreviewFiles[i].file, listPreviewFiles[i].file.name);
		}	

		// Request Upload
		await RequestService.uploadFiles(formData)
		.then(() => { this.setState({ listPreviewFiles: [] })})
		.catch(error => console.log(error));
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