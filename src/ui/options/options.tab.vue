<template>
  <div class="optionsContent">
    <h2 class="optionsHeader">Options</h2>
    <div class="options__inner">
      <md-checkbox v-model="reloadActiveTab" class="md-primary toggleDomains__checkbox">
        Reload active tab on changing socks
      </md-checkbox>
      <md-button class="md-raised options__reloadBtn" :disabled="proxyLoading" @click="reloadProxyList">Re-fetch socks list</md-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

@Component()
export default class OptionsTab extends Vue {
  reloadActiveTab = true;

  @Watch('reloadActiveTab')
  changeOptions(value) {
    chrome.runtime.sendMessage({
      action: 'CHANGE_OPTIONS',
      payload: {
        type: 'reloadActiveTab',
        value,
      },
    });
  }

  proxyLoading = false;
  reloadProxyList() {
    this.proxyLoading = true;
    chrome.runtime.sendMessage(
      {
        action: 'LOAD_PROXIES',
      },
      () => {
        setTimeout(() => {
          this.proxyLoading = false;
        }, 500);
      }
    );
  }

  mounted() {
    chrome.runtime.sendMessage(
      {
        action: 'GET_APP_STATE',
      },
      ({ options }) => {
        this.reloadActiveTab = options.reloadActiveTabOnApplyProxy;
      }
    );
  }
}
</script>

<style lang="scss">
.optionsContent {
  padding: 0 12px;
}

.optionsHeader {
  font-size: 14px;
  font-weight: bold;
  color: #6f8390;
}

.note {
  font-size: 12px;
  white-space: pre-line;
  color: #96afc0;
  font-weight: 500;
}

.options__reloadBtn {
  margin-left: 0 !important;
}
</style>
