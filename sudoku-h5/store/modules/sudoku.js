/**
 * 数独游戏状态管理模块
 */
import { 
  generateSudoku, 
  isComplete, 
  checkConflicts,
  getCandidates,
  getHint,
  cloneBoard
} from '@/utils/sudoku'
import { 
  createEmptyNotes, 
  cloneNotes, 
  calculateProgress,
  countEmptyCells,
  boardToString,
  stringToBoard
} from '@/utils/sudoku-helper'

const STORAGE_KEY = 'sudoku_game_state'

const state = {
  // 游戏配置
  difficulty: 'easy', // 难度级别
  
  // 棋盘状态
  puzzle: null,      // 初始题目（原始棋盘，不可修改的单元格）
  board: null,       // 当前棋盘状态
  solution: null,    // 答案
  
  // 用户交互状态
  selectedCell: null, // 选中的单元格 {row, col}
  noteMode: false,    // 笔记模式
  notes: null,        // 笔记数据 9x9 数组，每个元素是Set
  
  // 游戏状态
  isPlaying: false,   // 是否正在游戏
  isPaused: false,    // 是否暂停
  isComplete: false,  // 是否完成
  
  // 游戏统计
  startTime: 0,       // 开始时间
  elapsedTime: 0,     // 已用时间（秒）
  errors: 0,          // 错误次数
  hintsUsed: 0,       // 提示使用次数
  
  // 历史记录（支持撤销/重做）
  history: [],        // 历史操作栈
  historyIndex: -1,   // 当前历史索引
  
  // 高亮相关
  conflicts: []       // 冲突单元格列表
}

const getters = {
  // 是否可以撤销
  canUndo: state => state.historyIndex > 0,
  
  // 是否可以重做
  canRedo: state => state.historyIndex < state.history.length - 1,
  
  // 游戏进度
  progress: state => {
    if (!state.puzzle || !state.board) return 0
    return calculateProgress(state.board, state.puzzle)
  },
  
  // 剩余空格数
  remainingCells: state => {
    if (!state.board) return 0
    return countEmptyCells(state.board)
  },
  
  // 指定单元格是否为初始题目（不可编辑）
  isOriginalCell: state => (row, col) => {
    if (!state.puzzle) return false
    return state.puzzle[row][col] !== 0
  },
  
  // 获取指定单元格的笔记
  getCellNotes: state => (row, col) => {
    if (!state.notes || !state.notes[row] || !state.notes[row][col]) {
      return []
    }
    return Array.from(state.notes[row][col])
  }
}

