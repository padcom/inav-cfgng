<template>
  <table class="logic-conditions">
    <thead>
      <tr>
        <th>#</th>
        <th>Enabled</th>
        <th>Operation</th>
        <th>Operand A</th>
        <th>Operand B</th>
        <th>Active</th>
        <th>Flags</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(condition, index) in conditions" :key="index">
        <td>
          {{ index }}
        </td>
        <td width="1">
          <BoolSwitch v-model="condition.enabled" />
        </td>
        <td width="1">
          <LogicConditionOperationDropdown v-model.number="condition.operation" />
        </td>
        <td class="operand">
          <template v-if="OPERATION[condition.operation].hasOperand[0]">
            <LogicConditionOperandTypeDropdown
              v-model.number="condition.a.type"
              @update:modelValue="condition.a.value = OPERAND_TYPE[$event]?.default"
            />
            <NumericInput :key="`a.${condition.a.type}`"
              v-if="OPERAND_TYPE[condition.a.type]?.type === 'value'"
              v-model="condition.a.value"
              :min="OPERAND_TYPE[condition.a.type]?.min"
              :max="OPERAND_TYPE[condition.a.type]?.max"
            />
            <Dropdown v-else :key="`a.${condition.a.type}`"
              v-model="condition.a.value"
              :options="getValueOptions(condition.a.type)"
            />
          </template>
        </td>
        <td class="operand">
          <template v-if="OPERATION[condition.operation].hasOperand[1]">
            <LogicConditionOperandTypeDropdown
              v-model.number="condition.b.type"
              @update:modelValue="condition.b.value = OPERAND_TYPE[$event]?.default"
            />
            <NumericInput :key="`a.${condition.b.type}`"
              v-if="OPERAND_TYPE[condition.b.type]?.type === 'value'"
              v-model="condition.b.value"
              :min="OPERAND_TYPE[condition.b.type]?.min"
              :max="OPERAND_TYPE[condition.b.type]?.max"
            />
            <Dropdown v-else :key="`a.${condition.b.type}`"
              v-model="condition.b.value"
              :options="getValueOptions(condition.b.type)"
            />
          </template>
        </td>
        <td width="1">
          <LogicConditionDropdown v-model.number="condition.activatorId" />
        </td>
        <td width="1">
          {{ condition.flags }}
        </td>
        <td width="1">
          <div v-if="condition.enabled">
            <span
              v-if="OPERATION[condition.operation].output === 'boolean'"
              class="boolean-status-indicator"
              :class="{ active: condition.status }"
            >
              &nbsp;
            </span>
            <span v-if="OPERATION[condition.operation].output === 'raw'">
              {{ condition.status }}
            </span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { defineComponent } from 'vue'

import BoolSwitch from '../../components/editors/BoolSwitch.vue'
import NumericInput from '../../components/editors/NumericInput.vue'
import Dropdown from '../../components/editors/Dropdown.vue'

import LogicConditionOperationDropdown from '../../components/editors/LogicConditionOperationDropdown.vue'
import LogicConditionOperandTypeDropdown from '../../components/editors/LogicConditionOperandTypeDropdown.vue'
import LogicConditionDropdown from '../../components/editors/LogicConditionDropdown.vue'

import { OPERATION, OPERAND_TYPE } from '../../models/logic-condition'

export default defineComponent({
  components: {
    BoolSwitch,
    NumericInput,
    Dropdown,
    LogicConditionOperationDropdown,
    LogicConditionOperandTypeDropdown,
    LogicConditionDropdown,
  },
  props: {
    conditions: { Array, default: () => [] }
  },
  computed: {
    OPERATION() {
      return OPERATION
    },
    OPERAND_TYPE() {
      return OPERAND_TYPE
    },
  },
  methods: {
    getValueOptions(type, value) {
      const operandType = OPERAND_TYPE[type]
      if (!operandType) {
        return []
      } else if (operandType.type === 'dictionary') {
        return Object
          .entries(OPERAND_TYPE[type].values)
          .map(([ value, label ]) => ({ label, value }))
      } else if (OPERAND_TYPE[type].type === 'range') {
        const result = []
        for (let i = OPERAND_TYPE[type].range[0]; i <= OPERAND_TYPE[type].range[1]; i++) {
          result.push({ label: i, value: i })
        }
        return result
      } else {
        return []
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.logic-conditions {
  width: 100%;
  border-collapse: collapse;

  th {
    background-color: gray;
    color: white;
    border: solid 1px white;    
    border-top: none;
    padding: 4px 8px;
    width: auto !important;
  }

  tr:nth-of-type(even) {
    background-color: #EEE;
  }

  td {
    text-align: center;
    padding: 8px 8px;
    border: solid 1px white;
    max-width: 100%;
    white-space: nowrap;
  }

  // &:deep(select), &:deep(input) {
  //   // width: 48%;
  // }

  &:deep(select + input), &:deep(select + select) {
    margin-left: 8px;
  }

  .operand:deep(select), .operand:deep(input) {
    width: 150px;
  }
}

.boolean-status-indicator {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: white;
  border: solid 1px gray;
  border-radius: 50%;

  &.active {
    background-color: var(--color-info);
  }
}
</style>
