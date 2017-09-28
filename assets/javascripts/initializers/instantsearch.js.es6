import { withPluginApi } from 'discourse/lib/plugin-api';

export default {
  name: 'instantsearch',
  initialize(container){
    withPluginApi('0.8.9', api => {
      // Add new button to the header
      api.decorateWidget('header-icons:before', helper => {
          return helper.h('li', [
              helper.h('a#home-button.icon', {
                  href:'/instantsearch',
                  title: 'Search this site'
              }, helper.h('i.fa.fa-bolt.d-icon.d-icon-bolt')),
          ]);
      });
    });

  }
}