const mutations = {
  // 设置难度
  SET_DIFFICULTY(state, difficulty) {
    state.difficulty = difficulty
  },
  
  // 初始化游戏
  INIT_GAME(state, { puzzle, solution, difficulty }) {
    state.difficulty = difficulty
    state.puzzle = puzzle
    state.board = cloneBoard(puzzle)
    state.solution = solution
    state.notes = createEmptyNotes()
    state.selectedCell = null
    state.noteMode = false
    state.isPlaying = true
    state.isPaused = false
    state.isComplete = false
    state.startTime = Date.now()
    state.elapsedTime = 0
    state.errors = 0
    state.hintsUsed = 0
    state.history = []
    state.historyIndex = -1
    state.conflicts = []
    
    // 保存初始状态到历史
    saveToHistory(state)
  },
  
  // 选择单元格
  SELECT_CELL(state, { row, col }) {
    state.selectedCell = { row, col }
  },
  
  // 取消选择
  DESELECT_CELL(state) {
    state.selectedCell = null
  },
  
  // 设置单元格值
  SET_CELL_VALUE(state, { row, col, value }) {
    if (state.puzzle[row][col] !== 0) {
      // 不能修改初始题目
      return
    }
    
    const oldValue = state.board[row][col]
    // 使用Vue.set确保响应性
    const Vue = require('vue').default
    Vue.set(state.board[row], col, value)
    
    // 清除该单元格的笔记（无论是填入数字还是清空）
    if (state.notes[row][col]) {
      state.notes[row][col].clear()
    }
    
    // 检查是否有冲突
    if (value !== 0) {
      const { hasConflict, conflicts } = checkConflicts(state.board, row, col, value)
      
      if (hasConflict) {
        state.conflicts = conflicts
        // 如果与答案不符，增加错误计数
        if (state.solution[row][col] !== value) {
          state.errors++
        }
      } else {
        state.conflicts = []
      }
    } else {
      state.conflicts = []
    }
    
    // 保存到历史（如果值确实改变了）
    if (oldValue !== value) {
      saveToHistory(state)
    }
    
    // 检查是否完成
    if (isComplete(state.board)) {
      state.isComplete = true
      state.isPlaying = false
    }
  },
  
  // 切换笔记模式
  TOGGLE_NOTE_MODE(state) {
    state.noteMode = !state.noteMode
  },
  
  // 添加/删除笔记
  TOGGLE_NOTE(state, { row, col, num }) {
    if (state.puzzle[row][col] !== 0 || state.board[row][col] !== 0) {
      // 不能给已填入数字的单元格做笔记
      return
    }
    
    if (!state.notes[row][col]) {
      state.notes[row][col] = new Set()
    }
    
    // 创建新的Set来触发Vue响应性
    const newSet = new Set(state.notes[row][col])
    if (newSet.has(num)) {
      newSet.delete(num)
    } else {
      newSet.add(num)
    }
    
    // 使用Vue.set确保响应性
    const Vue = require('vue').default
    Vue.set(state.notes[row], col, newSet)
    
    saveToHistory(state)
  },
  
  // 暂停游戏
  PAUSE_GAME(state) {
    state.isPaused = true
    // 计算已用时间
    if (state.startTime > 0) {
      state.elapsedTime += Math.floor((Date.now() - state.startTime) / 1000)
      state.startTime = 0
    }
  },
  
  // 继续游戏
  RESUME_GAME(state) {
    state.isPaused = false
    state.startTime = Date.now()
  },
  
  // 更新已用时间
  UPDATE_ELAPSED_TIME(state) {
    if (state.startTime > 0 && !state.isPaused) {
      state.elapsedTime = Math.floor((Date.now() - state.startTime) / 1000)
    }
  },
  
  // 使用提示
  USE_HINT(state, { row, col, value }) {
    state.board[row][col] = value
    state.hintsUsed++
    
    // 清除该单元格的笔记
    if (state.notes[row][col]) {
      state.notes[row][col].clear()
    }
    
    state.conflicts = []
    saveToHistory(state)
    
    // 检查是否完成
    if (isComplete(state.board)) {
      state.isComplete = true
      state.isPlaying = false
    }
  },
  
  // 设置完成状态
  SET_COMPLETE(state, isComplete) {
    state.isComplete = isComplete
    if (isComplete) {
      state.isPlaying = false
    }
  },
  
  // 撤销
  UNDO(state) {
    if (state.historyIndex > 0) {
      state.historyIndex--
      restoreFromHistory(state, state.history[state.historyIndex])
    }
  },
  
  // 重做
  REDO(state) {
    if (state.historyIndex < state.history.length - 1) {
      state.historyIndex++
      restoreFromHistory(state, state.history[state.historyIndex])
    }
  },
  
  // 重新开始
  RESTART_GAME(state) {
    state.board = cloneBoard(state.puzzle)
    state.notes = createEmptyNotes()
    state.selectedCell = null
    state.noteMode = false
    state.isPlaying = true
    state.isPaused = false
    state.isComplete = false
    state.startTime = Date.now()
    state.elapsedTime = 0
    state.errors = 0
    state.hintsUsed = 0
    state.history = []
    state.historyIndex = -1
    state.conflicts = []
    
    saveToHistory(state)
  },
  
  // 加载游戏状态
  LOAD_GAME(state, savedState) {
    Object.assign(state, savedState)
    // 恢复Set类型的笔记数据
    if (savedState.notesArray) {
      state.notes = createEmptyNotes()
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          state.notes[i][j] = new Set(savedState.notesArray[i][j])
        }
      }
    }
    // 如果游戏正在进行，重新设置开始时间
    if (state.isPlaying && !state.isPaused) {
      state.startTime = Date.now()
    }
  },
  
  // 清空游戏
  CLEAR_GAME(state) {
    state.difficulty = 'easy'
    state.puzzle = null
    state.board = null
    state.solution = null
    state.notes = null
    state.selectedCell = null
    state.noteMode = false
    state.isPlaying = false
    state.isPaused = false
    state.isComplete = false
    state.startTime = 0
    state.elapsedTime = 0
    state.errors = 0
    state.hintsUsed = 0
    state.history = []
    state.historyIndex = -1
    state.conflicts = []
  }
}

