class AddPreferredLanguageToProfiles < ActiveRecord::Migration[8.1]
  def change
    add_column :profiles, :preferred_language, :string
  end
end
