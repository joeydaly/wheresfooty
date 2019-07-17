import AWS from 'aws-sdk'

// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'ap-southeast-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-southeast-2:66f74931-3669-4227-9819-9c4371cbda02',
});

export const publish = (photo, json, uuid) => {
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