<template>
  <view 
    class="sudoku-cell"
    :class="cellClasses"
    :style="cellStyle"
    @tap.stop="handleTap"
  >
    <!-- 初始数字 -->
    <text v-if="isOriginal" class="cell-value original">{{ displayValue }}</text>
    
    <!-- 用户填入的数字 -->
    <text v-else-if="value !== 0" class="cell-value user">{{ displayValue }}</text>
    
    <!-- 笔记 -->
    <view v-else-if="notes.length > 0" class="cell-notes">
      <view 
        v-for="num in 9" 
        :key="num" 
        class="note-item"
        :class="{ active: notes.includes(num) }"
      >
        <text v-if="notes.includes(num)" class="note-text">{{ num }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'SudokuCell',
  props: {
    // 单元格的值
    value: {
      type: Number,
      default: 0
    },
    // 是否为初始题目
    isOriginal: {
      type: Boolean,
      default: false
    },
    // 是否选中
    isSelected: {
      type: Boolean,
      default: false
    },
    // 是否高亮（同行、列、宫格）
    isHighlighted: {
      type: Boolean,
      default: false
    },
    // 是否为相同数字
    isSameNumber: {
      type: Boolean,
      default: false
    },
    // 是否有冲突
    hasConflict: {
      type: Boolean,
      default: false
    },
    // 笔记
    notes: {
      type: Array,
      default: () => []
    },
    // 行索引
    row: {
      type: Number,
      required: true
    },
    // 列索引
    col: {
      type: Number,
      required: true
    }
  },
  computed: {
    displayValue() {
      return this.value === 0 ? '' : this.value
    },
    cellClasses() {
      return {
        selected: this.isSelected,
        highlighted: this.isHighlighted && !this.isSelected,
        'same-number': this.isSameNumber && !this.isSelected && !this.isHighlighted,
        conflict: this.hasConflict,
        original: this.isOriginal,
        // 3×3宫格的粗边框：第2、5列有右边框（第8列不需要，因为是最外围）
        'right-border': this.col % 3 === 2 && this.col !== 8,
        // 3×3宫格的粗边框：第2、5行有下边框（第8行不需要，因为是最外围）
        'bottom-border': this.row % 3 === 2 && this.row !== 8
      }
    },
    // 使用内联样式确保正确应用背景色
    cellStyle() {
      let backgroundColor = '#fff'
      
      // 优先级：冲突 > 选中 > 高亮 > 相同数字
      if (this.hasConflict) {
        backgroundColor = '#ffcdd2'
      } else if (this.isSelected) {
        backgroundColor = '#bbdefb'
      } else if (this.isHighlighted) {
        backgroundColor = '#e3f2fd'
      } else if (this.isSameNumber) {
        backgroundColor = '#c8e6c9'
      }
      
      return {
        backgroundColor: backgroundColor
      }
    }
  },
  methods: {
    handleTap() {
      const row = Number(this.row)
      const col = Number(this.col)
      
      // 验证参数有效性
      if (isNaN(row) || isNaN(col) || row < 0 || row >= 9 || col < 0 || col >= 9) {
        console.error('SudokuCell: 无效的行列参数', { row: this.row, col: this.col })
        return
      }
      
      // 触发点击事件，传递明确的对象
      this.$emit('cell-tap', {
        row: row,
        col: col
      })
    }
  }
}
</script>

<style scoped>
.sudoku-cell {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1rpx solid #d9d9d9;
  position: relative;
  transition: background-color 0.2s ease;
  box-sizing: border-box;
}

/* 3×3宫格的粗边框 - 最高优先级 */
.sudoku-cell.right-border {
  border-right-width: 4rpx !important;
  border-right-color: #999 !important;
  border-right-style: solid !important;
}

.sudoku-cell.bottom-border {
  border-bottom-width: 4rpx !important;
  border-bottom-color: #999 !important;
  border-bottom-style: solid !important;
}

/* 高亮状态 - 同行/列/宫格（优先级高于基础样式，但低于选中状态） */
.sudoku-cell.highlighted {
  background-color: #e3f2fd !important;
}

/* 相同数字（优先级低于高亮和选中） */
.sudoku-cell.same-number {
  background-color: #c8e6c9 !important;
}

/* 选中状态 - 最高优先级背景色 */
.sudoku-cell.selected {
  background-color: #bbdefb !important;
  z-index: 10;
  /* 选中时非粗边框的边使用蓝色 */
  border-color: #1890ff !important;
}

/* 选中状态时，3×3粗边框保持浅灰色（优先级最高） */
.sudoku-cell.selected.right-border {
  border-right-width: 4rpx !important;
  border-right-color: #999 !important;
  border-right-style: solid !important;
}

.sudoku-cell.selected.bottom-border {
  border-bottom-width: 4rpx !important;
  border-bottom-color: #999 !important;
  border-bottom-style: solid !important;
}

/* 冲突状态 - 最高优先级背景色 */
.sudoku-cell.conflict {
  background-color: #ffcdd2 !important;
}

/* 冲突状态时保持3×3粗边框 */
.sudoku-cell.conflict.right-border {
  border-right-width: 4rpx !important;
  border-right-color: #999 !important;
}

.sudoku-cell.conflict.bottom-border {
  border-bottom-width: 4rpx !important;
  border-bottom-color: #999 !important;
}

.cell-value {
  font-size: 40rpx;
  font-weight: 600;
  line-height: 1;
  z-index: 1;
}

.cell-value.original {
  color: #333;
  font-weight: 700;
}

.cell-value.user {
  color: #1890ff;
  font-weight: 600;
}

.cell-notes {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 2rpx;
  box-sizing: border-box;
  z-index: 1;
}

.note-item {
  width: 33.333%;
  height: 33.333%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.note-text {
  font-size: 18rpx;
  color: #666;
  font-weight: 500;
  line-height: 1;
  text-align: center;
}

.note-item.active .note-text {
  color: #666;
  font-weight: 500;
}
</style>
