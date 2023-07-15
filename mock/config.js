// import { param2Obj } from './utils'

const baseConfig = {
  kaptcha: true
}

export default {
  baseconfig: res => {
    return {
      code: 200,
      success: true,
      data: baseConfig
    }
  }
}
