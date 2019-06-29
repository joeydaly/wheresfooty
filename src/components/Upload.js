import React, {PureComponent} from 'react'
import * as UploadStyles from './Upload.styled'
import UploadButton from './UploadButton'
import Save from './Save'

class Upload extends PureComponent {
    constructor(props) {
        super(props)
        
        this.handleChange = this.handleChange.bind(this)
        this.state = {urlFile: null, rawData: null}
    }

    handleChange(event) {
        let data = event.target.files[0]
        this.setState({urlFile: URL.createObjectURL(data), rawData: data})
    }

    render() {
        let file = this.state.urlFile
        let data = this.state.rawData

        return(
            <UploadStyles.Main>
                {file ?
                    <UploadStyles.Image src={file} />
                    : null
                }

                <UploadButton change={this.handleChange} />

                {data ?
                    <Save data={data} />
                    : null
                }
            </UploadStyles.Main>
        )
    }
}

export default Upload