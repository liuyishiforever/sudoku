/**
 * 数独核心算法模块
 * 包含数独生成、求解、验证等核心功能
 */

/**
 * 生成一个完整的9x9数独解
 */
function generateFullSudoku() {
  const board = Array(9).fill(0).map(() => Array(9).fill(0))
  
  // 使用回溯算法填充数独
  fillSudoku(board)
  
  return board
}

/**
 * 使用回溯算法填充数独
 */
function fillSudoku(board, row = 0, col = 0) {
  // 如果已经填完所有行，返回true
  if (row === 9) {
    return true
  }
  
  // 计算下一个位置
  const nextRow = col === 8 ? row + 1 : row
  const nextCol = col === 8 ? 0 : col + 1
  
  // 随机生成1-9的数字顺序
  const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9])
  
  for (let num of numbers) {
    if (isValidPlacement(board, row, col, num)) {
      board[row][col] = num
      
      if (fillSudoku(board, nextRow, nextCol)) {
        return true
      }
      
      board[row][col] = 0
    }
  }
  
  return false
}

/**
 * 检查在指定位置放置数字是否有效
 */
function isValidPlacement(board, row, col, num) {
  // 检查行
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) {
      return false
    }
  }
  
  // 检查列
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) {
      return false
    }
  }
  
  // 检查3x3宫格
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === num) {
        return false
      }
    }
  }
  
  return true
}

/**
 * 随机打乱数组
 */
function shuffleArray(array) {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

/**
 * 根据难度生成数独题目
 * @param {string} difficulty - 难度级别：'easy', 'medium', 'hard', 'expert'
 * @returns {Object} 包含题目和解答的对象
 */
function generateSudoku(difficulty = 'easy') {
  // 生成完整的数独解
  const solution = generateFullSudoku()
  
  // 复制一份作为题目
  const puzzle = solution.map(row => [...row])
  
  // 根据难度确定要移除的数字数量
  const cellsToRemove = getCellsToRemove(difficulty)
  
  // 随机移除数字
  const positions = []
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      positions.push([i, j])
    }
  }
  
  // 打乱位置数组
  const shuffledPositions = shuffleArray(positions)
  
  // 移除指定数量的数字
  for (let i = 0; i < cellsToRemove && i < shuffledPositions.length; i++) {
    const [row, col] = shuffledPositions[i]
    puzzle[row][col] = 0
  }
  
  return {
    puzzle,
    solution
  }
}

/**
 * 根据难度获取要移除的单元格数量
 */
function getCellsToRemove(difficulty) {
  const difficulties = {
    easy: Math.floor(Math.random() * 6) + 36,    // 36-41个空格（40-45个预填）
    medium: Math.floor(Math.random() * 6) + 46,  // 46-51个空格（30-35个预填）
    hard: Math.floor(Math.random() * 6) + 51,    // 51-56个空格（25-30个预填）
    expert: Math.floor(Math.random() * 6) + 56   // 56-61个空格（20-25个预填）
  }
  
  return difficulties[difficulty] || difficulties.easy
}

/**
 * 求解数独
 * @param {Array} board - 数独棋盘
 * @returns {boolean} 是否成功求解
 */
function solveSudoku(board) {
  const emptyCell = findEmptyCell(board)
  
  if (!emptyCell) {
    return true // 没有空格，求解完成
  }
  
  const [row, col] = emptyCell
  
  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(board, row, col, num)) {
      board[row][col] = num
      
      if (solveSudoku(board)) {
        return true
      }
      
      board[row][col] = 0
    }
  }
  
  return false
}

/**
 * 查找第一个空格
 */
function findEmptyCell(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        return [i, j]
      }
    }
  }
  return null
}

/**
 * 检查当前棋盘是否完成且正确
 */
function isComplete(board) {
  // 检查是否还有空格
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        return false
      }
    }
  }
  
  // 检查是否所有数字都符合规则
  return isValid(board)
}

/**
 * 检查整个棋盘是否有效
 */
function isValid(board) {
  // 检查每一行
  for (let i = 0; i < 9; i++) {
    if (!isRowValid(board, i)) {
      return false
    }
  }
  
  // 检查每一列
  for (let j = 0; j < 9; j++) {
    if (!isColValid(board, j)) {
      return false
    }
  }
  
  // 检查每个3x3宫格
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      if (!isBoxValid(board, i, j)) {
        return false
      }
    }
  }
  
  return true
}

/**
 * 检查行是否有效
 */
function isRowValid(board, row) {
  const seen = new Set()
  for (let col = 0; col < 9; col++) {
    const num = board[row][col]
    if (num !== 0) {
      if (seen.has(num)) {
        return false
      }
      seen.add(num)
    }
  }
  return true
}

/**
 * 检查列是否有效
 */
function isColValid(board, col) {
  const seen = new Set()
  for (let row = 0; row < 9; row++) {
    const num = board[row][col]
    if (num !== 0) {
      if (seen.has(num)) {
        return false
      }
      seen.add(num)
    }
  }
  return true
}

/**
 * 检查3x3宫格是否有效
 */
function isBoxValid(board, startRow, startCol) {
  const seen = new Set()
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const num = board[startRow + i][startCol + j]
      if (num !== 0) {
        if (seen.has(num)) {
          return false
        }
        seen.add(num)
      }
    }
  }
  return true
}

/**
 * 检查在指定位置放置数字是否会产生冲突
 * @returns {Object} 包含冲突信息的对象
 */
function checkConflicts(board, row, col, num) {
  if (num === 0) {
    return { hasConflict: false, conflicts: [] }
  }
  
  const conflicts = []
  
  // 检查行冲突
  for (let x = 0; x < 9; x++) {
    if (x !== col && board[row][x] === num) {
      conflicts.push({ row, col: x, type: 'row' })
    }
  }
  
  // 检查列冲突
  for (let x = 0; x < 9; x++) {
    if (x !== row && board[x][col] === num) {
      conflicts.push({ row: x, col, type: 'col' })
    }
  }
  
  // 检查3x3宫格冲突
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const r = boxRow + i
      const c = boxCol + j
      if ((r !== row || c !== col) && board[r][c] === num) {
        conflicts.push({ row: r, col: c, type: 'box' })
      }
    }
  }
  
  return {
    hasConflict: conflicts.length > 0,
    conflicts
  }
}

/**
 * 获取指定单元格的候选数字
 */
function getCandidates(board, row, col) {
  if (board[row][col] !== 0) {
    return []
  }
  
  const candidates = []
  
  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(board, row, col, num)) {
      candidates.push(num)
    }
  }
  
  return candidates
}

/**
 * 获取提示（找到一个可以填入的正确数字）
 */
function getHint(board, solution) {
  const emptyCells = []
  
  // 找到所有空格
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        emptyCells.push([i, j])
      }
    }
  }
  
  if (emptyCells.length === 0) {
    return null
  }
  
  // 随机选择一个空格
  const randomIndex = Math.floor(Math.random() * emptyCells.length)
  const [row, col] = emptyCells[randomIndex]
  
  return {
    row,
    col,
    value: solution[row][col]
  }
}

/**
 * 深拷贝棋盘
 */
function cloneBoard(board) {
  return board.map(row => [...row])
}

export {
  generateSudoku,
  solveSudoku,
  isComplete,
  isValid,
  isValidPlacement,
  checkConflicts,
  getCandidates,
  getHint,
  cloneBoard
}

