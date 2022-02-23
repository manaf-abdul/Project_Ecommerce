import React, { useRef } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { getCroppedImg } from './getCroppedImage'

const CropImage = ({ src, imageCallback, closeHander }) => {
  const cropperRef = useRef(null)
  const cropDetailsRef = useRef(null)

  const onCrop = (e) => (cropDetailsRef.current = e.detail)

  const clickHndler = async () => {
    const croppedImage = await getCroppedImg(
      cropperRef.current,
      cropDetailsRef.current,
      src.name
    )
    imageCallback(croppedImage)
  }

  return (
    <div className="position-fixed crop-img-container-wrapper">
      <Container className="position-fixed text-center crop-img-container bg-white shadow rounded-2">
        <Row className="gy-3">
          <Col xs={12} className="text-center d-flex justify-content-center">
            <Cropper
              src={src ? URL.createObjectURL(src) : ''}
              className="image-fulid"
              style={{ height: '600px', width: 'fit-content' }}
              // Cropper.js options
              aspectRatio={500 / 500}
              guides={false}
              crop={onCrop}
              ref={cropperRef}
              zoomable={false}
              // autoCrop={false}
              movable={false}
              minCropBoxWidth={200}
              minCropBoxHeight={250}
            />
          </Col>
          <Col xs={12}>
            <Button
              type="button"
              className="btn-danger us-btn-danger mx-1"
              style={{ width: 'fit-content' }}
              onClick={closeHander}
            >
              Cancel
            </Button>

            <Button
              type="button"
              className="us-btn mx-1"
              style={{ width: 'fit-content' }}
              onClick={clickHndler}
            >
              Crop
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CropImage
