```ruby
# app/presenters/user_presenter.rb
class UserPresenter
  def initialize user, template
    @user = user
    @template = template
  end

  def website
    if @user.website.present?
      @template.link_to @user.website, @user.website
    else
      @template.content_tag :span, 'None Given', class:'none'
    end
  end
end
```
--

```ruby
# app/controllers/user_controller.rb
class UserController < ApplicationController
  def show
    user = User.find(params[:id])
    @user = UserPresenter.new(user, view_context)
  end
end
```
