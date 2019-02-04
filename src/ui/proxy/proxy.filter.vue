<template>
  <div class="md-flex proxyFilter">
    <md-field class="proxyFilter__field left">
      <label for="type">Type</label>
      <md-select v-model="type" name="movie" id="type">
        <md-option value="all">All</md-option>
        <md-option value="http">HTTP</md-option>
        <md-option value="https">HTTPS</md-option>
        <md-option value="socks4">SOCKS4</md-option>
        <md-option value="socks5">SOCKS5</md-option>
      </md-select>
    </md-field>
    <md-field class="proxyFilter__field right">
      <label for="countrySelect">Country</label>
      <md-select v-model="country" name="countrySelect" id="countrySelect">
        <md-option :value="c.ccode" v-for="c in countries">{{c.cname}}</md-option>
      </md-select>
    </md-field>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import countryCodes from '../utils/countrycodes';

@Component({
  props: {
    criteria: {
      type: Object,
      default: () => ({
        country: 'any',
        type: 'all',
      }),
    },
  },
})
export default class ProxyFilter extends Vue {
  countries = [{ ccode: 'any', cname: 'Any' }, ...countryCodes];
  country = 'any';
  type = 'all';

  @Watch('country')
  onCountryChange(value) {
    this.$emit('filterChanged', {
      country: value,
    });

    chrome.runtime.sendMessage({
      action: 'CHANGE_OPTIONS',
      payload: {
        type: 'criteria',
        value: {country:value, type: this.type},
      },
    });
  }

  @Watch('type')
  onTypeChange(value) {
    this.$emit('filterChanged', {
      type: value,
    });

    chrome.runtime.sendMessage({
      action: 'CHANGE_OPTIONS',
      payload: {
        type: 'criteria',
        value: {country: this.country, type:value},
      },
    });
  }

  mounted() {
    chrome.runtime.sendMessage(
      {
        action: 'GET_APP_STATE',
      },
      ({ options }) => {
        this.country = options.filter.country;
        this.type = options.filter.type;
      }
    );
  }
}
</script>

<style lang="scss">
.proxyFilter {
  display: flex;
  margin-bottom: 8px;

  .md-field.proxyFilter__field {
    &:after {
      background-color: rgba(206, 199, 199, 0.42) !important;
    }

    .md-icon {
      color: rgba(206, 199, 199, 0.42) !important;
    }
  }

  .md-input {
    color: #6f8390 !important;
  }
}

.proxyFilter__field {
  margin-bottom: 4px !important;
}

.proxyFilter__field.left {
  margin-right: 8px;
}

.proxyFilter__field.right {
  margin-left: 8px;
}

.md-input.md-select-value {
  color: #6f8390 !important;
  -webkit-text-fill-color: #6f8390 !important;
}

.proxyFilter__field label {
  color: rgba(62, 100, 119, 0.94) !important;
}
</style>
