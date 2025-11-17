<template>
  <view class="sudoku-board">
    <view 
      v-for="(row, rowIndex) in board" 
      :key="`row-${rowIndex}`" 
      class="board-row"
    >
      <view
        v-for="(cell, colIndex) in row"
        :key="`cell-${rowIndex}-${colIndex}-${selectedCellKey}`"
        class="board-cell"
      >
        <sudoku-cell
          :key="`sudoku-cell-${rowIndex}-${colIndex}-${selectedCellKey}`"
          :value="cell"
          :is-original="isOriginalCell(rowIndex, colIndex)"
          :is-selected="getCellState(rowIndex, colIndex, 'isSelected')"
          :is-highlighted="getCellState(rowIndex, colIndex, 'isHighlighted')"
          :is-same-number="getCellState(rowIndex, colIndex, 'isSameNumber')"
          :has-conflict="getCellState(rowIndex, colIndex, 'hasConflict')"
          :notes="getCellNotes(rowIndex, colIndex)"
          :row="rowIndex"
          :col="colIndex"
          @cell-tap="onCellTap"
        />
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import SudokuCell from '@/components/sudoku-cell/index.vue'

export default {
  name: 'SudokuBoard',
  components: {
    SudokuCell
  },
  computed: {
    ...mapState('sudoku', ['board', 'puzzle', 'selectedCell', 'conflicts']),
    ...mapGetters('sudoku', ['isOriginalCell', 'getCellNotes']),
    
    // 确保响应式更新 - 用于生成动态key
    selectedCellKey() {
      if (!this.selectedCell) return 'none'
      return `${this.selectedCell.row}-${this.selectedCell.col}`
    },
    
    // 预计算所有单元格的状态
    cellStates() {
      if (!this.board) return []
      
      const states = []
      for (let row = 0; row < 9; row++) {
        states[row] = []
        for (let col = 0; col < 9; col++) {
          states[row][col] = {
            isSelected: this.isCellSelected(row, col),
            isHighlighted: this.isCellHighlighted(row, col),
            isSameNumber: this.isCellSameNumber(row, col),
            hasConflict: this.isCellConflict(row, col)
          }
        }
      }
      return states
    }
  },
  methods: {
    // 获取单元格状态（辅助方法）
    getCellState(row, col, stateType) {
      if (!this.cellStates || !this.cellStates[row] || !this.cellStates[row][col]) {
        return false
      }
      return this.cellStates[row][col][stateType] || false
    },
    
    // 处理单元格点击事件
    onCellTap(data) {
      // 确保接收到有效的行列数据
      if (!data || typeof data !== 'object') {
        console.error('SudokuBoard: 无效的事件数据', data)
        return
      }
      
      const row = Number(data.row)
      const col = Number(data.col)
      
      // 验证参数
      if (isNaN(row) || isNaN(col) || row < 0 || row >= 9 || col < 0 || col >= 9) {
        console.error('SudokuBoard: 无效的行列参数', data)
        return
      }
      
      // 向上传递事件
      this.$emit('cell-click', {
        row: row,
        col: col
      })
    },
    
    // 判断单元格是否被选中
    isCellSelected(row, col) {
      if (!this.selectedCell) return false
      return this.selectedCell.row === row && this.selectedCell.col === col
    },
    
    // 判断单元格是否应该高亮（同行、同列、同宫格）
    isCellHighlighted(row, col) {
      if (!this.selectedCell) return false
      if (this.isCellSelected(row, col)) return false
      
      const { row: selectedRow, col: selectedCol } = this.selectedCell
      
      // 同行或同列
      if (selectedRow === row || selectedCol === col) return true
      
      // 同宫格
      const boxRow = Math.floor(selectedRow / 3)
      const boxCol = Math.floor(selectedCol / 3)
      const cellBoxRow = Math.floor(row / 3)
      const cellBoxCol = Math.floor(col / 3)
      
      return boxRow === cellBoxRow && boxCol === cellBoxCol
    },
    
    // 判断单元格是否为相同数字
    isCellSameNumber(row, col) {
      if (!this.selectedCell || !this.board) return false
      
      const selectedValue = this.board[this.selectedCell.row][this.selectedCell.col]
      const cellValue = this.board[row][col]
      
      return selectedValue !== 0 && cellValue !== 0 && selectedValue === cellValue
    },
    
    // 判断单元格是否有冲突
    isCellConflict(row, col) {
      if (!this.conflicts || this.conflicts.length === 0) return false
      
      return this.conflicts.some(c => c.row === row && c.col === col)
    }
  }
}
</script>

<style scoped>
.sudoku-board {
  width: 710rpx;
  height: 710rpx;
  background-color: #999;
  border: 4rpx solid #999;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
  margin: 0 auto;
  box-sizing: border-box;
  overflow: hidden;
}

.board-row {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 78.89rpx;
  flex-shrink: 0;
}

.board-cell {
  width: 78.89rpx;
  height: 100%;
  flex-shrink: 0;
  position: relative;
}
</style>
