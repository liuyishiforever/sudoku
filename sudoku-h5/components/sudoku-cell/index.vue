<template>
  <view 
    class="sudoku-cell"
    :class="cellClasses"
    @click="handleClick"
  >
    <!-- 初始数字 -->
    <text v-if="isOriginal" class="cell-value original">{{ displayValue }}</text>
    
    <!-- 用户填入的数字 -->
    <text v-else-if="value !== 0" class="cell-value user">{{ displayValue }}</text>
    
    <!-- 笔记 -->
    <view v-else-if="notes.length > 0" class="cell-notes">
      <text 
        v-for="num in 9" 
        :key="num" 
        class="note-item"
        :class="{ active: notes.includes(num) }"
      >
        {{ notes.includes(num) ? num : '' }}
      </text>
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
        highlighted: this.isHighlighted,
        'same-number': this.isSameNumber,
        conflict: this.hasConflict,
        original: this.isOriginal,
        'right-border': (this.col + 1) % 3 === 0 && this.col !== 8,
        'bottom-border': (this.row + 1) % 3 === 0 && this.row !== 8
      }
    }
  },
  methods: {
    handleClick() {
      this.$emit('click', { row: this.row, col: this.col })
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
  transition: all 0.2s ease;
}

.sudoku-cell.selected {
  background-color: #bbdefb !important;
  border-color: #1890ff;
  box-shadow: inset 0 0 0 2rpx #1890ff;
}

.sudoku-cell.highlighted {
  background-color: #e3f2fd;
}

.sudoku-cell.same-number {
  background-color: #c8e6c9;
}

.sudoku-cell.conflict {
  background-color: #ffcdd2 !important;
}

.sudoku-cell.right-border {
  border-right-width: 3rpx;
  border-right-color: #333;
}

.sudoku-cell.bottom-border {
  border-bottom-width: 3rpx;
  border-bottom-color: #333;
}

.cell-value {
  font-size: 40rpx;
  font-weight: 600;
  line-height: 1;
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  padding: 4rpx;
}

.note-item {
  font-size: 18rpx;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.note-item.active {
  color: #666;
  font-weight: 500;
}
</style>

