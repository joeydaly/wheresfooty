import React, {PureComponent} from 'react'
import objectAssign from 'object-assign'
import * as UploadStyles from './Upload.styled'
import UploadButton from './UploadButton'
import Save from './Save'
import Region from './Region'
import RegionSelect from 'react-region-select'
import {publish} from './Publish'

class Upload extends PureComponent {
    constructor(props) {
        super(props)
        
        this.handleChange = this.handleChange.bind(this)
        this.regionChange = this.regionChange.bind(this)
        this.regionRenderer = this.regionRenderer.bind(this)
        this.saveFile = this.saveFile.bind(this)
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

    saveFile() {
        let photo = this.state.rawData
        let region = this.state.region

        if (!region || region.length === 0)
        {
            alert('Please tell us where the footy is before uploading.')
            return;
        }

        const uuid = require('uuid/v4')
        let id = uuid()
        let photoName = id + '.' + photo.name.split('.')[1]
        let json = this.buildJson(region[0], photoName)
        publish(photo, json, id)

        this.setState({
            region: [],
            urlFile: null,
            rawData: null
        })
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
                        click={this.saveFile} />
                    : null
                }
            </UploadStyles.Main>
        )
    }
}

export default Upload