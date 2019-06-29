import React, {PureComponent} from 'react'
import Upload from './Upload'
import * as MainStyles from './Main.styled'

class Main extends PureComponent {
    render() {
        return(
            <MainStyles.Main>
                <MainStyles.Logo src={require('../resources/cd_logo.svg')} />
        
                <Upload />
            </MainStyles.Main>
        )
    }
}

export default Main