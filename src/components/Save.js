import React, {PureComponent} from 'react'
import * as SaveStyles from './Save.styled'
import AWS from 'aws-sdk'

class Save extends PureComponent {
    constructor(props) {
        super(props)

        this.saveFile = this.saveFile.bind(this)
    }

    saveFile() {
        addPhoto(this.props.data, this.props.data.name)
    }

    render() {
        return(
            <SaveStyles.Save onClick={this.saveFile}>
                Save
            </SaveStyles.Save>
        )
    }
}

export default Save

// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'ap-southeast-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-southeast-2:66f74931-3669-4227-9819-9c4371cbda02',
});

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: 'wheresfooty-data'}
});

function addPhoto(data, name) {
  var albumPhotosKey = encodeURIComponent('Rawr') + '/';

  var photoKey = albumPhotosKey + name;
  s3.upload({
    Key: photoKey,
    Body: data,
//    ACL: 'public-read'
  }, function(err, data) {
    if (err) {
      return alert('There was an error uploading your photo: ', err.message);
    }
    alert('Successfully uploaded photo.');
  });
}