const actions = {
  // 开始新游戏
  startNewGame({ commit }, difficulty) {
    const { puzzle, solution } = generateSudoku(difficulty)
    commit('INIT_GAME', { puzzle, solution, difficulty })
    // 保存游戏状态
    this.dispatch('sudoku/saveGame')
  },
  
  // 选择单元格
  selectCell({ commit, getters }, { row, col }) {
    // 检查是否为初始题目
    if (getters.isOriginalCell(row, col)) {
      return
    }
    commit('SELECT_CELL', { row, col })
  },
  
  // 输入数字
  inputNumber({ commit, state, getters }, num) {
    if (!state.selectedCell) return
    
    const { row, col } = state.selectedCell
    
    // 检查是否为初始题目
    if (getters.isOriginalCell(row, col)) {
      return
    }
    
    if (state.noteMode) {
      // 笔记模式
      commit('TOGGLE_NOTE', { row, col, num })
    } else {
      // 普通模式
      commit('SET_CELL_VALUE', { row, col, value: num })
    }
    
    // 保存游戏状态
    this.dispatch('sudoku/saveGame')
  },
  
  // 清除单元格
  clearCell({ commit, state, getters }) {
    if (!state.selectedCell) return
    
    const { row, col } = state.selectedCell
    
    // 检查是否为初始题目
    if (getters.isOriginalCell(row, col)) {
      return
    }
    
    commit('SET_CELL_VALUE', { row, col, value: 0 })
    
    // 保存游戏状态
    this.dispatch('sudoku/saveGame')
  },
  
  // 切换笔记模式
  toggleNoteMode({ commit }) {
    commit('TOGGLE_NOTE_MODE')
  },
  
  // 使用提示
  useHint({ commit, state }) {
    if (!state.board || !state.solution) return
    
    const hint = getHint(state.board, state.solution)
    
    if (hint) {
      commit('USE_HINT', hint)
      // 选中提示的单元格
      commit('SELECT_CELL', { row: hint.row, col: hint.col })
      
      // 保存游戏状态
      this.dispatch('sudoku/saveGame')
      
      return hint
    }
    
    return null
  },
  
  // 撤销
  undo({ commit, getters }) {
    if (getters.canUndo) {
      commit('UNDO')
      this.dispatch('sudoku/saveGame')
    }
  },
  
  // 重做
  redo({ commit, getters }) {
    if (getters.canRedo) {
      commit('REDO')
      this.dispatch('sudoku/saveGame')
    }
  },
  
  // 暂停游戏
  pauseGame({ commit, state }) {
    if (state.isPlaying && !state.isPaused) {
      commit('PAUSE_GAME')
      this.dispatch('sudoku/saveGame')
    }
  },
  
  // 继续游戏
  resumeGame({ commit, state }) {
    if (state.isPlaying && state.isPaused) {
      commit('RESUME_GAME')
      this.dispatch('sudoku/saveGame')
    }
  },
  
  // 重新开始
  restartGame({ commit }) {
    commit('RESTART_GAME')
    this.dispatch('sudoku/saveGame')
  },
  
  // 保存游戏状态到本地存储
  saveGame({ state }) {
    if (!state.puzzle || !state.board) return
    
    // 计算当前已用时间
    let currentElapsedTime = state.elapsedTime
    if (state.startTime > 0 && !state.isPaused) {
      currentElapsedTime += Math.floor((Date.now() - state.startTime) / 1000)
    }
    
    // 转换笔记数据为可序列化的格式
    const notesArray = []
    for (let i = 0; i < 9; i++) {
      notesArray[i] = []
      for (let j = 0; j < 9; j++) {
        notesArray[i][j] = state.notes[i][j] ? Array.from(state.notes[i][j]) : []
      }
    }
    
    const savedState = {
      difficulty: state.difficulty,
      puzzle: state.puzzle,
      board: state.board,
      solution: state.solution,
      notesArray,
      elapsedTime: currentElapsedTime,
      errors: state.errors,
      hintsUsed: state.hintsUsed,
      isPlaying: state.isPlaying,
      isPaused: state.isPaused,
      isComplete: state.isComplete,
      savedAt: Date.now()
    }
    
    try {
      uni.setStorageSync(STORAGE_KEY, savedState)
    } catch (e) {
      console.error('保存游戏失败:', e)
    }
  },
  
  // 从本地存储加载游戏
  loadGame({ commit }) {
    try {
      const savedState = uni.getStorageSync(STORAGE_KEY)
      
      if (savedState && savedState.puzzle && savedState.board) {
        // 检查是否已完成
        if (savedState.isComplete) {
          return false
        }
        
        commit('LOAD_GAME', savedState)
        return true
      }
      
      return false
    } catch (e) {
      console.error('加载游戏失败:', e)
      return false
    }
  },
  
  // 清除保存的游戏
  clearSavedGame({ commit }) {
    try {
      uni.removeStorageSync(STORAGE_KEY)
      commit('CLEAR_GAME')
    } catch (e) {
      console.error('清除游戏失败:', e)
    }
  }
}

// 辅助函数：保存到历史
function saveToHistory(state) {
  // 删除当前索引之后的历史
  state.history = state.history.slice(0, state.historyIndex + 1)
  
  // 保存当前状态
  const snapshot = {
    board: cloneBoard(state.board),
    notes: cloneNotes(state.notes)
  }
  
  state.history.push(snapshot)
  state.historyIndex++
  
  // 限制历史记录数量（最多50条）
  if (state.history.length > 50) {
    state.history.shift()
    state.historyIndex--
  }
}

// 辅助函数：从历史恢复
function restoreFromHistory(state, snapshot) {
  state.board = cloneBoard(snapshot.board)
  state.notes = cloneNotes(snapshot.notes)
  state.conflicts = []
  
  // 检查是否完成
  state.isComplete = isComplete(state.board)
  if (state.isComplete) {
    state.isPlaying = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

