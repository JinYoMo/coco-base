module.exports = [
  {
    url: '/config/baseConfig',
    type: 'get',
    response: _ => {
      return {
        'code': 200,
        'data': {
          'kaptcha': false,
          'publicKey': 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCu5k8gcTFJy5UtMfmtKiR3f/EcUe93kzfteRj6+sM5fHRvOib82+uqQMjgaRZiMcr3HiHIFY5vA6c+Rfb5R2COitoOhxyA9U2eLXknzxLUQIAqXAvKQO8KnerA1Qjcds7xhJB2XPhWFlY4RVtMT2wr2lMd29QDE4F/kzyDhNBpxwIDAQAB',
          'sid': 'f390b7d7-337b-431b-be22-fb860a6c04d4'
        },
        'message': '请求成功',
        'success': true
      }
    }
  }
]
