import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    var search = instantsearch({
      appId: this.siteSettings.algolia_instantsearch_application_id,
      apiKey: this.siteSettings.algolia_instantsearch_search_key,
      indexName: this.siteSettings.algolia_instantsearch_index_name,
      urlSync: true
    });

    search.addWidget(
      instantsearch.widgets.searchBox({
        container: '.algolia-instantsearch #search-input',
        placeholder: 'Search for products by name, type, brand, ...',
      })
    );

    search.addWidget(
      instantsearch.widgets.hits({
        container: '.algolia-instantsearch #hits',
        hitsPerPage: 10,
        templates: {
          item: document.getElementById('hit-template').innerHTML,
        },
        transformData: {
          item: function (item) {
            item.starsLayout = function() {
              let html = '';
              let rating = item.rating;

              for (let i = 0; i < 5; ++i) {
                html += `<span class="ais-star-rating--star${i < rating ? '' : '__empty'}"></span>`;
              }

              return html;
            }();
            item.categories = function() {
                const highlightValues = item._highlightResult.categories || [];
                return highlightValues.map(category => category.value).join(' > ');
            }();
            return item;
          },
        },
      })
    );

    search.addWidget(
      instantsearch.widgets.stats({
        container: '#stats',
      })
    );

    search.addWidget(
      instantsearch.widgets.sortBySelector({
        container: '#sort-by',
        autoHideContainer: true,
        indices: [{
          name: this.siteSettings.algolia_instantsearch_index_name, label: 'Most relevant',
        }, {
          name: `${this.siteSettings.algolia_instantsearch_index_name}_price_asc`, label: 'Lowest price',
        }, {
          name: `${this.siteSettings.algolia_instantsearch_index_name}_price_desc`, label: 'Highest price',
        }],
      })
    );

    search.addWidget(
      instantsearch.widgets.pagination({
        container: '#pagination',
        scrollTo: '#search-input',
      })
    );

    // ---------------------
    //
    //  Filtering widgets
    //
    // ---------------------
    search.addWidget(
      instantsearch.widgets.hierarchicalMenu({
        container: '#hierarchical-categories',
        attributes: [
          'hierarchicalCategories.lvl0',
          'hierarchicalCategories.lvl1',
          'hierarchicalCategories.lvl2'],
        sortBy: ['isRefined', 'count:desc', 'name:asc'],
        showParentLevel: true,
        limit: 10,
        templates: {
          header: `<h5>Category</h5>`,
          item:  '<a href="javascript:void(0);" class="facet-item {{#isRefined}}active{{/isRefined}}"><span class="facet-name"><i class="fa fa-angle-right"></i> {{name}}</span class="facet-name"><span class="ais-hierarchical-menu--count">{{count}}</span></a>' // eslint-disable-line
        },
      })
    );

    search.addWidget(
      instantsearch.widgets.refinementList({
        container: '#brand',
        attributeName: 'brand',
        sortBy: ['isRefined', 'count:desc', 'name:asc'],
        limit: 5,
        operator: 'or',
        showMore: {
          limit: 10,
        },
        searchForFacetValues: {
          placeholder: 'Search for brands',
          templates: {
            noResults: '<div class="sffv_no-results">No matching brands.</div>',
          },
        },
        templates: {
          header: `<h5>Brand</h5>`,
        },
        collapsible: {
          collapsed: false,
        },
      })
    );

    search.addWidget(
      instantsearch.widgets.rangeSlider({
        container: '#price',
        attributeName: 'price',
        tooltips: {
          format: function (rawValue) {
            return `$${Math.round(rawValue).toLocaleString()}`;
          },
        },
        templates: {
          header: `<h5>Price</h5>`,
        },
        collapsible: {
          collapsed: false,
        },
      })
    );

    search.addWidget(
      instantsearch.widgets.priceRanges({
        container: '#price-range',
        attributeName: 'price',
        labels: {
          currency: '$',
          separator: 'to',
          button: 'Apply',
        },
        templates: {
          header: `<h5>Price range</h5>`,
        },
        collapsible: {
          collapsed: true,
        },
      })
    );

    search.addWidget(
      instantsearch.widgets.starRating({
        container: '#stars',
        attributeName: 'rating',
        max: 5,
        labels: {
          andUp: '& Up',
        },
        templates: {
          header: `<h5>Rating</h5>`,
        },
        collapsible: {
          collapsed: false,
        },
      })
    );

    search.addWidget(
      instantsearch.widgets.toggle({
        container: '#free-shipping',
        attributeName: 'free_shipping',
        label: 'Free Shipping',
        values: {
          on: true,
        },
        templates: {
          header: `<h5>Shipping</h5>`,
        },
        collapsible: {
          collapsed: true,
        },
      })
    );

    search.addWidget(
      instantsearch.widgets.menu({
        container: '#type',
        attributeName: 'type',
        sortBy: ['isRefined', 'count:desc', 'name:asc'],
        limit: 10,
        showMore: true,
        templates: {
          header: `<h5>Type</h5>`,
        },
        collapsible: {
          collapsed: true,
        },
      })
    );

    search.start();
  }
});