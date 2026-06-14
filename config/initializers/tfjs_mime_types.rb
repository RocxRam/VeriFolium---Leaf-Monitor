# Ensure the Rails app (and underlying Rack server) returns sensible MIME types
# for TensorFlow.js model files placed in `public/ml_models/...`.
# - model.json should be served as application/json
# - model shards (e.g. .bin, .weights.bin) should be served as application/octet-stream
# Place your model at: public/ml_models/my_model/model.json

# Add/override MIME mappings used by Rack::Mime when serving static files
if defined?(Rack::Mime)
  Rack::Mime::MIME_TYPES.merge!(".json" => "application/json")
  Rack::Mime::MIME_TYPES.merge!(".bin" => "application/octet-stream")
  Rack::Mime::MIME_TYPES.merge!(".weights.bin" => "application/octet-stream")
end

# Optional: make sure ActionController recognizes common extensions when
# responding with `respond_to` or looking up formats. This won't affect
# static file serving, but can be useful in controllers.
if defined?(Mime::Type)
  Mime::Type.register_alias "application/octet-stream", :bin unless Mime::Type.lookup_by_extension(:bin)
end
