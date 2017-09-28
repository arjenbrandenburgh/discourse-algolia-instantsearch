# Discourse Plugin: algolia-instantsearch

This plugin will create a new path on your Discourse called /instantsearch. When visiting this, you can leverage the Algolia Instant Search.

The template and CSS are based on:
* [Building an instant search results page](https://www.algolia.com/doc/tutorials/search-ui/instant-search/build-an-instant-search-results-page/instantsearchjs/)
* [Algolia Instant Search Demo on GitHub](https://github.com/algolia/instant-search-demo)

## Configuration 

The current configuration is set to use the Algolia demo credentials, but you have to change these to your own. You can find the settings in your Discourse admin environment.

| Setting                                        | Description                                 |
| ---------------------------------------------- | --------------------------------------------|
| `algolia_instantsearch_application_id: string` | Algolia Application ID                      |
| `algolia_instantsearch_search_key: string`     | Algolia Search API key (not the admin key!) |
| `algolia_instantsearch_index_name: string`     | Algolia Index name that you want to search  |

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/cybey/discourse-algolia-instantsearch.
Contributions are greatly appreciated. 

## Contributors

| [<img src="https://avatars.githubusercontent.com/u/7848606?v=3" width="100px;"/><br /><sub>Arjen Brandenburgh</sub>](https://github.com/cybey) |
| :---: |

## License

The plugin is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).