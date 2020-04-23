const LineByLine = require('line-by-line')
const lr = new LineByLine('./branches.txt')
const lookup = require('../postcodelookup/index.js')

const output = []

lr.on('line', (str) => {
  const bits = str.split(',').map((s) => s.trim())
  const obj = {

  }
  obj.postcode = bits[bits.length-1]
  obj.county = bits[bits.length-2]
  if (obj.county === 'London') {
    obj.county = ''
    obj.city = 'London'
  }
  obj.address1 = bits[0]
  for(var i = 1; i < bits.length - 3; i++) {
    obj['address' + (i+1)] = bits[i]
  }
  if (!obj.city) {
    obj.city = bits[bits.length - 3]
  }
  if (obj.postcode) {
    //console.log(obj.postcode)
    const pc = lookup(obj.postcode)
    if (pc) {
      obj.latitude = pc.lat
      obj.longitude = pc.long
    }
  }
  output.push(obj)
   // console.log(bits, obj)
}).on('end',() => {
  for(var i in output) {
    const biz = output[i]
    const a = [ biz.address1, biz.address2 || '', biz.address3 || '',
                biz.city || '', biz.county || '', biz.postcode,
                biz.longitude, biz.latitude]
    console.log(a.join('\t'))
  }
})
