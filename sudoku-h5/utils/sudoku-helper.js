/**
 * 数独辅助函数模块
 * 包含格式化、坐标转换等辅助功能
 */

/**
 * 难度配置
 */
export const DIFFICULTY_CONFIG = {
  easy: {
    name: '简单',
    color: '#52c41a',
    gradient: ['#95de64', '#52c41a'],
    description: '适合初学者',
    filledCells: '40-45'
  },
  medium: {
    name: '中等',
    color: '#1890ff',
    gradient: ['#69c0ff', '#1890ff'],
    description: '需要一定技巧',
    filledCells: '30-35'
  },
  hard: {
    name: '困难',
    color: '#fa8c16',
    gradient: ['#ffc069', '#fa8c16'],
    description: '挑战你的智慧',
    filledCells: '25-30'
  },
  expert: {
    name: '专家',
    color: '#f5222d',
    gradient: ['#ff7875', '#f5222d'],
    description: '只为高手准备',
    filledCells: '20-25'
  }
}

/**
 * 获取难度配置
 */
export function getDifficultyConfig(difficulty) {
  return DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.easy
}

/**
 * 格式化时间（秒转换为 HH:MM:SS 或 MM:SS）
 */
export function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  if (hours > 0) {
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(secs)}`
  }
  
  return `${padZero(minutes)}:${padZero(secs)}`
}

/**
 * 补零
 */
function padZero(num) {
  return num.toString().padStart(2, '0')
}

/**
 * 获取单元格所在的3x3宫格索引（0-8）
 */
export function getBoxIndex(row, col) {
  return Math.floor(row / 3) * 3 + Math.floor(col / 3)
}

/**
 * 获取同一行的所有单元格坐标
 */
export function getSameRowCells(row) {
  const cells = []
  for (let col = 0; col < 9; col++) {
    cells.push({ row, col })
  }
  return cells
}

/**
 * 获取同一列的所有单元格坐标
 */
export function getSameColCells(col) {
  const cells = []
  for (let row = 0; row < 9; row++) {
    cells.push({ row, col })
  }
  return cells
}

/**
 * 获取同一宫格的所有单元格坐标
 */
export function getSameBoxCells(row, col) {
  const cells = []
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cells.push({
        row: boxRow + i,
        col: boxCol + j
      })
    }
  }
  
  return cells
}

/**
 * 获取与指定单元格相关的所有单元格（同行、同列、同宫格）
 */
export function getRelatedCells(row, col) {
  const cells = new Set()
  
  // 同行
  for (let c = 0; c < 9; c++) {
    if (c !== col) {
      cells.add(`${row}-${c}`)
    }
  }
  
  // 同列
  for (let r = 0; r < 9; r++) {
    if (r !== row) {
      cells.add(`${r}-${col}`)
    }
  }
  
  // 同宫格
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const r = boxRow + i
      const c = boxCol + j
      if (r !== row || c !== col) {
        cells.add(`${r}-${c}`)
      }
    }
  }
  
  // 转换为数组
  return Array.from(cells).map(key => {
    const [r, c] = key.split('-').map(Number)
    return { row: r, col: c }
  })
}

/**
 * 检查两个单元格是否相关（同行、同列或同宫格）
 */
export function areCellsRelated(row1, col1, row2, col2) {
  // 同行
  if (row1 === row2) return true
  
  // 同列
  if (col1 === col2) return true
  
  // 同宫格
  const box1 = getBoxIndex(row1, col1)
  const box2 = getBoxIndex(row2, col2)
  
  return box1 === box2
}

/**
 * 生成空的笔记数据结构
 */
export function createEmptyNotes() {
  const notes = []
  for (let i = 0; i < 9; i++) {
    notes[i] = []
    for (let j = 0; j < 9; j++) {
      notes[i][j] = new Set()
    }
  }
  return notes
}

/**
 * 深拷贝笔记数据
 */
export function cloneNotes(notes) {
  const newNotes = []
  for (let i = 0; i < 9; i++) {
    newNotes[i] = []
    for (let j = 0; j < 9; j++) {
      newNotes[i][j] = new Set(notes[i][j])
    }
  }
  return newNotes
}

/**
 * 计算棋盘完成度（百分比）
 */
export function calculateProgress(board, puzzle) {
  let filled = 0
  let total = 0
  
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (puzzle[i][j] === 0) {
        total++
        if (board[i][j] !== 0) {
          filled++
        }
      }
    }
  }
  
  return total === 0 ? 100 : Math.round((filled / total) * 100)
}

/**
 * 统计空格数量
 */
export function countEmptyCells(board) {
  let count = 0
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        count++
      }
    }
  }
  return count
}

/**
 * 获取所有相同数字的单元格
 */
export function getSameNumberCells(board, num) {
  const cells = []
  
  if (num === 0) return cells
  
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === num) {
        cells.push({ row: i, col: j })
      }
    }
  }
  
  return cells
}

/**
 * 将棋盘转换为字符串（用于存储）
 */
export function boardToString(board) {
  return board.map(row => row.join('')).join('')
}

/**
 * 将字符串转换为棋盘
 */
export function stringToBoard(str) {
  const board = []
  for (let i = 0; i < 9; i++) {
    board[i] = []
    for (let j = 0; j < 9; j++) {
      board[i][j] = parseInt(str[i * 9 + j]) || 0
    }
  }
  return board
}

/**
 * 生成游戏统计数据
 */
export function generateGameStats(difficulty, time, errors, hints) {
  return {
    difficulty,
    time,
    errors,
    hints,
    completedAt: new Date().getTime()
  }
}

/**
 * 获取难度排序值
 */
export function getDifficultyOrder(difficulty) {
  const order = { easy: 1, medium: 2, hard: 3, expert: 4 }
  return order[difficulty] || 1
}

