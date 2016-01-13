class CreateTodoSteps < ActiveRecord::Migration
  def change
    create_table :todo_steps do |t|
      t.string :body, null: false
      t.boolean :done, null: false, default: false
      t.integer :todo_id, null:false

      t.timestamps null: false
    end
    add_index(:todo_steps, :todo_id)
  end
end
