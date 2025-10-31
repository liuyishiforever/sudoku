<template>
  <div class="input-number">
    <button @click="decrease" class="btn" :disabled="value <= min">-</button>
    <input type="number" :value="value" @input="updateValue($event.target.value)" class="input"  />
    <button @click="increase" class="btn" :disabled="value >= max">+</button>
  </div>
</template>

<script>
export default {
  name: 'InputNumber',
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: -Infinity
    },
    max: {
      type: Number,
      default: Infinity
    }
  },
  methods: {
    decrease() {
      if (this.value > this.min) {
        this.$emit('input', this.value - 1);
      }
    },
    increase() {
      if (this.value < this.max) {
        this.$emit('input', this.value + 1);
      }
    },
    updateValue(value) {
      let numericValue = Number(value);
      if (!isNaN(numericValue)) {
        this.$emit('input', numericValue);
      }
    }
  }
};
</script>

<style scoped>
.input-number {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  width: 120px;
}

.btn {
  background-color: #f0f0f0;
  border: none;
  padding: 10px;
  cursor: pointer;
  width: 30px;
  text-align: center;
  font-size: 16px;
  transition: background-color 0.2s;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.btn:not(:disabled):hover {
  background-color: #e0e0e0;
}

.input {
  border: none;
  width: 60px;
  text-align: center;
  font-size: 16px;
  outline: none;
  -moz-appearance: textfield;
}

.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
