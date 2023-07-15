// 数据结构转换工具

/**
 * 判断是否有转树的必要
 * @param plainList 平行数据列表
 * @param id 祖宗id
 * @returns {boolean}  有返回true,无返回false
 */
export function judgeTree(plainList, id = '0') {
  if (plainList && plainList.length > 0) {
    let flag = false // 是否需要转成树结构
    const pid = plainList[0].pid
    for (const item of plainList) {
      if (item.pid !== pid) {
        flag = true
        break
      }
    }
    return flag
  } else { return false }
}

/**
 * 平面数据数据转树结构
 * @param plainList 平行数据列表
 * @param id 祖宗id
 * @param isSelect 是否是下拉需要顶级的树
 * @returns {*}
 */
export function toTreeList(plainList, id = '0', isSelect = false) {
  const pid = findPid(plainList)
  if (pid.length > 1) {
    return plainList
  } else {
    const tree = cleanChildren(buildTree(plainList, pid[0], isSelect))
    return tree
  }
}
// 构建树
function buildTree(plainList, id = '0', isSelect) {
  // 递归函数
  const fa = (parentId) => {
    const temp = []
    for (let i = 0; i < plainList.length; i++) {
      const n = plainList[i]
      const id = '' + n.id
      const pid = '' + n.pid
      if (pid === parentId) {
        n.children = fa(id)
        temp.push(n)
      }
    }
    return temp
  }
  // 如果是下拉框需要使用的树，首先寻找顶级，将顶级也放入列表
  if (isSelect) {
    let flag = 1
    const list = []
    for (const n of plainList) {
      const nid = '' + n.id
      if (nid === id) {
        n.children = fa(id)
        flag = 0
        list.push(n)
        return list
      }
    } if (flag === 1) { // 没有找到父级，按原流程走
      return fa(id)
    }
  } else {
    return fa(id)
  }
}

// 清除空 children项
function cleanChildren(data) {
  const fa = (list) => {
    list.map((e) => {
      if (e && e.children && e.children.length) {
        fa(e.children)
      } else {
        delete e.children
      }
      return e
    })
    return list
  }
  return fa(data)
}

function findPid(plainList) {
  const pidList = new Set()
  if (plainList) {
    for (const item of plainList) {
      pidList.add(item.pid)
    }
    for (const item of plainList) {
      if (pidList.has(item.id)) {
        pidList.delete(item.id)
      }
    }
    var arr = [...pidList]
    return arr
  } else {
    return null
  }
}

// 平面数据数据转树结构
export function getShowItem(plainList, id = '0') {
  const expandList = []
  const openedList = []
  for (let i = 0; i < plainList.length; i++) {
    if (plainList[i].open === 'true' || plainList[i].open === true) {
      expandList.push(plainList[i].id)
    }
    if (plainList[i].checked === 'true' || plainList[i].checked === true) {
      openedList.push(plainList[i].id)
    }
  }
  return [expandList, openedList]
}

// 从树列表中删除指定元素
export function deleteItem(list, des) {
  const del = (list, item) => {
    for (const i in list) {
      if (list[i].id === des.id) {
        list.splice(i, 1)
        return
      } else {
        if (list[i].children && list[i].children.length > 0) {
          del(list[i].children, des)
        }
      }
    }
  }
  del(list, des)
}
