import React, {PureComponent} from 'react'
import * as SaveStyles from './Save.styled'
import AWS from 'aws-sdk'

// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'ap-southeast-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-southeast-2:66f74931-3669-4227-9819-9c4371cbda02',
});

class Save extends PureComponent {
    constructor(props) {
        super(props)

        this.saveFile = this.saveFile.bind(this)
    }

    saveFile() {
        let photo = this.props.photo
        let region = this.props.region
        console.log(region)

        if (region.length === 0 || region[0] === null)
        {
            alert('Please tell us where the footy is before uploading.')
            return;
        }

        const uuid = require('uuid/v4')
        let id = uuid()
        let photoName = id + '.' + photo.name.split('.')[1]
        let json = this.buildJson(region[0], photoName)
        this.publish(photo, json, id)
    }

    buildJson(region, id) {
        let json = ['{\n"name": "' + id + '",',
        '"top_x": ' + (region.x / 100) + ',',
        '"top_y": ' + (region.y / 100) + ',',
        '"bottom_x": ' + ((region.width + region.x) / 100) + ',',
        '"bottom_y": ' + ((region.height + region.y) / 100) + '\n}'
        ].join('\n')
        return json
    }

    publish(photo, json, uuid) {
        var s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            params: {Bucket: 'wheresfooty-data'}
        })
        var albumPhotosKey = encodeURIComponent('Rawr') + '/'

        var photoKey = albumPhotosKey + uuid + '.' + photo.name.split('.')[1]
        s3.upload({
            Key: photoKey,
            Body: photo,
            }, function(err, photo) {
            if (err) {
                return alert('There was an error uploading your photo: ', err.message)
            }
        })

        photoKey = albumPhotosKey + uuid + '.json'
        s3.upload({
            Key: photoKey,
            Body: json,
            }, function(err, photo) {
            if (err) {
                return alert('There was an error uploading your metadata: ', err.message)
            }
        })

        alert('Successfully uploaded image and metadata.')
    }

    render() {
        return(
            <SaveStyles.Save onClick={this.saveFile}>
                upload
            </SaveStyles.Save>
        )
    }
}

export default Save