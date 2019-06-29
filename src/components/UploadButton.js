import React, {PureComponent} from 'react'
import * as UpBtnStyles from './UploadButton.styled'

class UploadButton extends PureComponent {
    render() {
        console.log(this.props.change)
        return (
            <div>
                <UpBtnStyles.Photo
                    type='file'
                    accept='image/*'
                    id='photo'
                    onChange={this.props.change} />
        
                <UpBtnStyles.PhotoBtn htmlFor='photo'>
                snap
                </UpBtnStyles.PhotoBtn>
            </div>
        )
    }
}

export default UploadButton