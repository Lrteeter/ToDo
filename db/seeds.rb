20.times do
  title = Faker::Lorem.words(rand(3)+1).join(" ")
  body = Faker::Lorem.words(rand(20)+1).join(" ")
  steps = []


  done = [true, false][rand(2)]
  todo = Todo.create!(title: title, body: body, done: done);

  numSteps = rand(4)+1
  numSteps.times do
    body = Faker::Lorem.words(rand(5)+1).join(" ")
    steps = todo.todo_steps.create!({body: body})
  end
end
