module.exports = (doc) => {
  doc.longitude = parseFloat(doc.longitude)
  doc.latitude = parseFloat(doc.latitude)
  return doc
}
