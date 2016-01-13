class Api::TodoStepsController < ApplicationController

  def index
    steps = TodoStep.all.where(todo_id: params[:todo_id])
    render json: steps
  end


end
