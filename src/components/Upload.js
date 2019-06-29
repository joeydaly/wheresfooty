import React, {PureComponent} from 'react'
import * as UploadStyles from './Upload.styled'
import UploadButton from './UploadButton'
import Save from './Save'
import Annotation from 'react-image-annotation'
import {RectangleSelector} from 'react-image-annotation/lib/selectors'

class Upload extends PureComponent {
    constructor(props) {
        super(props)
        
        this.handleChange = this.handleChange.bind(this)
        this.mouseDown = this.mouseDown.bind(this)
        this.mouseMove = this.mouseMove.bind(this)
        this.state = {
            annotations: [],
            annotation: {},
            urlFile: null,
            rawData: null,
            mouseDown: false
        }
    }

    handleChange(event) {
        let data = event.target.files[0]
        this.setState({urlFile: URL.createObjectURL(data), rawData: data})
    }
    
    annotateChange(annotation) {
        this.setState({annotation})
    }

    annotateSubmit(annotation) {
        const {geo, data} = annotation

        this.setState({
            annotation: {},
            annotations: this.state.annotations.concat({
                geo,
                data: {
                    ...data,
                    id: Math.random()
                }
            })
        })
    }

    mouseDown() {
        this.setState({mouseDown: !this.state.mouseDown})
    }

    mouseMove() {
        let down = this.state.mouseDown
        if (down === true) {
            console.log('move')
        }
    }

    render() {
        let file = this.state.urlFile
        let data = this.state.rawData

        return(
            <UploadStyles.Main>
                {file ?
                    <UploadStyles.Image>
                        <Annotation
                            src={file}
                            alt='blah'
                            annotations={this.state.annotations}
                            type={RectangleSelector.TYPE}
                            value={this.state.annotation}
                            onChange={this.onChange}
                            onSubmit={this.onSubmit}
                            onMouseDown={this.mouseDown}
                            onMouseMove={this.mouseMove}
                        />
                    </UploadStyles.Image>
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