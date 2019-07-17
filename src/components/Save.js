import React, {PureComponent} from 'react'
import * as SaveStyles from './Save.styled'

class Save extends PureComponent {
    render() {
        return(
            <SaveStyles.Save onClick={this.props.click}>
                upload
            </SaveStyles.Save>
        )
    }
}

export default Save