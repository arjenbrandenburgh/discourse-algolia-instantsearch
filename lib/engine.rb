module AlgoliaInstantSearch
  class Engine < ::Rails::Engine
    isolate_namespace AlgoliaInstantSearch

    config.after_initialize do
      Discourse::Application.routes.append do
        mount ::AlgoliaInstantSearch::Engine, at: "/instantsearch"
      end
    end
  end
end