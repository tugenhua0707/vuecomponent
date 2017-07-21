<template>
    <div>
      <p><tb-rate show-text v-model="valueText"></tb-rate></p>
      <p>
        <tb-rate show-text v-model="valueCustomText">
          <span style="color: #f5a623">{{ valueCustomText }}</span>
        </tb-rate>
      </p>
    </div>
</template>

<script>
    export default {
      data () {
          return {
            valueText: 3,
            valueCustomText: 3.8
          }
      }
    }
</script>