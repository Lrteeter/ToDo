class Api::TodosController < ApplicationController

  def index
    todo = Todo.all
    render json: todo
  end

  def create
    todo = Todo.new(todo_params)
    todo.create!
    render json: todo
  end

  def destroy
    todo = Todo.find(params[:id])
    todo.destroy!
    render json: Todo.all
  end

  def update
    todo = Todo.find(params[:id])
    todo.update_attributes!(todo_params)
    render json: todo
  end

  private
  def todo_params
    params.require(:todo).permit(:title, :body, :done)
  end

end
