<template>
  <div :class="checkClass">
    <label 
      :for="checkId" 
      class="dan"
    >
      {{ label }}
    </label>
    <input 
      class="inp-cbx" 
      :id="checkId" 
      type="checkbox" 
      style="display: none" 
      :checked="isChecked" 
      :value="value" 
      @change="updateInput"
    />
    <label 
      class="cbx" 
      :for="checkId"
    >
      <span>
        <svg width="12px" height="9px" viewbox="0 0 12 9">
          <polyline points="1 5 4 8 11 1"></polyline>
        </svg>
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: "CheckboxCustom",

  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    "value": { type: String, default: "" },
    "modelValue": { default: "" },
    "label": { type: String},
    "trueValue": { default: true },
    "falseValue": { default: false },
    "checkId": { type: String, default: "cbx" },
    "checkClass": { type: String, default: "" }
  },
  computed: {
    isChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value)
      }
      // Note that `true-value` and `false-value` are camelCase in the JS
      return this.modelValue === this.trueValue
    }
  },
  methods: {
    updateInput(event) {
      let isChecked = event.target.checked
      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue]
        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }
        this.$emit('change', newValue)
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue)
      }
    }
  }

}
</script>

<style>
.custom__check {
  row-gap: .5em;
}
.cbx {
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
}
.cbx span {
  display: inline-block;
  vertical-align: middle;
  transform: translate3d(0, 0, 0);
}
.cbx span:first-child {
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transform: scale(1);
  vertical-align: middle;
  border: 1px solid #B9B8C3;
  transition: all 0.2s ease;
}
.cbx span:first-child svg {
  position: absolute;
  z-index: 1;
  top: 8px;
  left: 6px;
  fill: none;
  stroke: white;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16px;
  stroke-dashoffset: 16px;
  transition: all 0.3s ease;
  transition-delay: 0.1s;
  transform: translate3d(0, 0, 0);
}
.cbx span:first-child:before {
  content: "";
  width: 100%;
  height: 100%;
  background: #506EEC;
  display: block;
  transform: scale(0);
  opacity: 1;
  border-radius: 50%;
  transition-delay: 0.2s;
}
.cbx span:last-child {
  margin-left: 8px;
}
.cbx span:last-child:after {
  content: "";
  position: absolute;
  top: 8px;
  left: 0;
  height: 1px;
  width: 100%;
  background: #B9B8C3;
  transform-origin: 0 0;
  transform: scaleX(0);
}
.cbx:hover span:first-child {
  border-color: var(--purple);
}

.inp-cbx:checked + .cbx span:first-child {
  border-color: var(--purple);
  background: var(--purple);
  animation: check 0.6s ease;
}
.inp-cbx:checked + .cbx span:first-child svg {
  stroke-dashoffset: 0;
}
.inp-cbx:checked + .cbx span:first-child:before {
  transform: scale(2.2);
  opacity: 0;
  transition: all 0.6s ease;
}
.inp-cbx:checked + .cbx span:last-child {
  color: #B9B8C3;
  transition: all 0.3s ease;
}
.inp-cbx:checked + .cbx span:last-child:after {
  /* transform: scaleX(1); */
  transition: all 0.3s ease;
}

@keyframes check {
  50% {
    transform: scale(1.2);
  }
}
</style>