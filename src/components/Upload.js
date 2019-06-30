import React, {PureComponent} from 'react'
import objectAssign from 'object-assign'
import * as UploadStyles from './Upload.styled'
import UploadButton from './UploadButton'
import Save from './Save'
import Region from './Region'
import RegionSelect from 'react-region-select'

class Upload extends PureComponent {
    constructor(props) {
        super(props)
        
        this.handleChange = this.handleChange.bind(this)
        this.regionChange = this.regionChange.bind(this)
        this.regionRenderer = this.regionRenderer.bind(this)
        this.state = {
            region: [],
            urlFile: null,
            rawData: null
        }
    }

    handleChange(event) {
        let data = event.target.files[0]
        this.setState({
            region: [],
            urlFile: URL.createObjectURL(data),
            rawData: data
        })
    }

    regionChange(region) {
        console.log(region)
        this.setState({region: region})
    }

    changeRegionData(index, event) {
        const region = this.state.Region

        this.regionChange([
			...this.state.regions.slice(0, index),
			objectAssign({}, region, {
				data: objectAssign({}, region.data, { dataType: event.target.value })
			}),
			...this.state.regions.slice(index + 1)
        ])
    }

    regionRenderer(regionProps) {
        if (!regionProps.isChanging) {
            return (
                <Region
                    onChange={(event) => this.changeRegionData(regionProps.index, event)}
                    value={regionProps.data.dataType} />
            )
        }
    }
    
    render() {
        let file = this.state.urlFile
        let data = this.state.rawData

        return(
            <UploadStyles.Main>
                {file ?
                    <UploadStyles.Container>
                        <RegionSelect
                            maxRegions={1}
                            constraint={true}
                            regions={this.state.region}
                            onChange={this.regionChange}
                            regionRenderer={this.regionRenderer}>
                            <UploadStyles.Image src={file} />
                        </RegionSelect>
                    </UploadStyles.Container>
                    : null
                }

                <UploadButton change={this.handleChange} />

                {data ?
                    <Save 
                        photo={data}
                        region={this.state.region} />
                    : null
                }
            </UploadStyles.Main>
        )
    }
}

export default Upload