class CreateScans < ActiveRecord::Migration[8.1]
  def change
    create_table :scans do |t|
      t.references :user, null: false, foreign_key: true
      t.string :disease_name
      t.text :remedies
      t.decimal :confidence_score, precision: 5, scale: 4

      t.timestamps
    end
  end
end
