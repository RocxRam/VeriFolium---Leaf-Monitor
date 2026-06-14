class CreateProfiles < ActiveRecord::Migration[8.1]
  def change
    create_table :profiles do |t|
      t.references :user, null: false, foreign_key: true, index: { unique: true }
      t.decimal :land_size, precision: 10, scale: 2
      t.text :crops
      t.string :soil_type
      t.string :location

      t.timestamps
    end
  end
end
