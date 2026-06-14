class User < ApplicationRecord
  has_secure_password
  has_many :sessions, dependent: :destroy
  has_one :profile, dependent: :destroy
  has_many :scans, dependent: :destroy
  validates :email_address, presence: true, uniqueness: true
  validates :password, presence: true

  normalizes :email_address, with: ->(e) { e.strip.downcase }
end
