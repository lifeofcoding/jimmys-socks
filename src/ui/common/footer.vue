<template>
  <footer class="footer">
    Copyright 2019
    <span class="footer__email">lifeofcoding@gmail.com | github.com/lifeofcoding</span>
  </footer>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component()
export default class Footer extends Vue {}
</script>

<style lang="scss">
.footer {
  height: 40px;
  min-height: 40px;
  background-color: #1a3a6f;
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-size: 10px;
  color: #FFFFFF;
  margin-top: 16px;
}

.footer__email {
  font-weight: bold;
  padding-left: 12px;
}
</style>
