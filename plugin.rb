# name: algolia-instantsearch-plugin
# about: Discourse plugin that leverages the Algolia instant search libraries
# version: 1.0
# author: Arjen Brandenburgh


register_asset "stylesheets/instantsearch.scss"
register_asset "javascripts/lib/instantsearch.min.js"

Discourse::Application.routes.append do
  get "/instantsearch" => "algolia_instant_search/search#index"
end

load File.expand_path('../lib/engine.rb', __FILE__)
