import React, {PureComponent} from 'react'
import * as SaveStyles from './Save.styled'

class Save extends PureComponent {
    constructor(props) {
        super(props)

        this.saveFile = this.saveFile.bind(this)
    }

    saveFile() {
        console.log(this.props.data)
    }

    render() {
        return(
            <section>
                <SaveStyles.Save onClick={this.saveFile} />
            </section>
        )
    }
}

export default Save