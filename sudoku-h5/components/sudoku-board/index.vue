<template>
  <view class="sudoku-board">
    <view 
      v-for="(row, rowIndex) in board" 
      :key="rowIndex" 
      class="board-row"
    >
      <view
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        class="board-cell"
      >
        <sudoku-cell
          :value="cell"
          :is-original="isOriginalCell(rowIndex, colIndex)"
          :is-selected="isCellSelected(rowIndex, colIndex)"
          :is-highlighted="isCellHighlighted(rowIndex, colIndex)"
          :is-same-number="isCellSameNumber(rowIndex, colIndex)"
          :has-conflict="isCellConflict(rowIndex, colIndex)"
          :notes="getCellNotes(rowIndex, colIndex)"
          :row="rowIndex"
          :col="colIndex"
          @tap="handleCellClick"
        />
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import SudokuCell from '@/components/sudoku-cell/index.vue'
import { getRelatedCells } from '@/utils/sudoku-helper'

export default {
  name: 'SudokuBoard',
  components: {
    SudokuCell
  },
  computed: {
    ...mapState('sudoku', ['board', 'puzzle', 'selectedCell', 'conflicts']),
    ...mapGetters('sudoku', ['isOriginalCell', 'getCellNotes'])
  },
  methods: {
    handleCellClick({ row, col }) {
      this.$emit('cell-click', { row, col })
    },
    
    isCellSelected(row, col) {
      if (!this.selectedCell) return false
      return this.selectedCell.row === row && this.selectedCell.col === col
    },
    
    isCellHighlighted(row, col) {
      if (!this.selectedCell) return false
      if (this.isCellSelected(row, col)) return false
      
      const { row: selectedRow, col: selectedCol } = this.selectedCell
      
      // 同行、同列或同宫格
      if (selectedRow === row || selectedCol === col) return true
      
      const boxRow = Math.floor(selectedRow / 3)
      const boxCol = Math.floor(selectedCol / 3)
      const cellBoxRow = Math.floor(row / 3)
      const cellBoxCol = Math.floor(col / 3)
      
      return boxRow === cellBoxRow && boxCol === cellBoxCol
    },
    
    isCellSameNumber(row, col) {
      if (!this.selectedCell || !this.board) return false
      
      const selectedValue = this.board[this.selectedCell.row][this.selectedCell.col]
      const cellValue = this.board[row][col]
      
      return selectedValue !== 0 && cellValue !== 0 && selectedValue === cellValue
    },
    
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
  background-color: #333;
  border: 4rpx solid #333;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
  margin: 0 auto;
}

.board-row {
  height: 78.89rpx;
  display: flex;
  flex: 1;
}

.board-cell {
  width: 78.89rpx;
  height: 100%;
  display: flex;
  flex: 1;
}
</style>

