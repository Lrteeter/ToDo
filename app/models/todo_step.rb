class TodoStep < ActiveRecord::Base
  validates :body, :todo_id, presence: true
  validates :done, inclusion: {in: [true, false]}

  belongs_to :todo

end
