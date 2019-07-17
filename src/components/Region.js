import React, {PureComponent} from 'react'
import * as RegionStyles from './Region.styled'

/*
 This component can be used in the future to display options
 for the selected region. E.g.
    Drop down list of sports
    Color of football
    Parial or fully in view
*/
class Region extends PureComponent {

    render() {
        return(
            <RegionStyles.Region />
        )
    }
}

export default Region