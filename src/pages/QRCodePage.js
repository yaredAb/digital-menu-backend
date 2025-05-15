import React from 'react'
import { QRCodeCanvas } from 'qrcode.react'

const QRCodePage = () => {
    const url = 'https://cute-salamander-96a798.netlify.app/'

  return (
    <div style={{textAlign: "center", padding: "2rem"}}>
      <h2>Scan to view our Menu</h2>
      <QRCodeCanvas value={url} size={256} />
      <p style={{ marginTop: '1rem' }}>{url}</p>
    </div>
  )
}

export default QRCodePage
